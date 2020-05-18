import express from 'express';
import * as cardsService from '../services/cards-service';
import { Cards } from '../models/Cards';

export const cardsRouter = express.Router();

cardsRouter.get('', (request, response, next) => {
    cardsService.getCards().then(card => {
        response.json(card);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
});

cardsRouter.get('/:id', (request, response, next) => {
    const id =+ request.params.id;
    cardsService.getCardsById(id).then(card => {
        if (!card) {
            response.sendStatus(404);
        } else {
            response.json(card);
        }
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
        next();
    })
});