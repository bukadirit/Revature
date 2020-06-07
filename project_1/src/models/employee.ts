export class Employee {

    id:number;
    userName:String;
    password:string;
    firstName:string;
    lastName:string;
    email:string;
    userRole:number;
   
    static from(obj: EmployeeLine): Employee {
        const employee = new Employee(
            obj.ers_user_id, obj.ers_username, obj.ers_password, obj.ers_first_name, obj.ers_last_name, obj.user_email, obj.user_role_id
        );
        return employee;
    }

    constructor(id: number, userName: string, password: string, firstName: string,
        lastName: string, email: string,  userRole: number) {
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.userRole = userRole;


}
}

export interface EmployeeLine {
    ers_user_id: number;
    ers_username: string;
    ers_password: string;
    ers_first_name: string;
    ers_last_name: string;
    user_email: string;
    user_role_id: number;
}

/*

    constructor(id: number, userName: string, password: string, firstName: string,
                lastName: string, email: string,  userRole: number) {
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.userRole = userRole;
       
        
    }
*/