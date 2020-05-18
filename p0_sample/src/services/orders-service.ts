import { Orders, Systems } from '../models/Orders';
import * as ordersDao from '../daos/orders-dao';

export function getOrder(): Promise<Orders[]> {
    return ordersDao.getOrder();
}

export function getOrderById(id: number): Promise<Orders> {
    return ordersDao.getOrderById(id);
}

export function getUnordered(): Promise<Orders[]> {
    return ordersDao.getUnordered();
}

export function addSystem(system: any): Promise<Systems> {
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
    if ( system.systemBrand && system.systemType && system.processor &&
        system.ram && system.capacity && system.chipset &&
        system.graphicsCard && system.coolerType && system.price) {
        return ordersDao.addSystem(newSystems);
    } else {
        return new Promise((resolve, reject) => reject(422));
    }
    
}

export function patchSystem(input: any): Promise<Systems> {
    const id = input.id;
    const system = new Systems(
        input.systemBrand, input.systemType, input.processor,
        input.ram, input.capacity, input.chipset,
        input.graphicsCard, input.coolerType, input.price
    );

    if (!id) {
        throw new Error('400');
    }

    return ordersDao.patchSystem(system,id);
}