/**
 * This router retrieves, updates, and stores information about the existing systems that 
 * either have been purchased or not
 */

 import express from 'express';
import * as ordersService from '../services/orders-service';
import { Systems } from '../models/orders';

export const ordersRouter = express.Router();

//Get all systems that have not been purchased yet
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

//Get a system by ID; includes those that have not been purchased
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

//Get all systems; Includes the purchaser where available
ordersRouter.get('', (request, response, next) => {
    ordersService.getOrder().then(order => {
        response.json(order);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
});

//Adds new systems only ommitting any customer information
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

//Updates system information only; no customer information is affected
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