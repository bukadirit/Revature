export class ViewTicket{
   
    static from(obj: ViewTicketLine): ViewTicket {
        const viewTicket = new ViewTicket(
            obj.ers_user_id,
            obj.ers_first_name,
            obj.ers_last_name,
            obj.reimb_amount,
            obj.reimb_submited,
            obj.reimb_resolved,
            obj.reimb_resolver,
            obj.reimb_description,
            obj.reimb_receipt,
            obj.reimb_status_id,
            obj.reimb_type_id
        );
        return viewTicket;
    }

    constructor(private id: number, private firstName: string, private lastName: string, private amount: string, private submitDate: Date, private resolveDate: Date, 
                private resolver: string, private description: string, private receipt: Blob, private status: string, private type: string) {}
}

export interface ViewTicketLine {
    ers_user_id: number;
    ers_first_name: string;
    ers_last_name: string;
    reimb_amount: string;
    reimb_submited: Date;
    reimb_resolved: Date;
    reimb_resolver: string;
    reimb_description: string;
    reimb_receipt: Blob;
    reimb_status_id: string;
    reimb_type_id: string;
}