import express from "express";
import bodyParser from "body-parser";
import * as ticketService from "../../src/services/ticket-service";
import { ticketRouter } from "../../src/routers/ticket-router";
import request from "supertest";

jest.mock("../../src/services/ticket-service");
const mockTicketService = ticketService as any;

const app = express();
app.use(bodyParser.json());
app.use("/ticket", ticketRouter);

describe("GET /", () => {
  test("Returns normally under normal circumstances", async () => {
    mockTicketService.getAllTicket.mockImplementation(async () => []);
    await request(app)
      // if we send a request to GET "/"
      .get("/ticket")
      // We expect a response with status of 200
      .expect(200)
      .expect("content-type", "application/json; charset=utf-8");
  });
  test("Returns normally under normal circumstances", async () => {
    mockTicketService.getAllTicket.mockImplementation(async () => {
      throw new Error();
    });
    await request(app).get("/ticket").expect(500);
  });
});

describe("GET /:id", () => {
  test("Normal behavior Json with status 200", async () => {
    mockTicketService.getTicket.mockImplementation(async () => ({}));

    await request(app)
      .get("/ticket/1")
      .expect(200)
      .expect("content-type", "application/json; charset=utf-8");
  });

  test("No object found (404)", async () => {
    mockTicketService.getTicket.mockImplementation(async () => 0);

    await request(app).get("/ticket/dragonite").expect(404);
  });

  test("500 internal server error", async () => {
    mockTicketService.getTicket.mockImplementation(async () => {
      throw new Error();
    });

    await request(app).get("/ticket/doesItMatter?").expect(500);
  });
});

describe("POST /", () => {
  test("Successful creation should return 201 status", async () => {
    mockTicketService.createTicket.mockImplementation(async () => ({}));
    const payload = {
      reimbAmount: "200",
      reimbDescription: "I can",
      reimbAuthor: 5,
      reimbTypeId: 2,
    };

    await request(app)
      .post("/ticket")
      .send(payload)
      .expect(201)
      .expect("content-type", "application/json; charset=utf-8");
  });
  test("Should return 500 when encountering an error", async () => {
    mockTicketService.createTicket.mockImplementation(async () => {
      throw new Error();
    });

    const payload = {
      reimbAmount: "200",
      reimbDescription: "I can",
      reimbAuthor: 5,
      reimbTypeId: 2,
    };

    await request(app).post("/ticket").send(payload).expect(500);
  });
});

describe("PATCH /ticket", () => {
  test("Successful update should return 201 status", async () => {
    mockTicketService.patchTicket.mockImplementation(async () => ({}));
    const payload = {
      id: 3,
      status: 2,
      reimbId: 47,
    };

    await request(app)
      .patch("/ticket")
      .send(payload)
      .expect(200)
      .expect("content-type", "application/json; charset=utf-8");
  });

  test("No object found (404)", async () => {
    mockTicketService.patchTicket.mockImplementation(async () => 0);

    await request(app).patch("/ticket").expect(404);
  });

  test("Should return 500 when encountering an error", async () => {
    mockTicketService.patchTicket.mockImplementation(async () => {
      throw new Error();
    });

    const payload = {
      id: 3,
      status: 2,
      reimbId: 47,
    };

    await request(app).patch("/ticket").send(payload).expect(500);
  });
});
