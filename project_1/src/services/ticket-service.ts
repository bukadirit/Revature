import * as ticketDao from "../daos/ticket-dao";
import { ViewTicket } from "../models/view_ticket";
import { Ticket } from "../models/ticket";
import { ManagerView } from "../models/manager_view";

export function getTicket(id: number): Promise<ViewTicket[]> {
  return ticketDao.getTicket(id);
}

export function getAllTicket(): Promise<ManagerView[]> {
  return ticketDao.getAllTicket();
}

export function createTicket(ticket: any): Promise<Ticket> {
  const newTicket = new Ticket(
    undefined,
    ticket.reimbAmount,
    null,
    null,
    ticket.reimbDescription,
    null,
    ticket.reimbAuthor,
    null,
    null,
    ticket.reimbTypeId
  );
  //console.log(newTicket);
  if (
    ticket.reimbAmount &&
    ticket.reimbDescription &&
    ticket.reimbAuthor &&
    ticket.reimbTypeId
  ) {
    return ticketDao.createTicket(newTicket);
  } else {
    return new Promise((resolve, reject) => reject(422));
  }
}
