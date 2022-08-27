import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable, ɵɵsetComponentScope } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { userStatus } from './userStatus.model';
import { User } from './user.model';
import { LoggedUser } from './loggedUser.model';
import { userStory } from './userStory.model';

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
  loggedUser: LoggedUser= new LoggedUser();
  storyHeader = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  });

  constructor(private http: HttpClient) { }
  postUser(){
    return this.http.post(environment.apiBaseUrl+'/authenticate/register',this.newUser);
  }
  authUser(potentialUser: { email: string; password: string; }){
    return this.http.post(environment.apiBaseUrl+'/authenticate/login',potentialUser);
  }
  loadUser(user:User){
    this.newUser=user;
  }
  loadPotentialUser(user:User){
    this.potentialUser.email=user.email;
    this.potentialUser.password=user.password;
  }
  setLoggedUser(name:string, email:string){
    this.loggedUser.fullName=name;
    this.loggedUser.email=email;
  }
  setToken(token:any){
      this.setLoggedUser(token.fullName,token.email);
      localStorage.setItem('token',token.token);
      localStorage.setItem('tokenName',token.fullName);
      localStorage.setItem('tokenEmail',token.email);

  }
  getLoggedUser(){
    this.loggedUser.email=localStorage.getItem('tokenEmail');
    this.loggedUser.fullName=localStorage.getItem('tokenName');
    return this.loggedUser;
  }
  deleteToken(){
     localStorage.removeItem('token');
     localStorage.removeItem('tokenName');
     localStorage.removeItem('tokenEmail');
  }
  getUserPayload(){
    let token= localStorage.getItem('token');
    
    if(token){
      let payLoad: string = atob(token.split('.')[1]);
      return JSON.parse(payLoad);
    }
    else{
      return null;
    }
  }
  isLoggedIn(){
    let userPayload= this.getUserPayload();
    if(userPayload){
      return userPayload.exp > Date.now() / 1000;
    }
    else return false;
  }
  getUserPosts(): Observable<userStatus[]>{
    const toAdd :any = {'email' : this.loggedUser.email};
    let header = new HttpHeaders(toAdd);
    return this.http.get<userStatus[]>(environment.apiBaseUrl+'/status',{headers: header })
  }
  postStatus(newStatus: userStatus){
    console.log(newStatus)
    return this.http.post(environment.apiBaseUrl+'/status',newStatus);
  }
  getStories(email:string):Observable<userStory[]>{
    const toAdd :any = {'email' : email};
    let header = new HttpHeaders(toAdd);
    return this.http.get<userStory[]>(environment.apiBaseUrl+'/story',{headers: header })
  }
  postStory(formData: any){
    console.log(formData);
    return this.http.post(environment.apiBaseUrl+'/story', formData,{ headers: this.storyHeader });
  }

 
}
