import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.states';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Employee } from '../../models/employee';
import { Country } from '../../models/country';
import { Area } from '../../models/jobArea';
import { Job } from '../../models/job';

import * as employeeActions from "../../actions/employee.actions";
import { Router } from '@angular/router';

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

  status: boolean = false;
  
  tiprates: number;

  constructor(
    private store: Store<AppState>,
    private router: Router){ 
    this.EmployeeForm = this.createFormGroup();
    
  }

  ngOnInit() {

    this.countries.push(
      {id: 0, nameCountry: 'USA'},
      {id: 1, nameCountry: 'Germany'},
      {id: 2, nameCountry: 'Italy'},
      {id: 3, nameCountry: 'France'}
    );

    this.areas.push(
      {id: 0, nameArea: 'Services'},
      {id: 1, nameArea: 'Kitchen'}
    );

    this.jobs.push(
      {id: 0, nameJob: 'Manager'},
      {id: 1, nameJob: 'Host'},
      {id: 2, nameJob: 'Tuttofare'},
      {id: 3, nameJob: 'Waitress'},
      {id: 4, nameJob: 'Dining room manager'},
      {id: 5, nameJob: 'Chef'},
      {id: 6, nameJob: 'Sous chef'},
      {id: 7, nameJob: 'Dishwasher'},
      {id: 8, nameJob: 'Cook'},
    );

    console.log(this.areas);
  }

  createFormGroup() {

    return new FormGroup({
      nameEmployee: new FormControl('', Validators.required),
      dob: new FormControl('',Validators.required),
      age: new FormControl('',Validators.required),
      country: new FormGroup({
        nameCountry: new FormControl('',Validators.required)
      }),
      username: new FormControl('',Validators.required),
      hiredate: new FormControl('',Validators.required),
      status: new FormControl(status ? status : false,Validators.required),
      area: new FormGroup({
        nameArea: new FormControl('',Validators.required)
      }),
      jobtitle: new FormGroup({
        nameJob: new FormControl('',Validators.required)
      }),
      tiprate: new FormControl(0.01, Validators.required)
      
    });
  }

  areaSelected(id: number){
    
    if (id == 0) {
      this.jobTitles = this.jobs.slice(0,5);
      this.isAreaActive = true;
      console.log(this.areas[id]);
      
    } else {
      this.jobTitles = this.jobs.slice(5,9);
      this.isAreaActive = true;
      console.log(this.areas[id]);
    }
    
  }

  changeRate(value: any){
    console.log(value);
    if (value == 'Waitress' || value == 'Dining room manager') {
      this.EmployeeForm.get('tiprate').enable();
      this.EmployeeForm.get('tiprate').reset();
    } else {
      this.tiprates = 0.01;
      //this.EmployeeForm.get('tiprate').enable();
      console.log(this.EmployeeForm.controls['tiprate'].value);
      //this.EmployeeForm.patchValue({'tiprate' : this.tiprates});
      //this.EmployeeForm.get('tiprate').disable();
      
    }
  }



  validateAge(){
    let doB = new Date(this.EmployeeForm.controls['dob'].value);
    let ageDif = Date.now() - doB.getTime();
    let ageDate = new Date(ageDif);
    let age = Math.abs(ageDate.getUTCFullYear() - 1970);

    if (age < 18) {
      console.log('incorrect age');
      alert('Dob not valid');
      this.EmployeeForm.get('dob').reset();
    }

    this.EmployeeForm.controls['age'].setValue(age);
    
  }

  onSubmit(): void{
    //this.EmployeeForm.controls['tiprate'].setValue(this.EmployeeForm.controls['tiprate'].value);
    console.log(this.EmployeeForm);
    const result: Employee = Object.assign({},this.EmployeeForm.value);
    
    result.area = Object.assign({}, result.area);
    result.country = Object.assign({}, result.country);
    result.jobtitle = Object.assign({}, result.jobtitle);

    console.log(result);
    
    this.store.dispatch(new employeeActions.AddEmployee(result));

    this.router.navigate(['']);
  }

}
