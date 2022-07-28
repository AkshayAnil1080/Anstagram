import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  selectedImageFile : File | undefined;  // variable to select the current image
  constructor() { }

  ngOnInit(): void {
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
