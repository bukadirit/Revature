/**
 * Provides services to the customer router and provides information checks where necessary
 */
import { Customer } from '../models/Customer';
import * as customerDao from '../daos/customer-dao';

//return all customers with complete address
export function getCustomer(): Promise<Customer[]> {
    return customerDao.getCustomer();
}

//return customers by ID
export function getCustomerById(id: number): Promise<Customer> {
    return customerDao.getCustomerById(id);
}

//return newly added customer info and check validity
export function addCustomer(cust: any): Promise<Customer> {
    //create a new customer with the follopwing parameters
    const newCustomer = new Customer(
        undefined,
        cust.firstName,
        cust.lastName,
        cust.address,
        cust.city,
        cust.state,
        cust.zip,
    );
    
    //confirm info is valid, pass it to dao, and return new customer
    if ( cust.firstName && cust.lastName && cust.address &&
         cust.city && cust.state && cust.zip) 
         {
        return customerDao.addCustomer(newCustomer);
    } else {
        //return an error of 422 if check fails
        return new Promise((resolve, reject) => reject(422));
    }
}

//update an existing customer
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
//if no id is provided, throw an error with status code 400
if (!cust.id) {
    throw new Error ('400');
}
 //pass the information to the dao and return updated customer
return customerDao.patchCustomer(cust);
}

