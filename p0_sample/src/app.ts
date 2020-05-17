import express from 'express';
import bodyParser from 'body-parser';
import { db } from './daos/db';
import { customerRouter } from './routers/customer-router';

const app = express();

const port = process.env.port || 3000;
app.set('port', port);

app.use(bodyParser.json());

app.use('/customer', customerRouter);

/*
    Listen for SIGINT signal - issued by closing the server with ctrl+c
    This releases the database connections prior to app being stopped
*/
// process.on('SIGINT', () => {
//     db.end().then(() => {
//         console.log('Database pool closed');
//     });
// });

process.on('unhandledRejection', () => {
    db.end().then(() => {
        console.log('Database pool closed');
    });
});

app.listen(port, () => {
    console.log(`Home app running at http://localhost:${port}`);
});