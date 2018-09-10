import * as employee from '../reducers/employee.reducers'
import { Employee } from '../models/employee';
import { createFeatureSelector } from '@ngrx/store';

export interface AppState {
    readonly employee: Employee[];
}
