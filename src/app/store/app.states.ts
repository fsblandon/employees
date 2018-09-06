import * as employee from '../reducers/employee.reducers'
import { Employee } from '../models/employee';

export interface AppState {
    employee: Employee[];
}