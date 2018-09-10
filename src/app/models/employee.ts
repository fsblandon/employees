import { Country } from "./country";
import { Job } from './job';
import { Area } from "./jobArea";

export interface Employee {
    id: number,
    nameEmployee: string,
    dob: Date,
    age: number,
    country: Country,
    username: string,
    hiredate: Date,
    status: boolean,
    area: Area,
    jobtitle: Job,
    tiprate: number
}