import { Component, OnInit} from '@angular/core';
import { DataService } from '../data.service';
@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {
   constructor(public data: DataService) {

   }

  clientId = "032af492417046df8648790eb9711f7e";
  isButtonVisible = true
  userProfile: any
  playlists: any

  async ngOnInit() {
    const url = window.location.href;

    const codeIndex = url.indexOf('code=');
    if (codeIndex !== -1) {
      this.isButtonVisible = false
      const startIndex = codeIndex + 5; 
      const endIndex = url.indexOf('&', startIndex) !== -1 ? url.indexOf('&', startIndex) : url.length;
      const code = url.substring(startIndex, endIndex);
      
      const accessToken = await this.getAccessToken(this.clientId, code);
      this.fetchProfile(accessToken);

    } else {
      console.log("there is no code")
    }
  }

  async getAccessToken(clientId: string, code: string) {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:4200/dash/music");
    params.append("code_verifier", verifier!);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;

  }

  async fetchProfile(token: string) {
      const profile = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
      });
      const playlists = await fetch("https://api.spotify.com/v1/me/playlists", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
      });

      const playlistData = await playlists.json()
      const profileData = await profile.json()

      this.populateUI(profileData, playlistData);

      // return data;
  }

  populateUI(profile: any, playlist: any) {
    if (profile) {
      this.userProfile = profile
      this.data.spotifyProfilePic = profile.images[1]?.url
      console.log(playlist)
      this.playlists = playlist
    }
  }

  async connectToSpotify() {
    const url = window.location.href;
    const codeIndex = url.indexOf('code=');

    if (codeIndex == -1) {
      redirectToAuthCodeFlow(this.clientId);
    } 

    async function redirectToAuthCodeFlow(clientId: string) {
        const verifier = generateCodeVerifier(128);
        const challenge = await generateCodeChallenge(verifier);

        localStorage.setItem("verifier", verifier);

        const params = new URLSearchParams();
        params.append("client_id", clientId);
        params.append("response_type", "code");
        params.append("redirect_uri", "http://localhost:4200/dash/music");
        params.append("scope", "user-read-private user-read-email playlist-read-private");
        params.append("code_challenge_method", "S256");
        params.append("code_challenge", challenge);

        document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
    }

    function generateCodeVerifier(length: number) {
      let text = '';
      let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
      for (let i = 0; i < length; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
  }
  
  async function generateCodeChallenge(codeVerifier: string) {
      const data = new TextEncoder().encode(codeVerifier);
      const digest = await window.crypto.subtle.digest('SHA-256', data);
      return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=+$/, '');
  }
}

}
