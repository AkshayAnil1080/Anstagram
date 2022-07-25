import { Component, OnInit } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  auth = new FirebaseTSAuth();
  constructor(private router : Router) { }

  ngOnInit(): void {
    if( //checking if ues has logged in with email not verified
    this.auth.isSignedIn() && 
    !this.auth.getAuth().currentUser?.emailVerified  // if not verified send them back to home page
    )
    {
      this.auth.sendVerificationEmail();
    }
      else{

      this.router.navigate([""]);
      // y ? we dont want people to come to this page when they r not logged in or have their email verified already
    } 
  }

  onResendClick(){
    this.auth.sendVerificationEmail();  // send ver mail to user that has logged in
  } 
}

