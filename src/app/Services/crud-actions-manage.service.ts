import { Customer } from './../Models/Customer';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudActionsManageService {
  visible: boolean;
  readonlybool:boolean;
  select:boolean = true;

  constructor() { this.visible = false; }

  hide() { this.visible = false; }

  show() { this.visible = true; }

  toggle() { this.visible = !this.visible; }

  readonly() { 
    this.readonlybool = true; 
  }

  editable(){
   this.readonlybool=false;
  }
}
