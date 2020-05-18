import { db } from '../daos/db';
import { Customer, CustomerLine } from '../models/customer';

export function getCustomer(): Promise<Customer[]> {
    const sql = 'SELECT * FROM p0.cus_info';

    return db.query<CustomerLine>(sql, []).then(result => {
        
        const lines: CustomerLine[] = result.rows;

        //console.log(lines);

        const cust: Customer[] = lines.map(row => Customer.from(row));
        return cust;
    });
}

export function getCustomerById(id: number): Promise<Customer> {
    
    const sql = 'SELECT * FROM p0.cus_info WHERE id = $1';

    return db.query<CustomerLine>(sql, [id])
        .then(result => result.rows.map(row => Customer.from(row))[0]);
}

export async function addCustomer(cust: Customer): Promise<Customer> {
    let sql = `INSERT INTO p0.postal (city, state, zip) VALUES ($1, $2, $3) RETURNING *`;

    const result = await db.query<CustomerLine>(sql, [
        
        cust.city,
        cust.state,
        cust.zip,
        
    ]);
    let temp = result.rows.map(Customer.from)[0];
    sql = `INSERT INTO p0.customer (first_name, last_name, address, postal) VALUES ($1, $2, $3, $4) RETURNING *`;

    const result1 = await db.query<CustomerLine>(sql, [
        
        cust.firstName,
        cust.lastName,
        cust.address,
        temp.id
        
    ]);
    temp = result1.rows.map(Customer.from)[0];
    sql = 'SELECT * FROM p0.cus_info Where id = $1'

    return db.query<CustomerLine>(sql, [temp.id])
        .then(result => result.rows.map(row => Customer.from(row))[0]);
    }


export async function patchCustomer(cust: Customer): Promise<Customer> {
        let sql = `UPDATE p0.customer SET first_name = COALESCE($1, first_name), last_name = COALESCE($2, last_name),\ 
                     address = COALESCE($3, address) WHERE id = $4`;
    
        let result = await db.query<CustomerLine>(sql, [
        cust.firstName,
        cust.lastName,
        cust.address,
        cust.id
        ]);
        
        sql = `UPDATE p0.postal SET city = COALESCE($1, city), state = COALESCE($2, state), zip = COALESCE($3, zip) WHERE customer_id = $4`;
    
        result = await db.query<CustomerLine>(sql, [
        cust.city,
        cust.state,
        cust.zip,
        cust.id
        ]);
    
        sql = 'SELECT * FROM p0.cus_info Where id = $1'

    return db.query<CustomerLine>(sql, [cust.id])
        .then(result => result.rows.map(row => Customer.from(row))[0]);
    }    
