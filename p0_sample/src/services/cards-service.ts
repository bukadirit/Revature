/**
 * Provide services to cards router and check information validity where necessary
 */
import { Cards, CardsLine } from '../models/Cards';
import { CardOwner } from '../models/Card-owner';
import * as cardsDao from '../daos/cards-dao';

//return all cards ommitting customer info
export function getCards(): Promise<Cards[]> {
    return cardsDao.getCards();
}

//return card by ID ommitting customer info
export function getCardsById(id: number): Promise<Cards> {
    return cardsDao.getCardsById(id);
}

//return all card info with customer info
export function getCardOwner(): Promise<CardOwner[]> {
    return cardsDao.getCardOwner();
}

//return newly added card info and check validity
export function addCard(card: any): Promise<Cards> {
    //create a new card with the follopwing parameters
    const newCards = new Cards(
        undefined,
        card.ccType,
        card.ccNumber,
        card.expireDate = new Date(),
        card.securityCode,
        undefined
    );
    //confirm info is valid, pass it to dao, and return new card
    if(card.ccType && card.ccNumber && new Date (card.expireDate) && card.securityCode) {
        return cardsDao.addCard(newCards);
    } else {
        //return an error of 422 if check fails
        return new Promise((resolve, reject) => reject(422));
    }
}

//update an existing card
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
    //if no id is provided, throw an error with status code 400
    if (!card.id) {
       
        throw new Error('400');
    }
     //pass the information to the dao and return updated card
    return cardsDao.patchCard(card);
}