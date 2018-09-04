import * as employee from '../reducers/employee.reducers'

export interface AppState {
    employee: employee.State;
}