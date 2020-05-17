import express from 'express';
import * as customerService from '../services/customer-services';

export const customerRouter = express.Router();

customerRouter.get('', (request, response, next) => {
    customerService.getCustomer().then(cust => {
        response.json(cust);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
});

customerRouter.get('/:id', (request, response, next) => {
    const id = +request.params.id;
    customerService.getCustomerById(id).then(cust => {
        if (!cust) {
            response.sendStatus(404);
        } else {
            response.json(cust);
        }
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
        next();
    })
});