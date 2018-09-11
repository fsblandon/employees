import { Action } from '@ngrx/store';
import { Employee } from '../models/employee';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum EmployeeActionTypes {
    ADDEMPLOYEE = '[Employee] AddEmployee',
    UPDATEEMPLOYEE = '[Employee] UpdateEmployee',
    DELETEEMPLOYEE = '[Employee] DeleteEmployee',
    GETEMPLOYEE = '[Employee] GetEmployee',
    LOAD = '[Employee] Load'
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class AddEmployee implements Action {
    readonly type = EmployeeActionTypes.ADDEMPLOYEE;

    constructor(public payload: Employee) { }
}

export class UpdateEmployee implements Action {
    readonly type = EmployeeActionTypes.UPDATEEMPLOYEE;

    /* constructor( 
        public payload: number,
        public changes: Partial<Employee>) 
    { } */
    constructor(public payload: Employee){}
}

export class DeleteEmployee implements Action {
    readonly type = EmployeeActionTypes.DELETEEMPLOYEE;

    constructor(public payload: number) { }
}

export class GetEmployee implements Action {
    readonly type = EmployeeActionTypes.GETEMPLOYEE;

    constructor(public payload: number) { }
}

export class Load implements Action {
    readonly type = EmployeeActionTypes.LOAD;
  
    constructor() { }
  }


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type ClassActions = AddEmployee| UpdateEmployee | DeleteEmployee | GetEmployee;
