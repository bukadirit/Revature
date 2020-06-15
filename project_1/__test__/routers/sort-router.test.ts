import express from "express";
import bodyParser from "body-parser";
import * as sortService from "../../src/services/sort-service";
import { sortRouter } from "../../src/routers/sort-router";
import request from "supertest";

jest.mock("../../src/services/sort-service");
const mockSortService = sortService as any;

const app = express();
app.use(bodyParser.json());
app.use("/sort", sortRouter);

describe("GET /:id", () => {
  test("Normal behavior Json with status 200", async () => {
    mockSortService.sortTicket.mockImplementation(async () => ({}));

    await request(app)
      .get("/sort/PENDING")
      .expect(200)
      .expect("content-type", "application/json; charset=utf-8");
  });

  test("No object found (404)", async () => {
    mockSortService.sortTicket.mockImplementation(async () => 0);

    await request(app).get("/sort/9").expect(404);
  });

  test("500 internal server error", async () => {
    mockSortService.sortTicket.mockImplementation(async () => {
      throw new Error();
    });

    await request(app).get("/sort/doesItMatter?").expect(500);
  });
});
