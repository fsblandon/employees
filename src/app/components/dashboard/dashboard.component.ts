import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  employees: Employee[] = [];

  constructor() { }

  ngOnInit() {
  }

}
