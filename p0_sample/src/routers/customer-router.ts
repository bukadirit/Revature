import express from 'express';
import * as customerService from '../services/customer-services';
import { Customer } from '../models/Customer';

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
    const id =+ request.params.id;
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

customerRouter.post('', async (request, response, next) => {
    const cust = request.body;
    let newCustomer: Customer;

    try {
        console.log(cust)
        newCustomer = await customerService.addCustomer(cust);
    } catch (err) {
        console.log(err)
        response.sendStatus(500);
        return;
    }

    if (newCustomer) {
        response.status(201);
        response.json(newCustomer);
    }
    next();
});

customerRouter.patch('', async (request, response, next) => {
    const cust = request.body;
    let patchCustomer: Customer;

    try {
        patchCustomer = await customerService.patchCustomer(cust);
    } catch (err) {
        response.sendStatus(500);
        return;
    }

    if (!patchCustomer) {
        response.sendStatus(404);
    } else {
        response.status(201);
        response.json(patchCustomer);
    }
    next();
});