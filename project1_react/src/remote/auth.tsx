import {
  getTicket,
  makeTicket,
  getManagerTicket,
  sortTicket,
  patchTicket,
} from "../remote/user.remote";
import { User } from "./models/otherTemplates";

export const getLocalUser = () => {
  const user = {
    id: localStorage.getItem("id"),
    email: localStorage.getItem("email"),
    name: localStorage.getItem("name"),
    lname: localStorage.getItem("lname"),
    role: localStorage.getItem("role"),
  };
  return user;
};
export const setLocalUser = (value: any) => {
  const a: User[] = value;
  localStorage.setItem("id", a[0].id.toString());
  localStorage.setItem("email", a[0].email);
  localStorage.setItem("name", a[0].firstName);
  localStorage.setItem("lname", a[0].lastName);
  localStorage.setItem("role", a[0].userRole.toString());
};

export const removeLocalUser = () => {
  localStorage.removeItem("id");
  localStorage.removeItem("email");
  localStorage.removeItem("name");
  localStorage.removeItem("lname");
  localStorage.removeItem("role");
};

export const getUserTicket = () => {
  return getTicket(localStorage.getItem("id"));
};

export const getAllTicket = () => {
  return getManagerTicket();
};

export const createTicket = (i: any) => {
  const info = { ...i };
  const id = localStorage.getItem("id");
  makeTicket(info, id);
};

export const getSort = (option: string) => {
  return sortTicket(option);
};

export default {
  getLocalUser,
  setLocalUser,
  removeLocalUser,
};

export const sendRequest = (i: number, j: number) => {
  const id = localStorage.getItem("id");
  console.log(i + "  " + j);
  patchTicket(id, j, i);
};
