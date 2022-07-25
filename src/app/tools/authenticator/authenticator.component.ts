import { Component, OnInit } from '@angular/core';
import { raceWith } from 'rxjs';
import { FirebaseTSAuth}  from 'firebasets/firebasetsAuth/firebaseTSAuth';

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.css']
})
export class AuthenticatorComponent implements OnInit {
state =AuthenticatorComponentState.LOGIN; //3.

 // FirebaseTsAuth contains fun to manage auth part of firebase
 firebasetsAuth : FirebaseTSAuth;
  constructor() { 

    this.firebasetsAuth = new FirebaseTSAuth();
  }

  ngOnInit(): void {
  }

  //login fun
  onLogin(
    loginEMail: HTMLInputElement,
    loginPassword: HTMLInputElement
  ){
    let email = loginEMail.value;
    let password  =  loginPassword.value;

    if(this.isNotEmpty(email) && this.isNotEmpty(password)){
      this.firebasetsAuth.signInWith( // this fun takes on json obj with 5 prop, we just need 4
      {
        email: email,   //rhs email in from line 28
        password: password,

        onComplete:(uc) => {   //callback fun
          alert("Logged In");
        },
        onFail: (err) => {
          alert(err)
        }
      }
      )
    }
  }
  //*************** */
// reset password
  onResetClick(resetEmail: HTMLInputElement){
    let email = resetEmail.value;
    if(this.isNotEmpty(email)){
      this.firebasetsAuth.sendPasswordResetEmail(
        {
          email: email,
          onComplete: (err) =>{
            alert(`Reset email sent to ${email}`);
          }
        }
      );
    }
  }

  // to create new user
  onRegisterClick(
    registerEmail: HTMLInputElement, //setting parameter type
    registerPassword: HTMLInputElement,
    registerConfirmPassword: HTMLInputElement
  ){
    //inside fun getting value of each i/p
    let email = registerEmail.value;
    let password = registerPassword.value;
    let confirmpassword = registerConfirmPassword.value;
   

    if(
      this.isNotEmpty(email) &&
      this.isNotEmpty(password) &&
      this.isNotEmpty(confirmpassword) &&
      this.isAMatch(password, confirmpassword)
    ){
  

    
       //to create acc grab fireabasetsAUth obj and call the create accWith
      this.firebasetsAuth.createAccountWith( // takes on json ob with 4 prop
      {
        email: email,   // credential for creation
        password: password,
        //next two are callback fun on complete and onFail
        onComplete: (uc) => {
          alert("Account Created");
          registerEmail.value="";
          registerPassword.value="";
          registerConfirmPassword.value="";
        },
        onFail: (err) => {
          alert("failed to create the account");
        }
      }
      );

    }
}
  // check if value is empty
  isNotEmpty(text : string) //paremter text with type string
  {
    return text!=null && text.length>0;
  }

  //if two string are equal
  isAMatch(text : string, comparewith : string){  //two parameters with both type string
    return text == comparewith;
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