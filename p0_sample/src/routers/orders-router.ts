import express from 'express';
import * as ordersService from '../services/orders-service';
import { Systems } from '../models/orders';

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

ordersRouter.post('', async (request, response, next) => {
    const system = request.body;
    let newSystems: Systems;

    try {
        newSystems = await ordersService.addSystem(system);
    } catch (err) {
        console.log(err)
        response.sendStatus(500);
        return;
    }

    if (newSystems) {
        response.status(201);
        response.json(newSystems);
    }
    next();
});

ordersRouter.patch('', (request, response, next) => {
    const system = request.body;
    //console.log(system.length)
    ordersService.patchSystem(system)
        .then(patchedSystem => {
            if (patchedSystem) {
                response.status(201);
                response.json(patchedSystem);
            } else {
                response.sendStatus(404);
            }
        }).catch(err => {
            response.sendStatus(500);
        }).finally(() => {
            next();
        })
});