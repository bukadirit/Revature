import { Cards, CardsLine } from '../models/Cards';
import { CardOwner } from '../models/Card-owner';
import * as cardsDao from '../daos/cards-dao';

export function getCards(): Promise<Cards[]> {
    return cardsDao.getCards();
}

export function getCardsById(id: number): Promise<Cards> {
    return cardsDao.getCardsById(id);
}

export function getCardOwner(): Promise<CardOwner[]> {
    return cardsDao.getCardOwner();
}

export function addCard(card: any): Promise<Cards> {

    const newCards = new Cards(
        undefined,
        card.ccType,
        card.ccNumber,
        card.expireDate = new Date(),
        card.securityCode,
        undefined
    );

    if(card.ccType && card.ccNumber && new Date (card.expireDate) && card.securityCode) {
        return cardsDao.addCard(newCards);
    } else {
        return new Promise((resolve, reject) => reject(422));
    }
}

export function patchCard(input: any): Promise<Cards> {

    //const expireDate = input.expireDate && new Date(input.expire);
    console.log(input)

    const card = new Cards(
        input.id,
        input.ccType,
        input.ccNumber,
        input.expireDate = new Date(),
        input.securityCode,
        undefined
    );

    if (!card.id) {
       
        throw new Error('400');
    }

    return cardsDao.patchCard(card);
}