import { Component, OnInit } from '@angular/core';
import { raceWith } from 'rxjs';

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.css']
})
export class AuthenticatorComponent implements OnInit {
state =AuthenticatorComponentState.LOGIN; //3.
  constructor() { }

  ngOnInit(): void {
  }
 //4. 17-26

  OnFrogorPasswordClick(){
    this.state = AuthenticatorComponentState.FORGOT_PASSWORD;
  }

  OnCreateAccountClick(){
    this.state = AuthenticatorComponentState.REGISTER;
  }
  OnLoginClick(){
    this.state = AuthenticatorComponentState.LOGIN;
  }
//5.
  isLoginState(){
    return this.state == AuthenticatorComponentState.LOGIN;
  }
  isRegisterState(){
    return this.state == AuthenticatorComponentState.REGISTER;
  }
  isForgotPasswordState(){
    return this.state == AuthenticatorComponentState.FORGOT_PASSWORD;
  }

  getStateText(){   // 7. use interpoation in .html
    switch(this.state){
      case AuthenticatorComponentState.LOGIN:
        return "Login";
      case AuthenticatorComponentState.REGISTER:
        return "Register";
      case AuthenticatorComponentState.FORGOT_PASSWORD:
        return "Forgot Password";
    }
  }
}
//2. 1.to make html
export enum AuthenticatorComponentState{
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
}
//6. specify ngIf to html