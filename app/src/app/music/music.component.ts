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
  currentlyPlayingData: any
  newPlaylistName: string = '';
  async ngOnInit() {
    const url = window.location.href;

    const codeIndex = url.indexOf('code=');
    if (codeIndex !== -1) {
      this.isButtonVisible = false
      const startIndex = codeIndex + 5; 
      const endIndex = url.indexOf('&', startIndex) !== -1 ? url.indexOf('&', startIndex) : url.length;
      const code = url.substring(startIndex, endIndex);
      
      const token = await this.getAccessToken(this.clientId, code);
      localStorage.setItem("spotify_access_token", token);
      this.fetchProfile(token);

    } else if (localStorage.getItem("spotify_access_token") !== "") {
      console.log("there is token in local storage")
      this.isButtonVisible = false
      const access_token = localStorage.getItem("spotify_access_token")!
      this.fetchProfile(access_token);
    } else {
      console.log("no connection to spotify")
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
      this.getCurrentlyPlaying(token)
  }

  populateUI(profile: any, playlist: any) {
    if (profile) {
      this.userProfile = profile
      this.data.spotifyProfilePic = profile.images[1]?.url
      this.playlists = playlist
      console.log(playlist)
    }
  }

  async createPlaylist() {
    const userId = this.userProfile.id
    const playlistName = prompt('Enter playlist name:');
    const description = prompt('Enter playlist description (optional):');
    const isPublic = confirm('Make the playlist public?');

    const bodyData = {
      name: playlistName,
      description: description,
      public: isPublic
    };

    if (playlistName) {
      console.log(userId + " " + playlistName)

      const create = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("spotify_access_token")}`,
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(bodyData) 
      });

      const response = await create.json()
      console.log(response);
    }
  }

  async getCurrentlyPlaying(token: string) {
    const playing = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
      });

      const currentlyPlaying = await playing.json()
      this.currentlyPlayingData = currentlyPlaying.item.album
    
      console.log(this.currentlyPlayingData)
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
        params.append("scope", "user-read-private user-read-email playlist-read-private playlist-modify-public playlist-modify-private user-read-currently-playing");
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
