export class Orders {
    systemBrand: string;
    systemType: string;
    processor: string;
    ram: string;
    capacity: string;
    chipset: string;
    graphicsCard: string;
    coolerType: string;
    price: string;
    systemId: number;
    customerId: number;
    firstName: string;
    lastName: string;
    
    static from(obj: OrdersLine): Orders {
        const order = new Orders(
            obj.id, obj.system_brand, obj.system_type, obj.processor, obj.ram, obj.capacity, obj.chipset, 
            obj.graphics_card, obj.cooler_type, obj.price, obj.customer_id, obj.last_name, obj.first_name
        );
        return order;
    }

    constructor(systemId: number, systemBrand: string, systemType: string, processor: string, ram: string, 
        capacity: string, chipset: string, graphicsCard: string, coolerType: string, price: string, customerId: number, firstName: string, lastName: string) {
        this.customerId = customerId;
        this.lastName = lastName;
        this.firstName = firstName;
        this.systemBrand= systemBrand;
        this.systemType = systemType;
        this.processor = processor;
        this.ram = ram;
        this.capacity = capacity;
        this.chipset = chipset;
        this.graphicsCard = graphicsCard;
        this.coolerType = coolerType;
        this.price = price; 
        this.systemId = systemId;
    }
}

export interface OrdersLine {
    id: number;
    system_brand: string;
    system_type: string;
    processor: string;
    ram: string;
    capacity: string;
    chipset: string;
    graphics_card: string;
    cooler_type: string;
    price: string;
    customer_id: number;
    first_name: string;
    last_name: string;
}
