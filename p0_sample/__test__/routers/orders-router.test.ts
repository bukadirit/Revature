import express from 'express';
import bodyParser from 'body-parser';
import * as orderService from '../../src/services/orders-service';
import { ordersRouter } from '../../src/routers/orders-router';
import request from 'supertest';

jest.mock('../../src/services/orders-service');
const mockOrderService = orderService as any;

// Setup Express server and middleware
const app = express();
app.use(bodyParser.json())
app.use('/order', ordersRouter);

describe('GET /order', () => {
    test('Returns normally under normal circumstances', async () => {
        mockOrderService.getOrder.mockImplementation(async () => []);
        await request(app)
            // if we send a request to GET "/"
            .get('/order')
            // We expect a response with status of 200
            .expect(200)
            // and of content-type JSON
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test('Returns normally under normal circumstances', async () => {
        mockOrderService.getOrder.mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/order')
            .expect(500);
    });
});




describe('GET /order/unordered', () => {
    test('Returns normally under normal circumstances', async () => {
        mockOrderService.getUnordered.mockImplementation(async () => []);
        await request(app)
            // if we send a request to GET "/"
            .get('/order/unordered')
            // We expect a response with status of 200
            .expect(200)
            // and of content-type JSON
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test('Returns normally under normal circumstances', async () => {
        mockOrderService.getUnordered.mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/order/unordered')
            .expect(500);
    });
});





describe('POST /order', () => {
    test('Successful creation should return 201 status', async () => {
        mockOrderService.addSystem.mockImplementation(async () => ({}));
        const payload = {
            id: undefined,
            systemBrand: 'GIGABYTE',
            systemType: 'LAPTOP',
            processor: 'INTEL CORE i7 8700HK',
            ram: '16 GB',
            capacity: '512 SSD + 1 TB HDD',
            chipset: 'Z390',
            graphicsCard: 'NVIDIA GTX 1070Ti',
            coolerType: 'proprietary',
            price: '1699.99'
        };

        await request(app)
            .post('/order')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Should return 500 when encountering an error', async () => {
        mockOrderService.addSystem.mockImplementation(async () => {throw new Error()});

        const payload = {
            id: undefined,
            systemBrand: 'GIGABYTE',
            systemType: 'LAPTOP',
            processor: 'INTEL CORE i7 8700HK',
            ram: '16 GB',
            capacity: '512 SSD + 1 TB HDD',
            chipset: 'Z390',
            graphicsCard: 'NVIDIA GTX 1070Ti',
            coolerType: 'proprietary',
            price: '1699.99'
        };

        await request(app)
            .post('/order')
            .send(payload)
            .expect(500);
    });
});



describe('GET /order/:id', () => {
    test('Normal behavior Json with status 200', async () => {
        mockOrderService.getOrderById
            .mockImplementation(async () => ({}));

        await request(app)
            .get('/order/1')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockOrderService.getOrderById
            .mockImplementation(async () => (0));

        await request(app)
            .get('/order/dragonite')
            .expect(404);
    });

    test('500 internal server error', async() => {
        mockOrderService.getOrderById
            .mockImplementation(async () => {throw new Error()});

        await request(app)
            .get('/order/doesItMatter?')
            .expect(500)
    })
});




describe('PATCH /order', () => {
    test('Successful update should return 201 status', async () => {
        mockOrderService.patchSystem.mockImplementation(async () => ({}));
        const payload = {
            id: "2",
            systemBrand: 'GIGABYTE',
            systemType: 'LAPTOP',
            processor: 'INTEL CORE i7 8700HK',
            ram: '16 GB',
            capacity: '512 SSD + 1 TB HDD',
            chipset: 'Z390',
            graphicsCard: 'NVIDIA GTX 1070Ti',
            undefined,
            price: '1699.99'
        };

        await request(app)
            .patch('/order')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockOrderService.patchSystem.mockImplementation(async () => (0));

        await request(app)
            .patch('/order')
            .expect(404);
    });

    test('Should return 500 when encountering an error', async () => {
        mockOrderService.patchSystem.mockImplementation(async () => {throw new Error()});

        const payload = {
            undefined,
            systemBrand: 'GIGABYTE',
            systemType: 'LAPTOP',
            processor: 'INTEL CORE i7 8700HK',
            ram: '16 GB',
            capacity: '512 SSD + 1 TB HDD',
            chipset: 'Z390',
            graphicsCard: 'NVIDIA GTX 1070Ti',
            coolerType: 'proprietary',
            price: '1699.99'
        };

        await request(app)
            .patch('/order')
            .send(payload)
            .expect(500);
    });
});