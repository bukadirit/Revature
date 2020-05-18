export class Cards {
    customerId: number;
    firstName: string;
    lastName: string;
    ccNumber: number;
    ccType: string;
    expiration: Date;
    securityCode: number;
    cardId: number;
    
    static from(obj:CardsLine): Cards {
        const card = new Cards(
            obj.customer_id, obj.first_name, obj.last_name, obj.cc_number, obj.cc_type, obj.expiration, obj.security_code, obj.card_id
        );
        return card;
    }

    constructor(id: number, firstName: string, lastName: string, ccNumber: number,
                ccType: string, expiration: Date, securityCode: number, cardId: number) {
        this.customerId = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.ccNumber = ccNumber;
        this.ccType = ccType;
        this.expiration = expiration;
        this.securityCode = securityCode;
        this.cardId = cardId;
       
        
    }
}

export interface CardsLine {
    customer_id: number;
    first_name: string;
    last_name: string;
    cc_number: number;
    cc_type: string;
    expiration: Date;
    security_code: number;
    card_id: number;
}