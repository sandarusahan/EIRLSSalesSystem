import { AuthenticateService } from './../Services/authenticate.service';
import { User } from './../Models/User';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users:User[] = [];
  constructor(private auth:AuthenticateService) { }

  ngOnInit() {
    this.auth.findAllUsers().subscribe(users => {
      this.users = users;
    })
  }

}
