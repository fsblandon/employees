import { Employee } from './../../models/employee';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/app.states';
import { Observable } from 'rxjs';
import { Job } from '../../models/job';

import * as employeeActions from "../../actions/employee.actions";
import { dispatch } from 'rxjs/internal/observable/pairs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  employees: Employee[] = [];
  employees$: Observable<Employee[]>


  jobs: Observable<Job>;

  searchtext = "";

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {

    this.employees$ = this.store.pipe(select(data => data.employee));

    console.log(this.store.dispatch(new employeeActions.Load()));
    
    console.log(this.employees$);
    
  }

  deleteEmployee(i: number){
    this.store.dispatch(new employeeActions.DeleteEmployee(i));
    console.log(this.employees$);
  }

  updateEmployee(i: number, emp: Employee) {
    //this.store.dispatch(new employeeActions.UpdateEmployee(emp));

    console.log(this.employees$);
  }

  viewEmployee(i: number){
    this.store.dispatch(new employeeActions.GetEmployee(i));
  }
}
