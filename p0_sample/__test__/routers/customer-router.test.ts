import express from 'express';
import bodyParser from 'body-parser';
import * as customerService from '../../src/services/customer-services';
import { customerRouter } from '../../src/routers/customer-router';
import request from 'supertest';

jest.mock('../../src/services/customer-services');
const mockCustomerService = customerService as any;

// Setup Express server and middleware
const app = express();
app.use(bodyParser.json())
app.use('/customer', customerRouter);

describe('GET /customer', () => {
    test('Returns normally under normal circumstances', async () => {
        mockCustomerService.getCustomer.mockImplementation(async () => []);
        await request(app)
            // if we send a request to GET "/"
            .get('/customer')
            // We expect a response with status of 200
            .expect(200)
            // and of content-type JSON
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test('Returns normally under normal circumstances', async () => {
        mockCustomerService.getCustomer.mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/customer')
            .expect(500);
    });
});





describe('POST /customer', () => {
    test('Successful creation should return 201 status', async () => {
        mockCustomerService.addCustomer.mockImplementation(async () => ({}));
        const payload = {
            id: undefined,
            firstName: 'Reshi',
	        lastName: 'Ram',
        	address: 'Pokemon Black',
        	city: 'castle',
	        state: 'GameFreak',
        	zip: '22122'
        };

        await request(app)
            .post('/customer')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Should return 500 when encountering an error', async () => {
        mockCustomerService.addCustomer.mockImplementation(async () => {throw new Error()});

        const payload = {
            firstName: 'Reshi',
	        lastName: 'Ram',
        	address: 'Pokemon Black',
        	city: 'castle',
	        state: 'GameFreak',
        	zip: '22122'
        };

        await request(app)
            .post('/customer')
            .send(payload)
            .expect(500);
    });
});




describe('GET /customer/:id', () => {
    test('Normal behavior Json with status 200', async () => {
        mockCustomerService.getCustomerById
            .mockImplementation(async () => ({}));

        await request(app)
            .get('/customer/1')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockCustomerService.getCustomerById
            .mockImplementation(async () => (0));

        await request(app)
            .get('/customer/dragonite')
            .expect(404);
    });

    test('500 internal server error', async() => {
        mockCustomerService.getCustomerById
            .mockImplementation(async () => {throw new Error()});

        await request(app)
            .get('/customer/doesItMatter?')
            .expect(500)
    })
});





describe('PATCH /customer', () => {
    test('Successful update should return 201 status', async () => {
        mockCustomerService.patchCustomer.mockImplementation(async () => ({}));
        const payload = {
            id: "2",
            firstName: 'Reshi',
	        lastName: '',
        	address: 'Pokemon Black',
        	city: '',
	        state: 'GameFreak',
        	zip: '22122'
        };

        await request(app)
            .patch('/customer')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockCustomerService.patchCustomer.mockImplementation(async () => (0));

        await request(app)
            .patch('/customer')
            .expect(404);
    });

    test('Should return 500 when encountering an error', async () => {
        mockCustomerService.patchCustomer.mockImplementation(async () => {throw new Error()});

        const payload = {
            undefined,
            firstName: 'Reshi',
	        lastName: 'Ram',
        	address: 'Pokemon Black',
        	city: 'castle',
	        state: 'GameFreak',
        	zip: '22122'
        };

        await request(app)
            .patch('/customer')
            .send(payload)
            .expect(500);
    });
});