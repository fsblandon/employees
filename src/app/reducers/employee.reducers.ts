import * as employeeActions from '../actions/employee.actions';
import { Employee } from '../models/employee';

export interface State {
        employee: Employee | null;
};

const initialState: State = {
        employee: null
}

export function reducer(state = initialState, action: employeeActions.ClassActions ): State {
    switch (action.type) {
        case employeeActions.EmployeeActionTypes.ADDEMPLOYEE: {
            return {
                ...state,
                employee: {
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
                }
            };
        }

        default: {
            return state;
        }
    }
}