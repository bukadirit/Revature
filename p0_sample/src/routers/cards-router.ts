import express from 'express';
import * as cardsService from '../services/cards-service';
import { Cards } from '../models/Cards';

export const cardsRouter = express.Router();

cardsRouter.get('/owner', (request, response, next) => {
    cardsService.getCardOwner().then(card => {
        response.json(card);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
});

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

cardsRouter.post('', (request, response, next) => {
    const card = request.body;
    cardsService.addCard(card)
        .then(newCards => {
            response.status(201);
            response.json(newCards);
            next();
        }).catch(err => {
            console.log(err)
            response.sendStatus(500);
            next();
        });
});

cardsRouter.patch('', (request, response, next) => {
    const card = request.body;
    cardsService.patchCard(card)
        .then(patchedCard => {
            if (patchedCard) {
                response.status(201);
                response.json(patchedCard);
            } else {
                response.sendStatus(404);
            }
        }).catch(err => {
            console.log(err)
            response.sendStatus(500);
        }).finally(() => {
            next();
        })
});
