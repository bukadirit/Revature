import { db } from '../daos/db';
import { Orders, OrdersLine, Systems, SystemsLine } from '../models/orders';

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

export async function addSystem(system: Systems): Promise<Systems> {
        const sql = `INSERT INTO p0.system_ordered (system_brand, system_type, processor, ram, capacity, chipset,\
                     graphics_card, cooler_type, price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`
    
        const result = await db.query<SystemsLine>(sql, [
            system.systemBrand,
            system.systemType,
            system.processor,
            system.ram,
            system.capacity,
            system.chipset,
            system.graphicsCard,
            system.coolerType,
            system.price 
        ]);
    
        return result.rows.map(Systems.from)[0];
        }
    
export function patchSystem(system: Systems, id:number): Promise<Systems> {

        const sql = `UPDATE p0.system_ordered SET system_brand = COALESCE($1, system_brand), system_type = COALESCE($2, system_type),\
        processor = COALESCE($3, processor), ram = COALESCE($4, ram), capacity = COALESCE($5, capacity), chipset = COALESCE($6, chipset),\
        graphics_card = COALESCE($7, graphics_card), cooler_type = COALESCE($8, cooler_type), price = COALESCE($9, price)\
        WHERE id = $10 RETURNING *`;
        
        const params = [system.systemBrand, system.systemType, system.processor,
                    system.ram, system.capacity, system.chipset,
                    system.graphicsCard, system.coolerType, system.price, id
                    ];
        
        return db.query<SystemsLine>(sql, params)
        .then(result => result.rows.map(row => Systems.from(row))[0]);
        }
    