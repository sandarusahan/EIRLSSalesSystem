import { User } from './../Models/User';
import { AuthenticateService } from './../Services/authenticate.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  msg:string;
  constructor(private auth:AuthenticateService, private router:Router) { }

  user:User = new User();
  ngOnInit() {
  }

  authenticateUser(user:User){
    console.log(user.password)
    this.msg=this.auth.authenticate(user.username, user.password);
    
  }
}
