import { db } from './db'
import { Employee, EmployeeLine } from '../models/employee'

export async function getEmployee(email:string): Promise<Employee[]>{
    const sql = `SELECT * FROM project1.ers_users WHERE project1.ers_users.user_email = $1`;

    const result = await db.query<EmployeeLine>(sql,[email]);
    //console.log(result)
    return result.rows.map(Employee.from);
}