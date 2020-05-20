/**
 * Provides services to the orders router, interfacing with the order DAOs file. 
 * Also performs information checks where necessary
 */

 import { Orders, Systems } from '../models/Orders';
import * as ordersDao from '../daos/orders-dao';

//Returns all systems with customer information
export function getOrder(): Promise<Orders[]> {
    return ordersDao.getOrder();
}

//Returns sysstem information by ID
export function getOrderById(id: number): Promise<Orders> {
    return ordersDao.getOrderById(id);
}

//Returns all systems that have not yet been purchased
export function getUnordered(): Promise<Orders[]> {
    return ordersDao.getUnordered();
}

//Returns newly added system information
export function addSystem(system: any): Promise<Systems> {
    //Create new system with the following parameters
    const newSystems = new Systems(
        system.systemBrand,
        system.systemType,
        system.processor,
        system.ram,
        system.capacity,
        system.chipset,
        system.graphicsCard,
        system.coolerType,
        parseInt(system.price) 
    );

    //Verify that the following parameters are actually defined
    if ( system.systemBrand && system.systemType && system.processor &&
        system.ram && system.capacity && system.chipset &&
        system.graphicsCard && system.coolerType && system.price) {
        return ordersDao.addSystem(newSystems);
    } else {
        //return an error of 422 if the check fails
        return new Promise((resolve, reject) => reject(422));
    }
    
}

//Updates existing system information and verifies the id is defined
export function patchSystem(input: any): Promise<Systems> {
    const id = input.id;
    const system = new Systems(
        input.systemBrand, input.systemType, input.processor,
        input.ram, input.capacity, input.chipset,
        input.graphicsCard, input.coolerType, input.price
    );
    //if no id is provided, throw an error with status code 400
    if (!id) {
        throw new Error('400');
    }
    //pass the information to the dao and return updated system
    return ordersDao.patchSystem(system,id);
}