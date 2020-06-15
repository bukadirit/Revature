import express from "express";
import * as employeeService from "../services/employee-service";
import { Employee } from "../models/employee";

export const employeeRouter = express.Router();

employeeRouter.get("/:email", async (request, response, next) => {
  const email = request.params.email;
  let employee: Employee[];
  try {
    employee = await employeeService.getEmployee(email);
    response.json(employee);
  } catch (err) {
    response.sendStatus(500);
    console.log(err);
    return;
  }
});

//post: /portal/create -create a ticket

//get: /portal/view - view all tickets
