import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from 'src/app/tools/create-post/create-post.component';
import { FirebaseTSFirestore, Limit, OrderBy } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { InteractivityChecker } from '@angular/cdk/a11y';

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.css']
})
export class PostFeedComponent implements OnInit {
  firestrore = new FirebaseTSFirestore();
  posts: PostData[] = [] ; //creating an array of post for postdaa
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPosts(); // when page load, it will et 10 posts from DB and store in arra(posts)
  }

  onCreateClick(){
    this.dialog.open(CreatePostComponent);

  }

  getPosts(){
    this.firestrore.getCollection(
      {
        path: ["Posts"],
        where: [  // it is an array to apply filter to our query
          
          new OrderBy("timestamp", "desc"),
          new Limit(10)
        ],
        onComplete:(result) => { // it gets called when erceived all docs from firestore
      result.docs.forEach( //doc rep an array of doc -we eill use to ret post - for loop
          doc => {
           let post= <PostData> doc.data();  //return data of post - assign to var and typecast

           this.posts.push(post); //push each post in array of post - cal getPosts method in Oninit
          }
          );
        },
        onFail: err =>{ // called when somehting goes wrong during retrieval process

        }
       } 
    );
  }
}

export interface PostData{
  comment : string;
  creatorId: string;
  imageUrl?: string; // since its an optional field, need to give ?
}