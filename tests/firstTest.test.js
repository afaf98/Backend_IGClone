const request = require("supertest");
const app = require("../app");

const server = request(app);

describe("testing test route", () => {
  test("should fail to check if the CI is working", async (done) => {
    const response = await server.get("/test");

    expect(response.status).toBe(200);
    done();
  });
});
