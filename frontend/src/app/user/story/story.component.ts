import { Component, OnInit } from '@angular/core';
import { MinValidator } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { userStory } from 'src/app/shared/userStory.model';
import { environment } from 'src/environments/environment';
import {MatIconModule} from '@angular/material/icon';
class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
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
  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.setName();
    console.log(this.user.email);
    this.getStoriesOfFriends(this.user.email);
   
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


      this.userService.postStory(formData).subscribe((res) => {
        if (res) {
          console.log('Story Done');
        }
      })
    }
  
  }
  
}
