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

  jobs: Job[] = [];

  areas: Area[] = [];

  isAreaActive: boolean = false;

  isSelectCorrect: boolean = false;

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

    this.areas.push(
      {id: 0, name: 'Services'},
      {id: 1, name: 'Kitchen'}
    );

    this.jobs.push(
      {id: 0, name: 'Manager'},
      {id: 1, name: 'Host'},
      {id: 2, name: 'Tuttofare'},
      {id: 3, name: 'Waitress'},
      {id: 4, name: 'Dining room manager'},
      {id: 5, name: 'Chef'},
      {id: 6, name: 'Sous chef'},
      {id: 7, name: 'Dishwasher'},
      {id: 8, name: 'Cook'},
    );

    console.log(this.areas);
    
  }

  areaSelected(id: number){
    if (id == 0) {
      this.jobs = this.jobs.slice(0,4);
      this.isAreaActive = true;
    } else {
      this.jobs = this.jobs.slice(5,8);
      this.isAreaActive = true;
    }
  }

  changeRate(id: number){
    if (this.jobs.filter(f => f.id == id)) {
      this.isSelectCorrect = true;
    } else {
      this.isSelectCorrect = false;
    }
  }

  createFormGroup() {

    return new FormGroup({
      name: new FormControl(''),
      dob: new FormControl(''),
      country: new FormGroup({
        name: new FormControl('')
      }),
      username: new FormControl(''),
      hiredate: new FormControl(''),
      status: new FormControl(''),
      area: new FormGroup({
        name: new FormControl('')
      }),
      jobtitle: new FormGroup({
        name: new FormControl('')
      }),
      tiprate: new FormControl('')
      
    })
  }

  addEmployee(){}

}
