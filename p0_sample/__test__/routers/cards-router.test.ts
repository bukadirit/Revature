import express from 'express';
import bodyParser from 'body-parser';
import * as cardService from '../../src/services/cards-service';
import { cardsRouter } from '../../src/routers/cards-router';
import request from 'supertest';

jest.mock('../../src/services/cards-service');
const mockCardService = cardService as any;

// Setup Express server and middleware
const app = express();
app.use(bodyParser.json())
app.use('/card', cardsRouter);

describe('GET /card', () => {
    test('Returns normally under normal circumstances', async () => {
        mockCardService.getCards.mockImplementation(async () => []);
        await request(app)
            // if we send a request to GET "/"
            .get('/card')
            // We expect a response with status of 200
            .expect(200)
            // and of content-type JSON
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test('Returns normally under normal circumstances', async () => {
        mockCardService.getCards.mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/card')
            .expect(500);
    });
});




describe('GET /card/owner', () => {
    test('Returns normally under normal circumstances', async () => {
        mockCardService.getCardOwner.mockImplementation(async () => []);
        await request(app)
            // if we send a request to GET "/"
            .get('/card/owner')
            // We expect a response with status of 200
            .expect(200)
            // and of content-type JSON
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test('Returns normally under normal circumstances', async () => {
        mockCardService.getCardOwner.mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/card/owner')
            .expect(500);
    });
});





describe('POST /card', () => {
    test('Successful creation should return 201 status', async () => {
        mockCardService.addCard.mockImplementation(async () => ({}));
        const payload = {
        id: undefined,
        ccType: 'visa',
        ccNumber: '534536475858786',
        expireDate: new Date(),
        securityCode: '546',
        customerId:undefined
        };

        await request(app)
            .post('/card')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Should return 500 when encountering an error', async () => {
        mockCardService.addCard.mockImplementation(async () => {throw new Error()});

        const payload = {
            id: undefined,
        ccType: 'visa',
        ccNumber: '534536475858786',
        expireDate: new Date(),
        securityCode: '546',
        customerId:undefined
        };

        await request(app)
            .post('/card')
            .send(payload)
            .expect(500);
    });
});



describe('GET /card/:id', () => {
    test('Normal behavior Json with status 200', async () => {
        mockCardService.getCardsById
            .mockImplementation(async () => ({}));

        await request(app)
            .get('/card/1')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockCardService.getCardsById
            .mockImplementation(async () => (0));

        await request(app)
            .get('/card/dragonite')
            .expect(404);
    });

    test('500 internal server error', async() => {
        mockCardService.getCardsById
            .mockImplementation(async () => {throw new Error()});

        await request(app)
            .get('/card/doesItMatter?')
            .expect(500)
    })
});




describe('PATCH /card', () => {
    test('Successful update should return 201 status', async () => {
        mockCardService.patchCard.mockImplementation(async () => ({}));
        const payload = {
        id: '1',
        ccType: 'visa',
        ccNumber: '534536475858786',
        expireDate: new Date(),
        securityCode: '546'
        };

        await request(app)
            .patch('/card')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockCardService.patchCard.mockImplementation(async () => (0));

        await request(app)
            .patch('/card')
            .expect(404);
    });

    test('Should return 500 when encountering an error', async () => {
        mockCardService.patchCard.mockImplementation(async () => {throw new Error()});

        const payload = {
        id: undefined,
        ccType: 'visa',
        ccNumber: '534536475858786',
        expireDate: new Date(),
        securityCode: '546'
        };

        await request(app)
            .patch('/card')
            .send(payload)
            .expect(500);
    });
});