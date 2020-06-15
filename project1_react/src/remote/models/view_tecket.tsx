export interface ViewTicket {
  id: number;
  firstName: string;
  lastName: string;
  amount: string;
  submitDate: Date;
  resolveDate: Date;
  resolver: string;
  description: string;
  receipt: Blob;
  status: string;
  type: string;
  rID: number;
}
