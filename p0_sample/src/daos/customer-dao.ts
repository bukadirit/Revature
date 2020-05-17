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
