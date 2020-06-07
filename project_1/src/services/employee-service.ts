import * as  employeeDao from '../daos/employee-dao';
import { Employee } from '../models/employee'

export function getEmployee(email:string): Promise<Employee[]>{
    return employeeDao.getEmployee(email);
}