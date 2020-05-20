/**
 * This is a simple REST API that utilizes express and postgres to access, modify, and store customer information such as 
 * customer orders, credit cards, and addresses from a custom computer building shop. No methods for deleting said information
 * has been implemented in this api.
 */

import express from 'express';
import bodyParser from 'body-parser';
import { db } from './daos/db';
import { customerRouter } from './routers/customer-router';
import { ordersRouter } from './routers/orders-router';
import { cardsRouter } from './routers/cards-router';


const app = express();

const port = process.env.port || 3000;
app.set('port', port);


app.use(bodyParser.json());
app.use('/customer', customerRouter);
app.use('/order', ordersRouter);
app.use('/card', cardsRouter)

 /*process.on('SIGINT', () => {
    db.end().then(() => {
    console.log('Database pool closed');
     });
 });

process.on('unhandledRejection', () => {
    db.end().then(() => {
        console.log('Database pool closed');
    });
});
*/
app.listen(port, () => {
    console.log(`Home app running at http://localhost:${port}`);
});
