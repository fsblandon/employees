import * as employeeActions from '../actions/employee.actions';
import { Employee } from '../models/employee';

export interface EmployeeState {
        employee: Employee | null;
};

const initialState: EmployeeState = null;

/* const initialState: Employee = {
    id: null ,
    name: action.payload.name,
    dob: action.payload.dob,
    age: action.payload.age,
    country: action.payload.country,
    username: action.payload.username,
    hiredate: action.payload.hiredate,
    status: action.payload.status,
    area: action.payload.area,
    jobtitle: action.payload.jobtitle,
    tiprate: action.payload.tiprate
} */


/* employee: {
    id: action.payload.id,
    name: action.payload.name,
    dob: action.payload.dob,
    age: action.payload.age,
    country: action.payload.country,
    username: action.payload.username,
    hiredate: action.payload.hiredate,
    status: action.payload.status,
    area: action.payload.area,
    jobtitle: action.payload.jobtitle,
    tiprate: action.payload.tiprate
} */

export function reducer(state: Employee[] = [], action: employeeActions.ClassActions ) {
    switch (action.type) {
        case employeeActions.EmployeeActionTypes.ADDEMPLOYEE: {
            return [...state, action.payload]
        }
        case employeeActions.EmployeeActionTypes.UPDATEEMPLOYEE: {
            /* state.filter(t => t.id === action.payload)
            return state */
            var obj = [
                ...state,
                action.payload
            ]
            console.log(...state);
            
            console.log(action.payload);

            //obj.filter(t => t === action.payload.employee)

            console.log(obj);

            return obj.filter(t => t === action.payload)
                
        }
        case employeeActions.EmployeeActionTypes.DELETEEMPLOYEE: {
            state.splice(action.payload, 1)
            return state
        }
        case employeeActions.EmployeeActionTypes.GETEMPLOYEE: {
            state.filter(t => t.id === action.payload)
            return state
        }

        default: {
            return state;
        }
    }
}