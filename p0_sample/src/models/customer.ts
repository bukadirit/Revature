export class Customer {
    id: number;
    lastName: string;
    firstName: string;
    address: string;
    city: string;
    state: string;
    zip: number;
    
    static from(obj: CustomerLine): Customer {
        const customer = new Customer(
            obj.id, obj.last_name, obj.first_name, obj.address, obj.city, obj.state, obj.zip
        );
        return customer;
    }

    constructor(id: number, lastName: string, firstName: string, address: string,
                city: string, state: string, zip: number) {
        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
       
        
    }
}

export interface CustomerLine {
    id: number;
    last_name: string;
    first_name: string;
    address: string;
    city: string;
    state: string;
    zip: number;
}