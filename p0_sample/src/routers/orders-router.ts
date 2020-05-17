import express from 'express';
import * as ordersService from '../services/orders-service';

export const ordersRouter = express.Router();

ordersRouter.get('/unordered', (request, response, next) => {
    ordersService.getUnordered().then(order => {
        response.json(order);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
        next();
    });
});

ordersRouter.get('/:id', (request, response, next) => {
    const id =+ request.params.id;
    ordersService.getOrderById(id).then(order => {
        if (!order) {
            response.sendStatus(404);
        } else {
            response.json(order);
        }
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
        next();
    })
});

ordersRouter.get('', (request, response, next) => {
    ordersService.getOrder().then(order => {
        response.json(order);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
});

