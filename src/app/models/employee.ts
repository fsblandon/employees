import { Country } from "./country";
import { Job } from './job';

export interface Employee {
    id: number,
    name: string,
    dob: Date,
    age: number,
    country: Country,
    username: string,
    hiredate: Date,
    status: boolean,
    area: string,
    jobtitle: Job,
    tiprate: number
}