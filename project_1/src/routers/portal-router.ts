import express from 'express';
import { checkAuthenticated } from '../auth/index';

export const portalRouter = express.Router();


portalRouter.get('/', checkAuthenticated, async (request, response) => {
    try{ 
        response.render("portal", {name: request.user[0].userName})
    }catch (err){
        response.sendStatus(500);
        console.log(err)
        return;
    }
})
/*
use this syntax to extract the item from request
const i = request.user
console.log(i[0].firstName)
*/