import { Customer } from '../models/Customer';
import * as customerDao from '../daos/customer-dao';

export function getCustomer(): Promise<Customer[]> {
    return customerDao.getCustomer();
}

export function getCustomerById(id: number): Promise<Customer> {
    return customerDao.getCustomerById(id);
}

export function addCustomer(cust: any): Promise<Customer> {
    const newCustomer = new Customer(
        undefined,
        cust.firstName,
        cust.lastName,
        cust.address,
        cust.city,
        cust.state,
        cust.zip,
    );

    if ( cust.firstName && cust.lastName && cust.address &&
         cust.city && cust.state && cust.zip) 
         {
        return customerDao.addCustomer(newCustomer);
    } else {
        return new Promise((resolve, reject) => reject(422));
    }
}

export function patchCustomer(input: any): Promise<Customer> {
 
const cust = new Customer(
    input.id,
    input.firstName,
    input.lastName,
    input.address,
    input.city,
    input.state,
    input.zip
);

if (!cust.id) {
    throw new Error ('400');
}

return customerDao.patchCustomer(cust);
}

