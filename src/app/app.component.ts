import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthenticatorComponent } from './tools/authenticator/authenticator.component';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { Router } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
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
  firestore = new FirebaseTSFirestore();
  userHasProfile = true;
  userDocument: any;

  constructor(private loginSheet: MatBottomSheet,
              private router : Router
    ){
    this.auth.listenToSignInStateChanges(
      //user arg rep  firebase user obj from firebase auth - uses (to get some info abt user)
      user => {
        this.auth.checkSignInState( // takes in json obj with upto 5 prop
        {
          whenSignedIn : user => {
            // alert("Logged In");
            // this.loggedIn=true; using directly
          },
          whenSignedOut: user =>{
            // alert("Logged Out");
          },
          whenSignedInAndEmailNotVerified: user =>{
              //calling the navigate fun from router obj and go to email verification page
              this.router.navigate(["emailVerification"]);
          },
          whenSignedInAndEmailVerified: user => {
            this.getUserProfile();
          },
          whenChanged: user => {

          }
        }

        )
      }   
    );

  }

  getUserProfile(){
    this.firestore.listenToDocument(
      {
        name: "Getting Document", // need this to stop the fun anytime
        path: ["Users", this.auth?.getAuth()?.currentUser?.uid || '{}'],
        // paht of doc we want to ret(for now its uesr dos from users in FB DB)
        onUpdate: (result) =>{  // result obj rep the returned data from DB

        this.userDocument = <UserDocument> result.data(); // access the data(result obj data method) and pass into var
        // access above properties
        this.userHasProfile = result.exists;

        
        if(this.userHasProfile){
          this.router.navigate(["postfeed"]);
      }

        }
      
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

export interface UserDocument{
    publicName: string;    description: string;
}


