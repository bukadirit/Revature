/*istanbul ignore file*/
/**
 * Interfaces with the database and returns information to the cards service
 */
import { db } from '../daos/db';
import { Cards, CardsLine } from '../models/cards';
import { CardOwner, CardOwnerLine } from '../models/card-owner';

//retrieve credit cards from the database that exist in the credit_cards table
export function getCards(): Promise<Cards[]> {
    const sql = 'SELECT * FROM p0.credit_cards';

    return db.query<CardsLine>(sql, []).then(result => {
        
        const lines: CardsLine[] = result.rows;

        const card: Cards[] = lines.map(row => Cards.from(row));
        return card;
    });
}

//retrieve cards by an id
export function getCardsById(id: number): Promise<Cards> {
    
    const sql = 'SELECT * FROM p0.credit_cards WHERE id = $1';

    return db.query<CardsLine>(sql, [id])
        .then(result => result.rows.map(row => Cards.from(row))[0]);
}

//retrieve cards and their owner info from the database using the view card_info
export function getCardOwner(): Promise<CardOwner[]> {
    const sql = 'SELECT * FROM p0.card_info';

    return db.query<CardOwnerLine>(sql, []).then(result => {
        
        const lines: CardOwnerLine[] = result.rows;

        const cardOwner: CardOwner[] = lines.map(row => CardOwner.from(row));
        return cardOwner;
    });
}

//add a new card to the credit_cards table and return info to card service
export function addCard(card: Cards): Promise<Cards> {
    const sql = `INSERT INTO p0.credit_cards (cc_type, cc_number, expire_date, security_code) \
                 VALUES ($1, $2, $3, $4) RETURNING *`;

    return db.query<CardsLine>(sql, [
        card.ccType,
        card.ccNumber,
        card.expireDate.toISOString(),
        card.securityCode
    
    ]).then(result => result.rows.map(row => Cards.from(row))[0]);
}

//update a card in the credit_cards table and return info 
export function patchCard(card: Cards): Promise<Cards> {

    const sql = `UPDATE p0.credit_cards SET cc_type = COALESCE($1, cc_type), cc_number = COALESCE($2, cc_number),\
                 expire_date = COALESCE($3, expire_date), security_code= COALESCE($4, security_code) WHERE id = $5 RETURNING *`;

    const expireDate = card.expireDate && card.expireDate.toISOString();

    const params = [
        card.ccType,
        card.ccNumber,
        expireDate,
        card.securityCode,
        card.id
    ];

    return db.query<CardsLine>(sql, params)
        .then(result => result.rows.map(row => Cards.from(row))[0]);
}