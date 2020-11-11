import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
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

  url = "https://sales-app-saho.herokuapp.com/users/"
  // url = "http://localhost:8080/users/"
  constructor(private router:Router, private http:HttpClient) { }

  authenticate(uname:string, pwd:string){
    let msg = "authentication fail"

    this.http.post<any>(this.url+"login", {username:uname, password:pwd}, {observe: 'response'}).subscribe(res => {
      this.authenticated = true;
      this.username = uname;
      this.saveToken(res.headers.get('Authorization'));
      msg = "Login success"
      this.router.navigate(['home'])
      
    }, err => {
      msg = "Invalid username/password"
      this.username = "Not logged in"
      this.authenticated = false;
      console.log(err);
    })
   
    return msg;
  }

  registerUser(user:User){
    this.http.post<User>(this.url+"signup", user);
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

  public getToken(): string {
    return sessionStorage.getItem('TOKEN_KEY');
  }

  isAuthenticated(): boolean {
    if(this.getToken() == null && !this.authenticated) {
      return false;
    }else {
      return true;
    }
  }
}
