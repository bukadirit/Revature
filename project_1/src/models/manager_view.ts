export class ManagerView {
  id: number;
  firstName: string;
  lastName: string;
  amount: string;
  submitDate: Date;
  resolveDate: Date;
  resolver: string;
  description: string;
  receipt: Blob;
  status: string;
  type: string;
  reimbId: number;

  static from(obj: ManagerLine): ManagerView {
    const viewTicket = new ManagerView(
      obj.ers_user_id,
      obj.ers_first_name,
      obj.ers_last_name,
      obj.reimb_amount,
      obj.reimb_submitted,
      obj.reimb_resolved,
      obj.reimb_resolver,
      obj.reimb_description,
      obj.reimb_receipt,
      obj.reimb_status,
      obj.reimb_type,
      obj.reimb_id
    );
    return viewTicket;
  }

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    amount: string,
    submitDate: Date,
    resolveDate: Date,
    resolver: string,
    description: string,
    receipt: Blob,
    status: string,
    type: string,
    reimbId: number
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.amount = amount;
    this.submitDate = submitDate;
    this.resolveDate = resolveDate;
    this.resolver = resolver;
    this.description = description;
    this.receipt = receipt;
    this.status = status;
    this.type = type;
    this.reimbId = reimbId;
  }
}

export interface ManagerLine {
  ers_user_id: number;
  ers_first_name: string;
  ers_last_name: string;
  reimb_amount: string;
  reimb_submitted: Date;
  reimb_resolved: Date;
  reimb_resolver: string;
  reimb_description: string;
  reimb_receipt: Blob;
  reimb_status: string;
  reimb_type: string;
  reimb_id: number;
}
