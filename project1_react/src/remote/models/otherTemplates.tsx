export interface AuthTemplate {
  id: any;
  email: any;
  name: any;
  lname: any;
  role: any;
}

export interface User {
  id: number;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  userRole: number;
}

export interface Make {
  reimbAmount: string;
  reimbDescription: string;
  reimbAuthor: number;
  reimbTypeId: number;
}
