export class Ticket{
   
    static from(obj: TicketLine): Ticket {
        const ticket = new Ticket(
            obj.reimb_id,
            obj.reimb_amount,
            obj.reimb_submiited,
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

    constructor(private reimb_id: number, private reimb_amount: string, private reimb_submiited: Date, private reimb_resolved: Date, private reimb_description: string, 
                private reimb_receipt: Blob,  private reimb_author: number, reimb_resolver: number, reimb_status_id: number, reimb_type_id: number) {}
}

export interface TicketLine {
    reimb_id: number;
    reimb_amount: string;
    reimb_submiited: Date;
    reimb_resolved: Date;
    reimb_description: string;
    reimb_receipt: Blob;
    reimb_author: number;
    reimb_resolver: number;
    reimb_status_id: number;
    reimb_type_id: number;
}