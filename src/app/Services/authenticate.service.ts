import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from './../Models/User';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  authenticated:boolean = false;
  username:string = "Not logged in";
  loggedUser:User;
  url = "https://sales-app-saho.herokuapp.com/users/"
   //url = "http://localhost:8080/users/"
  constructor(private router:Router, private http:HttpClient) {
    this.loggedUser = new User();
   }

  authenticate(uname:string, pwd:string){
    let msg = ""

    this.http.post<any>(this.url+"login", {username:uname, password:pwd}, {observe: 'response'}).subscribe(res => {
      this.authenticated = true;
      this.username = uname;
      this.saveToken(res.headers.get('Authorization'));
      this.saveUsername(uname);
      msg = "Login success"
      this.findUser(uname).subscribe(user => {
        this.loggedUser = user;
        this.router.navigate(['home'])
      }, err => console.log(err))
      
      
    }, err => {
      if(err instanceof HttpErrorResponse){
        if(err.status === 403){
          msg = "Invalid username/password"
          this.router.navigate(['/login']);
        }else {
          msg = "Authentication Error";
        }
      }else {
        msg = "Authentication Error";
      }
      
      this.username = "Not logged in"
      this.authenticated = false;
      console.log(err);
    })
   
    return msg;
  }

  registerUser(user:User){
    return this.http.post<User>(this.url+"signup", user);
  }

  findUser(username:string){
    return this.http.get<User>(this.url+"username/"+username)
  }

  findAllUsers(){
    return this.http.get<User[]>(this.url+"all");
  }

  updateUser(user:User){
    return this.http.put<User>(this.url+"update/"+user.username, user);
  }
  logout(){
    this.authenticated = false;
    this.username = "Not logged in!"
    this.router.navigate(['login']);
    this.signOut();
  }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem('TOKEN_KEY');
    window.sessionStorage.setItem('TOKEN_KEY', token);
  }

  public saveUsername(username: string) {
    window.sessionStorage.removeItem('USERNAME');
    window.sessionStorage.setItem('USERNAME', username);
  }

  public getToken(): string {
    return sessionStorage.getItem('TOKEN_KEY');
  }
  public getUsername(): string {
      return sessionStorage.getItem('USERNAME');
    }
  isAuthenticated(): boolean {
    if(this.getToken() == null && !this.authenticated) {
      return false;
    }else {
      return true;
    }
  }

  isAutherized(destination:string){
    this.findUser(this.getUsername()).subscribe(user => {
      this.isUserAutherized(user, destination);
    })
  }

  isUserAutherized(user:User, destination:string){
    if(user.role != "ADMIN"){
      if(!user.userAccess.includes(destination)){
        this.router.navigate(['/unautherized']);
      }
    }
  }
}
