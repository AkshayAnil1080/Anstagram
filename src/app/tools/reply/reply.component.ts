import { Component, Inject, OnInit } from '@angular/core';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {

  firestore = new FirebaseTSFirestore();
  constructor(@Inject(MAT_DIALOG_DATA) private postId : string) { }

  ngOnInit(): void {
  }

  onSendClick(commentInput: HTMLInputElement){
    if(!(commentInput.value.length>0)) return;
    // call create method to upload a comment to FireStore
    this.firestore.create(
    {
      path: ["Posts" , this.postId, "PostComments"],
      // to creata a collection in the doc, add a dirt ele post comment

      //for the data,get the value from the comment input store in a prop called comment
      data:{
        comment: commentInput.value,
        creatorId: AppComponent.getUserDocument().userId,
        creatorName: AppComponent.getUserDocument().publicName,
        timestamp: FirebaseTSApp.getFirestoreTimestamp()// need to import firestore
      },
      onComplete: (docId) => {
        commentInput.value = " "
      }
    }
    );
  }
}
