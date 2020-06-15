import express from "express";
import bodyParser from "body-parser";
import * as employeeService from "../../src/services/employee-service";
import { employeeRouter } from "../../src/routers/employee-router";
import request from "supertest";

jest.mock("../../src/services/employee-service");
const mockEmployeeService = employeeService as any;

const app = express();
app.use(bodyParser.json());
app.use("/employee", employeeRouter);

describe("GET /:id", () => {
  test("Normal behavior Json with status 200", async () => {
    mockEmployeeService.getEmployee.mockImplementation(async () => ({}));

    await request(app)
      .get("/employee/bu@bu")
      .expect(200)
      .expect("content-type", "application/json; charset=utf-8");
  });

  test("500 internal server error", async () => {
    mockEmployeeService.getEmployee.mockImplementation(async () => {
      throw new Error();
    });

    await request(app).get("/employee/doesItMatter?").expect(500);
  });
});
