import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.states';
import { Observable } from 'rxjs';
import { Job } from '../../models/job';

import * as employeeActions from "../../actions/employee.actions";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  /* employees: Employee[] = []; */
  employees: Observable<Employee>;

  jobs: Observable<Job>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {

    this.employees = this.store.select('employee');
    
    console.log(this.employees);
    
  }

  deleteEmployee(i: number){
    this.store.dispatch(new employeeActions.DeleteEmployee(i));
    console.log(this.employees);
  }

  updateEmployee(i: number) {
    this.store.dispatch(new employeeActions.UpdateEmployee(i));
    console.log(this.employees);
    
  }

}
