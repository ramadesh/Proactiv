import { Component } from '@angular/core';

let parameters = {
  count: false,
  numbers: false,
  letters: false,
  special: false
}
@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.component.html',
  styleUrls: ['./resetpass.component.css']
})

export class ResetpassComponent {
  newPassInput = '';
  confirmInput = '';
  containsLetters = false
  containsNumbers = false
  containsSpecialCharacters = false
  length = false

  strengthChecker() {
    let password = this.newPassInput

    parameters.letters = (/[A-Za-z]+/.test(password)) ? true : false
    parameters.numbers = (/[0-9]+/.test(password)) ? true : false
    parameters.special = (/[!@#$%^&*()_+\[\]:;,.?~\\/-]+/.test(password)) ? true : false
    parameters.count = (password.length >= 8) ? true : false

    let strengthBar = document.getElementById("strength-bar")
    let message = document.getElementById("message")
    if (strengthBar) {
      strengthBar.innerHTML = '';
      let barlength = Object.values(parameters).filter(value => value)
      let values = Object.values(parameters)

      for (let i = 0; i < barlength.length; i++) {
        let span = document.createElement("div");
        span.classList.add('strength');
        strengthBar.appendChild(span);

        let spanRef = document.getElementsByClassName("strength") as HTMLCollectionOf<HTMLElement>
        for (let j = 0; j < spanRef.length; j++) {
          switch (spanRef.length - 1) {
            case 0:
              spanRef[j].style.background = "#ff3e36"
              if (message) {
                message!.textContent = "Your password is very weak"
              }
              break
            case 1:
              spanRef[j].style.background = "#ff691f"
              if (message) {
                message!.textContent = "Your password is weak"
              }
              break
            case 2:
              spanRef[j].style.background = "#ffda36"
              if (message) {
                message!.textContent = "Your password is good"
              }
              break
            case 3:
              spanRef[j].style.background = "#0be881"
              if (message) {
                message!.textContent = "Your password is strong"
              }
              break
          }
        }

        this.length = values[0] ? true : false;
        this.containsNumbers = values[1] ? true : false;
        this.containsLetters = values[2] ? true : false;
        this.containsSpecialCharacters = values[3] ? true : false

        if (message!.textContent == "Your password is strong") {
          document.getElementById("message2")!.textContent = ""
        }

      }
    }
  }

  resetPass() {
    
  }
}
