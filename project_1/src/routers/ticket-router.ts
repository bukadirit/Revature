import express, { response } from "express";
import * as ticketService from "../services/ticket-service";
import { ViewTicket } from "../models/view_ticket";
import { ManagerView } from "../models/manager_view";
import { checkAuthenticated, checkNotAuthenticated } from "../auth/index";
import { Ticket } from "../models/ticket";
import { UpdateView } from "../models/ticket_update";

export const ticketRouter = express.Router();
ticketRouter.get(
  "/",
  checkNotAuthenticated,
  async (request, response, next) => {
    let ticket: ManagerView[];
    try {
      ticket = await ticketService.getAllTicket();
      //console.log(ticket);
      if (!ticket) {
        response.sendStatus(404);
      } else {
        response.json(ticket);
      }
    } catch (err) {
      response.sendStatus(500);
      //console.log(err);
      return;
    }
    next();
  }
);

ticketRouter.get(
  "/:id",
  checkNotAuthenticated,
  async (request, response, next) => {
    const id = +request.params.id;
    let ticket: ViewTicket[];
    try {
      ticket = await ticketService.getTicket(id);
      //console.log(ticket);
      if (!ticket) {
        response.sendStatus(404);
      } else {
        response.json(ticket);
      }
    } catch (err) {
      response.sendStatus(500);
      //console.log(err);
      return;
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
      //console.log(err);
      response.sendStatus(500);
      return;
    }
    next();
  }
);

ticketRouter.patch("/", checkNotAuthenticated, async (request, response) => {
  const item = request.body;
  let ticket: UpdateView;

  try {
    ticket = await ticketService.patchTicket(item);
    if (!ticket) {
      response.sendStatus(404);
    } else {
      response.status(200);
      response.json(ticket);
    }
  } catch (err) {
    response.sendStatus(500);
    return;
  }
});
