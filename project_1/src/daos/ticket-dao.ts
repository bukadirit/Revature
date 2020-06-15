import { db } from "./db";
import { ViewTicket, ViewTicketLine } from "../models/view_ticket";
import { Ticket, TicketLine } from "../models/ticket";
import { ManagerView, ManagerLine } from "../models/manager_view";

export async function getAllTicket(): Promise<ManagerView[]> {
  const sql = `SELECT * FROM project1.mview`;

  const result = await db.query<ManagerLine>(sql, []);
  return result.rows.map(ManagerView.from);
}

export async function getTicket(id: number): Promise<ViewTicket[]> {
  const sql = `SELECT * FROM project1.ticket WHERE ers_user_id = $1`;

  const result = await db.query<ViewTicketLine>(sql, [id]);
  return result.rows.map(ViewTicket.from);
}

export async function createTicket(ticket: Ticket): Promise<Ticket> {
  const sql = `INSERT INTO project1.ers_reimbursement (reimb_amount, reimb_submitted,  \
    reimb_resolved,reimb_description, reimb_receipt, reimb_author, reimb_resolver,\
    reimb_status_id, reimb_type_id) VALUES ($1, $2, $3, $4,$5,$6,$7,$8,$9) RETURNING *`;

  const result = await db.query<TicketLine>(sql, [
    ticket.reimbAmount,
    null,
    null,
    ticket.reimbDescription,
    null,
    ticket.reimbAuthor,
    null,
    null,
    ticket.reimbTypeId,
  ]);
  try {
    return result.rows.map(Ticket.from)[0];
  } catch (error) {
    console.log(error);
    return;
  }
}
