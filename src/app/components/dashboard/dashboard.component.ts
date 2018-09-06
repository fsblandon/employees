import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.states';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  /* employees: Employee[] = []; */
  employees: Observable<Employee[]>;

  constructor(private store: Store<AppState>) {
    this.employees = store.select('employee'); 
  }

  ngOnInit() {
  }

}
