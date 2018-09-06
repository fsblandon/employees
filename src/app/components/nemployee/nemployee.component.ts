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

  jobTitles: Job[] = this.jobs;

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
    console.log(id);
    
    if (id == 0) {
      this.jobTitles = this.jobs.slice(0,5);
      this.isAreaActive = true;
      console.log(this.areas[id]);
      console.log(this.EmployeeForm);
    } else {
      this.jobTitles = this.jobs.slice(5,9);
      this.isAreaActive = true;
      console.log(this.areas[id]);
    }
    console.log(this.jobs);
    
  }

  changeRate(value: string){
    console.log(value);
    
    if (value == 'Waitress' || value == 'Dining room manager') {
      console.log(this.isSelectCorrect);
      //this.EmployeeForm.controls['tiprate'].enabled;
      this.isSelectCorrect = true;
    } else {
      console.log(this.isSelectCorrect);
      this.isSelectCorrect = false;
    }
  }

  createFormGroup() {

    return new FormGroup({
      name: new FormControl('', Validators.required),
      dob: new FormControl('',Validators.required),
      country: new FormGroup({
        name: new FormControl('', Validators.required)
      }),
      username: new FormControl('', Validators.required),
      hiredate: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      area: new FormGroup({
        name: new FormControl('', Validators.required)
      }),
      jobtitle: new FormGroup({
        name: new FormControl('', Validators.required)
      }),
      tiprate: new FormControl('', Validators.required)
      
    })
  }

  addEmployee(){}

}
