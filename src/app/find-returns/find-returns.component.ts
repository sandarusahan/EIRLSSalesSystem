import { CrudActionsManageService } from './../Services/crud-actions-manage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-find-returns',
  templateUrl: './find-returns.component.html',
  styleUrls: ['./find-returns.component.css']
})
export class FindReturnsComponent implements OnInit {

  constructor(private crudManager:CrudActionsManageService) { }

  ngOnInit() {
    this.crudManager.show()
  }

}
