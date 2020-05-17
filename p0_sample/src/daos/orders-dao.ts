import { db } from '../daos/db';
import { Orders, OrdersLine } from '../models/orders';

export function getOrder(): Promise<Orders[]> {
    const sql = 'SELECT * FROM p0.orders';

    return db.query<OrdersLine>(sql, []).then(result => {
        
        const lines: OrdersLine[] = result.rows;

        //console.log(lines);

        const order: Orders[] = lines.map(row => Orders.from(row));
        return order;
    });
}

export function getOrderById(id: number): Promise<Orders> {
    
    const sql = 'SELECT * FROM p0.orders WHERE id = $1';

    return db.query<OrdersLine>(sql, [id])
        .then(result => result.rows.map(row => Orders.from(row))[0]);
};

export function getUnordered(): Promise<Orders[]> {
    const sql = 'SELECT * FROM p0.orders WHERE customer_id IS NULL';

    return db.query<OrdersLine>(sql, []).then(result => {
        
        const lines: OrdersLine[] = result.rows;

        const order: Orders[] = lines.map(row => Orders.from(row));
        return order;
    });
}
    