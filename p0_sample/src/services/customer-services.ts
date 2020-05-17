import { Customer } from '../models/Customer';
import * as customerDao from '../daos/customer-dao';

export function getCustomer(): Promise<Customer[]> {
    return customerDao.getCustomer();
}

export function getCustomerById(id: number): Promise<Customer> {
    return customerDao.getCustomerById(id);
}