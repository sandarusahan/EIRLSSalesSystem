import { AuthenticateService } from './../Services/authenticate.service';
import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../lib/canvasjs.min';
import { CrudActionsManageService } from '../Services/crud-actions-manage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private crudManager : CrudActionsManageService, private auth:AuthenticateService) { }

  ngOnInit() {

    if(this.auth.authenticated){
      this.crudManager.hide();
      
        
    }else{
      
    }

    
    
          }
      
}
