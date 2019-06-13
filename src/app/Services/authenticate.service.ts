import { User } from './../Models/User';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  authenticated:boolean = true;
  username:string = "Not logged in";
  constructor(private router:Router) { }

  authenticate(username:string, password:string){
    let msg = "authentication fail"
    if(username === "admin" && password === "admin123"){
        this.authenticated = true;
        this.username = username;
        msg = "Login success"
        this.router.navigate([''])
    }else{
      msg = "Invalid username/password"
      this.username = "Not logged in"
      this.authenticated = false;
    }
    console.log(this.authenticated);
    return msg;
  }

  logout(){
    this.authenticated = false;
    this.username = "Not logged in!"
    this.router.navigate(['login']);
  }
}
