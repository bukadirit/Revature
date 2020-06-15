export class Ticket {
  reimbId: number | string;
  reimbAmount: string;
  reimbSubmitted: Date;
  reimbResolved: Date;
  reimbDescription: string;
  reimbReceipt: Blob;
  reimbAuthor: number;
  reimbResolver: string;
  reimbStatusId: number;
  reimbTypeId: number;

  static from(obj: TicketLine): Ticket {
    const ticket = new Ticket(
      obj.reimb_id,
      obj.reimb_amount,
      obj.reimb_submitted,
      obj.reimb_resolved,
      obj.reimb_description,
      obj.reimb_receipt,
      obj.reimb_author,
      obj.reimb_resolver,
      obj.reimb_status_id,
      obj.reimb_type_id
    );
    return ticket;
  }

  constructor(
    reimbId: number,
    reimbAmount: string,
    reimbSubmitted: Date,
    reimbResolved: Date,
    reimbDescription: string,
    reimbReceipt: Blob,
    reimbAuthor: number,
    reimbResolver: string,
    reimbStatusId: number,
    reimbTypeId: number
  ) {
    this.reimbId = reimbId;
    this.reimbAmount = reimbAmount;
    this.reimbSubmitted = reimbSubmitted;
    this.reimbResolved = reimbResolved;
    this.reimbDescription = reimbDescription;
    this.reimbReceipt = reimbReceipt;
    this.reimbAuthor = reimbAuthor;
    this.reimbResolver = reimbResolver;
    this.reimbStatusId = reimbStatusId;
    this.reimbTypeId = reimbTypeId;
  }
}

export interface TicketLine {
  reimb_id: number;
  reimb_amount: string;
  reimb_submitted: Date;
  reimb_resolved: Date;
  reimb_description: string;
  reimb_receipt: Blob;
  reimb_author: number;
  reimb_resolver: string;
  reimb_status_id: number;
  reimb_type_id: number;
}
