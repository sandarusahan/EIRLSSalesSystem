import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../lib/canvasjs.min';
import { CrudActionsManageService } from '../Services/crud-actions-manage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private crudManager : CrudActionsManageService) { }

  ngOnInit() {
    
    this.crudManager.hide();
    this.itemsPirChart();
    this.salesLineChart();
      }
  
      salesLineChart(){
        let chart = new CanvasJS.Chart("chartContainer1", {
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: "Basic Column Chart in Angular"
          },
          data: [{
            type: "line",
            dataPoints: [
              { y: 71, label: "January" },
              { y: 55, label: "February" },
              { y: 50, label: "March" },
              { y: 65, label: "April" },
              { y: 95, label: "May" },
              { y: 68, label: "June" },
              { y: 28, label: "July" },
              { y: 34, label: "Augast" },
              { y: 14, label: "September" },
              { y: 14, label: "October" },
              { y: 14, label: "November" },
              { y: 14, label: "December" }
            ]
          }]
        });
          
        chart.render();
      }

      itemsPirChart() {
        let chart = new CanvasJS.Chart("chartContainer2", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: true,
          title:{
            text: "Monthly Expense"
          },
          data: [{
            type: "pie",
            showInLegend: true,
            toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
            indexLabel: "{name} - #percent%",
            dataPoints: [
              { y: 450, name: "Food" },
              { y: 120, name: "Insurance" },
              { y: 300, name: "Traveling" },
              { y: 800, name: "Housing" },
              { y: 150, name: "Education" },
              { y: 150, name: "Shopping"},
              { y: 250, name: "Others" }
            ]
          }]
        });
          
        chart.render();
          }
      
}
