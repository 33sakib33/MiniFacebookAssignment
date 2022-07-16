import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/user.model';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  user: User= new User();
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean | undefined;
  serverErrorMessages: string | undefined;
  constructor(private userService: UserService) { }
  
  ngOnInit(): void {
  }
    register1():void{
      console.log("kisuekta");
      this.resetForm();
    }
    login():void{
    
    this.userService.loadPotentialUser(this.user);
    this.userService.authUser(this.userService.potentialUser).subscribe(
      res => {
        // console.log(JSON.parse(res));
        this.userService.setToken(res);
        this.userService.getUserPayload();
      },
    );
  }

  resetForm() {
    this.user= {
      fullName: '',
      email: '',
      password: ''
    };
    this.serverErrorMessages = '';
  }

}
