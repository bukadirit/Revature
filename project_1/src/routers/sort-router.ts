import express, { response } from "express";
import * as sortService from "../services/sort-service";
import { checkAuthenticated, checkNotAuthenticated } from "../auth/index";
import { ManagerView } from "../models/manager_view";

export const sortRouter = express.Router();

sortRouter.get(
  "/:id",
  checkNotAuthenticated,
  async (request, response, next) => {
    const option = request.params.id;
    console.log(option);
    let ticket: ManagerView[];
    try {
      ticket = await sortService.sortTicket(option);
      //console.log(ticket);
      response.json(ticket);
    } catch (err) {
      response.sendStatus(500);
      //console.log(err);
      return;
    }
    if (!ticket) {
      response.sendStatus(404);
    } else {
      response.json(ticket);
    }
    next();
  }
);
