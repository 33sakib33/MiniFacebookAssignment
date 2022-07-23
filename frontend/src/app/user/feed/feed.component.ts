import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { userStatus } from 'src/app/shared/userStatus.model';
import { userStory } from 'src/app/shared/userStory.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  user: any={ title:"kisu", email: "kisu"};
  posts:userStatus[]=[];
  newStatus: userStatus=new userStatus();
  stories: userStory[]= [];
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {

    this.setName();
    this.getPostsOfFriends();
    // this.getStoriesOffriends(this.user.email);
    
  }
  getPostsOfFriends(){

    this.userService.getUserPosts().subscribe(data=>this.posts=data);
    
  }
  getStoriesOffriends(email:string){
    this.userService.getStories(email).subscribe(data=>this.stories=data);
  }
  setName(){
    this.user.title=this.userService.getLoggedUser().fullName;
    console.log(this.userService.getLoggedUser());
    this.user.email=this.userService.getLoggedUser().email;
  }
  postAStatus(){
    this.newStatus.fullName=this.user.title;
    this.newStatus.email=this.user.email;
    this.newStatus.dom=new Date();
    this.userService.postStatus(this.newStatus).subscribe(
      res => {
        this.resetForm();
      },
      err => {}
    );
  }
  resetForm(){
    
    this.newStatus= new userStatus();
  }
  logout(){
    this.userService.deleteToken();
    this.router.navigate(['signin']);
  }
}
