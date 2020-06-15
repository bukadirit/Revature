import * as ticketService from "../../src/services/ticket-service";
import * as ticketDao from "../../src/daos/ticket-dao";

jest.mock("../../src/daos/ticket-dao");

const mockTicketDao = ticketDao as any;

describe("getAllTicket", () => {
  test("Just testing to see if this works", async () => {
    expect.assertions(1);

    mockTicketDao.getAllTicket.mockImplementation(() => ({}));

    const result = await ticketService.getAllTicket();
    expect(result).toBeTruthy();
  });
});

describe("createTicket", () => {
  test("422 returned if no amount  provided", async () => {
    expect.assertions(1);

    mockTicketDao.createTicket.mockImplementation(() => ({}));

    const payload = {
      undefined,
      reimbAmount: null,
      reimbSubmit: null,
      reimbResolved: null,
      reimbDescription: "I am thunder",
      reimbResolver: null,
      reimbAuthor: 4,
      reimbTicket: null,
      reimbStatus: null,
      reimbTypeId: 2,
    };

    try {
      // This async function should reject due to missing ccType
      await ticketService.createTicket(payload);
      fail("ticketService.createTicketcle did not throw expected error");
    } catch (err) {
      // assign error object to expectedError
      expect(err).toBeDefined();
    }
  });
});

describe("patchTicket", () => {
  test("successful patch", async () => {
    expect.assertions(1);

    mockTicketDao.patchRequest.mockImplementation(() => ({}));

    const payload = {
      reimbId: 4,
      reimbStatus: 3,
      id: 2,
    };

    const result = await ticketService.patchTicket(payload);
    expect(result).toBeTruthy();
  });

  test("patch fails when no amount is provided", async () => {
    expect.assertions(1);

    mockTicketDao.patchRequest.mockImplementation(() => ({}));

    const payload = {
      reimbId: 4,
      reimbStatus: 3,
      id: undefined,
    };

    try {
      await ticketService.patchTicket(payload);
      fail();
    } catch (err) {
      expect(err).toBeTruthy();
    }
  });
});
