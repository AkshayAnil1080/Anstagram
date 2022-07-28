import { Component, Input, OnInit } from '@angular/core';
import { PostData } from 'src/app/pages/post-feed/post-feed.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  //creating ana input to accept he postd oc from post-feed.comp.ts
  @Input() postData: PostData | undefined;
  //next got to post.comp.html and ues {{}}
  constructor() { }

  ngOnInit(): void {
  }

}
