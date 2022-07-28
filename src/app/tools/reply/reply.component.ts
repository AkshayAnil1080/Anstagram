import { Component, Inject, OnInit } from '@angular/core';
import { FirebaseTSFirestore, OrderBy } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
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
  comments: Comment [] = []; // array of comments

  constructor(@Inject(MAT_DIALOG_DATA) private postId : string) { }

  ngOnInit(): void {
    this.getComments();
  }
getComments(){
 this.firestore.listenToCollection( // want to retriive the comments continuosly when new comments come
    {
      name: "Post Comments", // to keep tarck of how many listerners running at a time, we can stop using a listener at any time
      path: ["Posts", this.postId, "PostComments"], // its an array to point to a location of collection we are tryin to listen to
      //this.postId for 2nd ele
      where: [new OrderBy("timestamp", "asc")],
      onUpdate: (result) => {
        result.docChanges().forEach(
          postCommentDoc => {
            postCommentDoc.type == "added" // we only wan to get the ones addded to collection
            //use if to check if type is added
            if(postCommentDoc.type =="added"){ //add it to comments of arr using unshift
              this.comments.unshift(<Comment>postCommentDoc.doc.data()); // this was new comment stays on top
            }
          }
        )
      }
    }

  );
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


//1 the final interface called comment to rep data structure for each comment
//2 create array of commnets
export interface Comment{
  creatorId: string;
  creatorName: string;
  comment: string; 
  timestamp: firebase.default.firestore.Timestamp
}
