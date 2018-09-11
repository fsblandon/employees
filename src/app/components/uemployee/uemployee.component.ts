import { Employee } from './../../models/employee';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { Country } from '../../models/country';
import { Job } from '../../models/job';
import { Area } from '../../models/jobArea';
import { Store, select } from '@ngrx/store';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AppState } from '../../store/app.states';

import * as employeeActions from "../../actions/employee.actions";
import { Observable, from } from 'rxjs';


@Component({
  selector: 'app-uemployee',
  templateUrl: './uemployee.component.html',
  styleUrls: ['./uemployee.component.css']
})
export class UemployeeComponent implements OnInit {

  EmployeeForm: FormGroup;
  submitted: boolean = false;

  countries: Country[] = [];

  jobs: Job[] = [];

  areas: Area[] = [];

  isAreaActive: boolean = false;

  isSelectCorrect: boolean = false;

  jobTitles: Job[] = this.jobs;

  employees: Observable<Employee[]>

  idurl: number;


  constructor(
    private store: Store<AppState>,
    private router: Router,
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute) {
      
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

    let country = this.formBuilder.group({
      nameCountry: ''
    });

    let area = this.formBuilder.group({
      nameArea: ''
    });

    let jobtitle = this.formBuilder.group({
      nameJob: ''
    });
    

    this.EmployeeForm = this.formBuilder.group({
      nameEmployee: '',
      dob: '',
      age: null,
      country: country,
      username: '',
      hiredate: '',
      status: false,
      area: area,
      jobtitle: jobtitle,
      tiprate: null
    });

    this.activeRoute.params.subscribe((p: Params) => {
      this.idurl = p['id'];
      console.log(this.idurl);
      
    });

    console.log(this.store.select('employee'));
    

    this.store.select(data => data.employee)
      .subscribe((data) => {

      console.log(data);

      console.log(this.EmployeeForm);

      

      //console.log(data.findIndex(item => item.id == this.idurl));

      //let dataindex = data.findIndex(item => item.id == this.idurl)

      console.log(data[this.idurl]);

      //data.forEach(id => {


        this.EmployeeForm.controls['nameEmployee'].setValue(data[this.idurl].nameEmployee.toString().valueOf());
        
        //this.EmployeeForm.patchValue({'nameEmployee' : id.nameEmployee.toString()});
        //console.log(this.EmployeeForm.patchValue({'nameEmployee' : id.nameEmployee}));
        
        this.EmployeeForm.controls['dob'].setValue(data[this.idurl].dob);
        this.EmployeeForm.controls['age'].setValue(data[this.idurl].age);

        //country.setValue({'nameCountry' : id.country.nameCountry});
        this.EmployeeForm.patchValue({'country' : data[this.idurl].country});

        this.EmployeeForm.controls['username'].setValue(data[this.idurl].username.toString().valueOf());
        this.EmployeeForm.controls['hiredate'].setValue(data[this.idurl].hiredate);
        this.EmployeeForm.controls['status'].setValue(data[this.idurl].status);

        //area.setValue({'nameArea' : id.area.nameArea});
        this.EmployeeForm.patchValue({'area' : data[this.idurl].area});

        //jobtitle.setValue({'nameJob' : id.jobtitle.nameJob});
        this.EmployeeForm.patchValue({'jobtitle' : data[this.idurl].jobtitle});

        this.EmployeeForm.controls['tiprate'].setValue(data[this.idurl].tiprate);

      //});

    }, ()=> {
      console.log('error');
      
    });

    console.log(this.EmployeeForm);
    

    console.log(this.employees);

  }

  getObjectForm(id: number){

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

    console.log(this.idurl);
    
    this.store.dispatch(new employeeActions.UpdateEmployee(result));

    //console.log(this.store.dispatch(new employeeActions.UpdateEmployee({id: this.idurl, employee: result['selectedEm']})));
    
    console.log(this.store.select('employee'));

    this.router.navigate(['']);
  }

}
