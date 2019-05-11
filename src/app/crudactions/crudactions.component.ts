import { CrudActionsManageService } from './../Services/crud-actions-manage.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crudactions',
  templateUrl: './crudactions.component.html',
  styleUrls: ['./crudactions.component.css']
})
export class CrudactionsComponent implements OnInit {
 
  currentUrl : string
  lastLetters : string
  constructor(private router : Router, public crudManager : CrudActionsManageService, private route : ActivatedRoute) { }

  ngOnInit() {
    this.currentUrl = this.router.url;
  }
  
  onNewClick() {
    this.currentUrl = this.router.url;
    this.lastLetters = this.currentUrl.substr(this.currentUrl.length - 3)
    console.log(this.currentUrl.substr(this.currentUrl.length - 3))
    this.crudManager.hide()
    this.router.navigate(['new'],{relativeTo:this.route});
  }

  onEditClick() {
    this.currentUrl = this.router.url;
    console.log(this.currentUrl)
    this.crudManager.hide()
    this.crudManager.editable();
    if(this.currentUrl.substr(this.currentUrl.length - 3) != "upd")    
    this.router.navigate(['customers', 'upd']);
    

  }

  onDeleteClick() {
    this.crudManager.hide()
    this.currentUrl = this.router.url;
    console.log(this.currentUrl)
    if(this.currentUrl.substr(this.currentUrl.length - 3) != "del")    
    this.router.navigate(['customers', 'del']);
  }

}
