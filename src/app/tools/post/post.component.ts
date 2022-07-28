import { Component, Input, OnInit } from '@angular/core';
import { PostData } from 'src/app/pages/post-feed/post-feed.component';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { MatDialog } from '@angular/material/dialog';
import { ReplyComponent } from '../reply/reply.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  //creating ana input to accept he postd oc from post-feed.comp.ts
  @Input() postData: PostData | undefined;
  //next got to post.comp.html and ues {{}}
  creatorName: string | undefined;
  creatorDescription :string | undefined;

  firestore = new FirebaseTSFirestore();
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCreatorInfo();
  }

  onReplyClick(){ // inmport mat dialog and inject in constructor
    this.dialog.open(ReplyComponent);
  }

  getCreatorInfo(){  // to retreive the info of the user made the post
    this.firestore.getDocument( // as in DB thers a collection Users and data is saved as documne in it
      {
        path: ["Users", this.postData?.creatorId || ''],
        onComplete: result => {
          let userDocument = result.data();
          this.creatorName = userDocument?.['publicName'];
          this.creatorDescription = userDocument?.['description'];

        }


      }
    );
  }
}
