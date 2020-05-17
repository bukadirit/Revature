import { Orders } from '../models/Orders';
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

