import { AuthenticateService } from './../Services/authenticate.service';
import { Component, OnInit } from '@angular/core';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public showOverlay = true;
  constructor(private router: Router, public auth:AuthenticateService) { }

  ngOnInit() {

    if(this.auth.getUsername() == null){
      this.router.navigate(['login']);
    }else {
      this.auth.findUser(this.auth.getUsername()).subscribe(user => this.auth.loggedUser = user);
    }

    if(!this.auth.isAuthenticated() || this.auth.getToken() == null){
      this.router.navigate(['login']);
    }
    this.router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    })
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.showOverlay = true;
    }
    if (event instanceof NavigationEnd) {
      this.showOverlay = false;
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.showOverlay = false;
    }
    if (event instanceof NavigationError) {
      this.showOverlay = false;
    }
  }
}
