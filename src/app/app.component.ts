import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthenticatorComponent } from './tools/authenticator/authenticator.component';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my_app';
  //create obj of FirebaseTSAuth
  auth = new FirebaseTSAuth();
  // isLoggedIn = false; not useing calling direct auth.isSignedIn

  constructor(private loginSheet: MatBottomSheet){
    this.auth.listenToSignInStateChanges(
      //user arg rep  firebase user obj from firebase auth - uses (to get some info abt user)
      user => {
        this.auth.checkSignInState( // takes in json obj with upto 5 prop
        {
          whenSignedIn : user => {
            alert("Logged In");
            // this.loggedIn=true; using directly
          },
          whenSignedOut: user =>{
            alert("Logged Out");
          },
          whenSignedInAndEmailNotVerified: user =>{

          },
          whenSignedInAndEmailVerified: user => {

          },
          whenChanged: user => {

          }
        }

        );
      }   
    );

  }

  loggedIn(){
    // return this.loggedIn; or just use inbuilt fun
    return this.auth.isSignedIn();
  }

  onLoginClick(){
    this.loginSheet.open(AuthenticatorComponent);
  }
  onLogoutClick(){
    this.auth.signOut();
  }
}
