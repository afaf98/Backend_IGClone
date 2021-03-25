const request = require("supertest");
const app = require("../../app");
const db = require("../../models");
const server = request(app);
const { createToken } = require("../../auth/utils");

describe("get /followers", () => {
  afterAll(async () => {
    await db.sequelize.close();
  });

  beforeEach(async () => {
    await db.User.destroy({ truncate: true, cascade: true });
  });

  test("should response with a list of users", async (done) => {
    const user = await db.User.create({
      firstName: "bla",
      lastName: "bla",
      email: "bla@bla.com",
      password: "12345678",
    });
    const secondUser = await db.User.create({
      firstName: "a",
      lastName: "a",
      email: "a@a.com",
      password: "12345678",
    });
    const response = await server.get("/users");

    expect(response.status).toBe(200);
    expect(response.body.users).toEqual([
      { firstName: "bla", lastName: "bla", id: user.id },
      { firstName: "a", lastName: "a", id: secondUser.id },
    ]);

    done();
  });
});
