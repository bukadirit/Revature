export class Cards {
    id: number;
    ccType: string;
    ccNumber: number;
    expireDate: Date;
    securityCode: number;
    customerId: number;

    static from(obj:CardsLine): Cards {
        const card = new Cards(
           obj.id , obj.cc_type, obj.cc_number,  obj.expire_date, obj.security_code, obj.customer_id
        );
        return card;
    }

    constructor(id: number,  ccType: string, ccNumber: number,
                expirDate: Date, securityCode: number, customerId: number) {
        this.id = id;
        this.ccType = ccType;
        this.ccNumber = ccNumber;
        this.expireDate = expirDate;
        this.securityCode = securityCode;
        this.customerId = customerId;
    }
}

export interface CardsLine {
    id: number;
    cc_type: string;
    cc_number: number;
    expire_date: Date;
    security_code: number;
    customer_id: number;
}