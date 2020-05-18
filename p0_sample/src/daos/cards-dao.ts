import { db } from '../daos/db';
import { Cards, CardsLine } from '../models/cards';

export function getCards(): Promise<Cards[]> {
    const sql = 'SELECT * FROM p0.card_info';

    return db.query<CardsLine>(sql, []).then(result => {
        
        const lines: CardsLine[] = result.rows;

        //console.log(lines);

        const card: Cards[] = lines.map(row => Cards.from(row));
        return card;
    });
}

export function getCardsById(id: number): Promise<Cards> {
    
    const sql = 'SELECT * FROM p0.card_info WHERE customer_id = $1';

    return db.query<CardsLine>(sql, [id])
        .then(result => result.rows.map(row => Cards.from(row))[0]);
}