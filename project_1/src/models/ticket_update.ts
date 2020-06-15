export class UpdateView {
  id: number;
  status: number;
  reimbId: number;

  static from(obj: UpdateLine): UpdateView {
    const updateTicket = new UpdateView(
      obj.ers_user_id,
      obj.reimb_status,
      obj.reimb_id
    );
    return updateTicket;
  }
  constructor(id: number, status: number, reimbId: number) {
    this.id = id;
    this.status = status;
    this.reimbId = reimbId;
  }
}

export interface UpdateLine {
  ers_user_id: number;
  reimb_status: number;
  reimb_id: number;
}
