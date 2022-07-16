import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  newUser : User ={
    fullName:"",
    email:"",
    password:""
  };
  potentialUser={
    email:"",
    password:""
  };
  constructor(private http: HttpClient) { }
  postUser(){
    return this.http.post(environment.apiBaseUrl+'/register',this.newUser);
  }
  authUser(potentialUser: { email: string; password: string; }){
    return this.http.post(environment.apiBaseUrl+'/authenticate',potentialUser);
  }
  loadUser(user:User){
    this.newUser=user;
  }
  loadPotentialUser(user:User){
    this.potentialUser.email=user.email;
    this.potentialUser.password=user.password;
  }
  setToken(token:any){
    
    localStorage.setItem('token',token);
  }
  deleteToken(){
    localStorage.removeItem('token');
  }
  getUserPayload(){
    let token= localStorage.getItem('token');
    if(token){
      console.log(token);
      let payLoad: string = token.split('.')[1];
      console.log(payLoad);
      console.log("ekhane")
      return null;
    }
    else{
      return null;
    }
  }
  isLoggedIn(){
    let userPayload= this.getUserPayload();
    if(userPayload){
      return null;
      // return userPayload.exp>Date.now()/1000;
    }
    else return false;
  }

}
