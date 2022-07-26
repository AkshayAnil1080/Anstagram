import { Component, Input, OnInit } from '@angular/core';
import { FirebaseTSFirestore} from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() show: boolean | undefined;

  firestore : FirebaseTSFirestore;
  auth: FirebaseTSAuth;


  constructor() {
    this.firestore = new FirebaseTSFirestore();
    this.auth = new FirebaseTSAuth();
  }


  ngOnInit(): void {
  }

  onContinueClick(
    //user inputs
    nameInput :HTMLInputElement,
    descriptionInput: HTMLTextAreaElement
  ){
    //geting the value by .value
    let name = nameInput.value;
    let description = descriptionInput.value;

    //to upload data to cloud firestore, grab firestrore obj and call  fun
    this.firestore.create(   //takes json obj with 4 prop
      {
        path:["Users", this.auth?.getAuth()?.currentUser?.uid || '{}'],  //1 location where we want to place our data
        data:{ //2
          publicName: name,
          description: description

        },
        //next two are callback
        onComplete: (docId) => { //3 called, when successfully put the data in DB
          //data is the json obj with the data we want to upload
        alert("Profile Created");
        nameInput.value ="";
        descriptionInput.value="";
        },
        onFail: (err) => { //4
 
        }

      }
    );
    
  }

}
