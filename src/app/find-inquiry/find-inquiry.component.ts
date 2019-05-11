import { Component, OnInit } from '@angular/core';
import { CrudActionsManageService } from '../Services/crud-actions-manage.service';

@Component({
  selector: 'app-find-inquiry',
  templateUrl: './find-inquiry.component.html',
  styleUrls: ['./find-inquiry.component.css']
})
export class FindInquiryComponent implements OnInit {

  constructor(private crudManager:CrudActionsManageService) { }

  ngOnInit() {
    this.crudManager.show();
  }

}
