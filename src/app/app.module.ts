import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeComponent } from './components/employee/employee.component';

import { RouterModule } from "@angular/router";
import { NemployeeComponent } from './components/nemployee/nemployee.component';

//NGRX
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers/employee.reducers';

import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EmployeeComponent,
    NemployeeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'newemployee', component: NemployeeComponent},
      {path: 'employee/:id', component: EmployeeComponent},
      {path: '', component: DashboardComponent},
      {path: '**', redirectTo:'/'}
    ]),
    StoreModule.forRoot({
      employee: reducer
    }),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
