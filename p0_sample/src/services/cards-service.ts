import { Cards } from '../models/Cards';
import * as cardsDao from '../daos/cards-dao';

export function getCards(): Promise<Cards[]> {
    return cardsDao.getCards();
}

export function getCardsById(id: number): Promise<Cards> {
    return cardsDao.getCardsById(id);
}