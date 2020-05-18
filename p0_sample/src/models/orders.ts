export class Orders {
    systemBrand: string;
    systemType: string;
    processor: string;
    ram: string;
    capacity: string;
    chipset: string;
    graphicsCard: string;
    coolerType: string;
    price: number;
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
        capacity: string, chipset: string, graphicsCard: string, coolerType: string, price: number, customerId: number, firstName: string, lastName: string) {
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
    price: number;
    customer_id: number;
    first_name: string;
    last_name: string;
}



export class Systems {
    systemBrand: string;
    systemType: string;
    processor: string;
    ram: string;
    capacity: string;
    chipset: string;
    graphicsCard: string;
    coolerType: string;
    price: number;
    
    
    static from(obj: SystemsLine): Systems {
        const system = new Systems(
            obj.system_brand, obj.system_type, obj.processor, obj.ram, obj.capacity, obj.chipset, 
            obj.graphics_card, obj.cooler_type, obj.price)
        return system;
    }

    constructor(systemBrand: string, systemType: string, processor: string, ram: string, 
                capacity: string, chipset: string, graphicsCard: string, coolerType: string, price: number) {
        this.systemBrand= systemBrand;
        this.systemType = systemType;
        this.processor = processor;
        this.ram = ram;
        this.capacity = capacity;
        this.chipset = chipset;
        this.graphicsCard = graphicsCard;
        this.coolerType = coolerType;
        this.price = price; 
    }
}

export interface SystemsLine {
    system_brand: string;
    system_type: string;
    processor: string;
    ram: string;
    capacity: string;
    chipset: string;
    graphics_card: string;
    cooler_type: string;
    price: number;
}

/*JSON Test sample
{
"systemBrand": "GIGABYTE",
"systemType": "LAPTOP",
"processor": "INTEL CORE i7 8700HK",
"ram": "16 GB",
"capacity": "512 SSD + 1 TB HDD",
"chipset": "Z390",
"graphicsCard": "NVIDIA GTX 1070Ti",
"coolerType": "proprietary",
"price": "1699.99"
}
*/