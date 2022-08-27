import { Component, OnInit } from '@angular/core';
import { MinValidator } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { userStory } from 'src/app/shared/userStory.model';
import { environment } from 'src/environments/environment';
import {MatIconModule} from '@angular/material/icon';
import { FileItem, FileUploader, ParsedResponseHeaders } from 'ng2-file-upload';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {
  user: any={ title:"kisu", email: "kisu"};
  stories: userStory[]=[];
  file:any;
  fileName = '';
  public uploader: FileUploader = new FileUploader({
    url: "http://localhost:9001/story",
    itemAlias: 'image',
    additionalParameter: {
      email:this.userService.getLoggedUser().email,
      name:this.userService.getLoggedUser().fullName
    }
 
  });
  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.setName();
    console.log(this.user.email);
    this.getStoriesOfFriends(this.user.email);
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onCompleteItem = () => { };

    this.uploader.onSuccessItem = () => { };
  }
  onUpload() {
    console.log("ekhane");
    console.log(this.user.title);
  
    this.uploader.uploadAll();
  }
  setName(){
    this.user.title=this.userService.getLoggedUser().fullName;
    this.user.email=this.userService.getLoggedUser().email;
  }
  getStoriesOfFriends(email:string){
    this.userService.getStories(email).subscribe((data)=>{
      for(let i in data){
        this.stories.push(new userStory(data[i].fullName,data[i].email,data[i].uuid,data[i].path,data[i].dom));
      }
  });
  setTimeout(()=>this.prepPath(),3000)
  
  }
  prepPath(){
    for(let i in this.stories){
      console.log(this.stories[i].uuid);
    }
  }
  doSomething(){
    console.log("something");
  }
  onFileSelected(event: any) {

    this.file = event.target.files[0];

    let reader = new FileReader();

    if (this.file) {

      const formData = new FormData();
      formData.append('files', this.file, this.file.name);
      formData.append('name', this.user.title);
      formData.append('email', this.user.email);

      this.userService.postStory(formData).subscribe((res) => {
        if (res) {
          console.log('Story Done');
        }
      })
    }
  
  }
  
}
