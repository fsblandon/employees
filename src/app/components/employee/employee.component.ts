import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Country } from '../../models/country';
import { Job } from '../../models/job';
import { Area } from '../../models/jobArea';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { AppState } from '../../store/app.states';
import { Employee } from '../../models/employee';

import * as employeeActions from "../../actions/employee.actions";
import { Observable } from 'rxjs';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  EmployeeForm: FormGroup;
  submitted: boolean = false;

  countries: Country[] = [];

  jobs: Job[] = [];

  areas: Area[] = [];

  isAreaActive: boolean = false;

  isSelectCorrect: boolean = false;

  jobTitles: Job[] = this.jobs;

  employee: Observable<Employee>


  constructor(
    private store: Store<AppState>,
    private router: Router,
    private formBuilder: FormBuilder,
    private routeActive: ActivatedRoute) {

      
  }

  ngOnInit() {

    this.employee = this.store.select(e => e.employee);

    let e: Employee;
    this.employee.subscribe(id => {
      e = id;
    });

    /* this.EmployeeForm = this.formBuilder.group({
      name: [e.name, Validators.required],
      dob: [e.dob, Validators.required],
      age: [e.age, Validators.required],
      country: [e.country, Validators.required],
      username: [e.username, Validators.required],
      hiredate: [e.hiredate, Validators.required],
      status: [e.status, Validators.required],
      area: [e.area, Validators.required],
      jobtitle: [e.jobtitle, Validators.required],
      tiprate: [e.tiprate, Validators.required]
    })*/

    return new FormGroup({
      name: new FormControl(e.name, Validators.required),
      dob: new FormControl(e.dob,Validators.required),
      age: new FormControl(e.age,Validators.required),
      country: new FormGroup({
        name: new FormControl(e.country,Validators.required)
      }),
      username: new FormControl(e.username,Validators.required),
      hiredate: new FormControl(e.hiredate,Validators.required),
      status: new FormControl(e.status,Validators.required),
      area: new FormGroup({
        name: new FormControl(e.area,Validators.required)
      }),
      jobtitle: new FormGroup({
        name: new FormControl(e.jobtitle,Validators.required)
      }),
      tiprate: new FormControl({value: e.tiprate,disabled: true})
      
    }, Validators.required);

    console.log(this.employee);

  }

  areaSelected(id: number){
    console.log(id);
    
    if (id == 0) {
      this.jobTitles = this.jobs.slice(0,5);
      this.isAreaActive = true;
      console.log(this.areas[id]);
      
    } else {
      this.jobTitles = this.jobs.slice(5,9);
      this.isAreaActive = true;
      console.log(this.areas[id]);
    }
    console.log(this.jobs);

    console.log(this.EmployeeForm);
    
  }

  changeRate(value: any){
    console.log(value);
    if (value == 'Waitress' || value == 'Dining room manager') {
      this.EmployeeForm.get('tiprate').enable();
      this.EmployeeForm.get('tiprate').reset();
    } else {
      this.EmployeeForm.get('tiprate').disable();
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
