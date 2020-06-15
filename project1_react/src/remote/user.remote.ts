import { Credentials } from "./models/credentials";
import Axios from "axios";

export const login = (credentials: Credentials) => {
  return Axios("http://192.168.1.7:3001", {
    method: "POST",
    headers: { "content-type": "application/json" },
    data: credentials,
  });
};

export const getTicket = async (tag: any) => {
  let t;
  const id = parseInt(tag);
  t = await Axios("http://192.168.1.7:3001/ticket/" + id, {
    method: "GET",
    withCredentials: true,
    headers: { "content-type": "application/json" },
    //data: id,
  });
  return t;
};

export const getManagerTicket = async () => {
  let t;
  t = await Axios("http://192.168.1.7:3001/ticket/", {
    method: "GET",
    withCredentials: true,
    headers: { "content-type": "application/json" },
    //data: id,
  });
  return t;
};

export const makeTicket = (i: any, i1: any) => {
  const reimbAmount = i.amount;
  const reimbDescription = i.desc;
  const reimbAuthor = i1;
  const reimbTypeId = i.type;

  return Axios("http://192.168.1.7:3001/ticket", {
    method: "POST",
    withCredentials: true,
    headers: { "content-type": "application/json" },
    data: {
      reimbAmount,
      reimbDescription,
      reimbAuthor,
      reimbTypeId,
    },
  });
};

export const sortTicket = async (tag: string) => {
  let t;
  const id = tag;
  t = await Axios("http://192.168.1.7:3001/sort/" + id, {
    method: "GET",
    withCredentials: true,
    headers: { "content-type": "application/json" },
    //data: id,
  });
  return t;
};

export const patchTicket = async (i: any, j: any, k: any) => {
  const id = i;
  const status = j;
  const reimbId = k;
  await Axios("http://192.168.1.7:3001/ticket", {
    method: "PATCH",
    withCredentials: true,
    headers: { "content-type": "application/json" },
    data: {
      id,
      status,
      reimbId,
    },
  });
  return;
};
