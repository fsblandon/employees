import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.states';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Employee } from '../../models/employee';
import { Country } from '../../models/country';
import { Area } from '../../models/jobArea';
import { Job } from '../../models/job';

@Component({
  selector: 'app-nemployee',
  templateUrl: './nemployee.component.html',
  styleUrls: ['./nemployee.component.css']
})
export class NemployeeComponent implements OnInit {

  EmployeeForm: FormGroup;
  submitted: boolean = false;

  //countries = require("../../../assets/countries.json");

  countries: Country[] = [];

  jobtitle: Job[] = [];

  area: Area[] = [];



  constructor(
    private store: Store<AppState>){ 
    this.EmployeeForm = this.createFormGroup();
  }

  ngOnInit() {

    this.countries.push(
      {id: 0, name: 'USA'},
      {id: 1, name: 'Germany'},
      {id: 2, name: 'Italy'},
      {id: 3, name: 'France'}
    );

    this.area.push(
      {id: 0,name: 'Manager'},
      {id: 1, name: 'Kitchen'}
    );

    this.jobtitle.push(
      {id: 0, name: 'Host', area: this.area[0]},
      {id: 1, name: 'Tuttofare', area: this.area[0]},
      {id: 2, name: 'Waitress', area: this.area[0]},
      {id: 3, name: 'Dining room manager', area: this.area[0]},
      {id: 4, name: 'Chef', area: this.area[1]},
      {id: 5, name: 'Sous chef', area: this.area[1]},
      {id: 6, name: 'Dishwasher', area: this.area[1]},
      {id: 7, name: 'Cook', area: this.area[1]},
    );
  }


  createFormGroup() {

    return new FormGroup({
      name: new FormControl(),
      dob: new FormControl(),
      country: new FormGroup({
        id: new FormControl(),
        name: new FormControl()
      }),
      username: new FormControl(),
      hiredate: new FormControl(),
      status: new FormControl(),
      area: new FormControl(),
      jobtitle: new FormGroup({
        id: new FormControl(),
        area: new FormGroup({
          id: new FormControl(),
          name: new FormControl()
        }),
        name: new FormControl()
      }),
      tiprate: new FormControl()
      
    })
  }

  addEmployee(){}

}
