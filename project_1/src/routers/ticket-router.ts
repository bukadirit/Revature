import express, { response } from "express";
import * as ticketService from "../services/ticket-service";
import { ViewTicket } from "../models/view_ticket";
import { ManagerView } from "../models/manager_view";
import { checkAuthenticated, checkNotAuthenticated } from "../auth/index";
import { Ticket } from "../models/ticket";

export const ticketRouter = express.Router();
ticketRouter.get("/", async (request, response, next) => {
  let ticket: ManagerView[];
  try {
    ticket = await ticketService.getAllTicket();
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
});

ticketRouter.get(
  "/:id",
  checkNotAuthenticated,
  async (request, response, next) => {
    const id = +request.params.id;
    let ticket: ViewTicket[];
    try {
      ticket = await ticketService.getTicket(id);
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

ticketRouter.post(
  "/",
  checkNotAuthenticated,
  async (request, response, next) => {
    const ticket = request.body;
    let newTicket: Ticket;
    //console.log("here");
    try {
      newTicket = await ticketService.createTicket(ticket);
      response.status(201);
      response.json(newTicket);
    } catch (err) {
      console.log(err);
      response.sendStatus(500);
      return;
    }
    next();
  }
);
