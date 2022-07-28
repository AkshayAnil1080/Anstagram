import { Component, OnInit } from '@angular/core';
import { FirebaseTSStorage} from 'firebasets/firebasetsStorage/firebaseTSStorage';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  selectedImageFile : File | undefined;  // variable to select the current image
  auth=new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();
  storage = new FirebaseTSStorage();

  constructor(private dialog: MatDialogRef<CreatePostComponent>) { }

  ngOnInit(): void {
  }

  onPostClick(commentInput: HTMLTextAreaElement){
    //1. get value of text area
    let comment = commentInput.value;

    let postId = this.firestore.genDocId();   // createing unique id for each post
    //2. upload file storgae, takes obj with 6 prop, we only need 4
    this.storage.upload(
      {
        uploadName: "upload Image Post", //keep track of how many upload r runnin in th app
        path: ["Posts", postId , "image"],
        data: {
          data: this.selectedImageFile   //the file to upload
         },
          // callback fun , when success ulpload and return url to download the file
        onComplete: (downloadUrl) =>{
          // alert(downloadUrl);
          this.firestore.create(
              {
                path:["Posts", postId],
                data:{
                  comment: comment,
                  creatorId : this.auth.getAuth().currentUser?.uid,
                  imageUrl : downloadUrl,
                  timestamp:  FirebaseTSApp.getFirestoreTimestamp() // will use server time
                },
                //lastly, onComplete callback fun
                onComplete: (docId) => {
                //want to close dialog, import MatDialogRef, inject it and pass this componenet
                // grab dialog ref and call close()
                this.dialog.close();

                }

              } 
          );
        }
      }
    );

  }

  onPhotoSelected(photoSelector: HTMLInputElement){
    // accessing the files property(ret an array of selceted images)
    this.selectedImageFile= photoSelector.files![0];

    if(!this.selectedImageFile) return;
    //need to conver the file into a readble string for preview img container -
    //hhow ?create file reader obj
    let fileReader = new FileReader();

    // call file reader obj and call the read as data url
    fileReader.readAsDataURL(this.selectedImageFile); // param is seleceted img file

    //grab filereader obj and attach event and listener
    fileReader.addEventListener(
      "loadend",
      ev => {  // inside callback fun , get the result of converted data from fileredaer obj

        let readableString = fileReader.result?.toString();
       let postPreviewImage= <HTMLImageElement>document.getElementById("post-preview-image");

       //set to readable string data
       postPreviewImage.src = readableString!;
      }
    );
  }

}
