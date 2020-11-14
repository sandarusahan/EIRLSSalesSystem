import { Router } from '@angular/router';
import { AuthenticateService } from './../Services/authenticate.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public auth:AuthenticateService, private router:Router) { }

  ngOnInit() {
    if(this.auth.getUsername() == null){
      this.router.navigate(['login']);
    }else {
      this.auth.findUser(this.auth.getUsername()).subscribe(user => this.auth.loggedUser = user);
    }
  }

  logout(){
    this.auth.logout();
  }
}
