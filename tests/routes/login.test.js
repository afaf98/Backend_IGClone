const request = require("supertest");
const app = require("../../app");
const db = require("../../models");
const server = request(app);

describe("post /login", () => {
  afterAll(async () => {
    await db.sequelize.close();
  });

  beforeEach(async () => {
    await db.User.destroy({ truncate: true, cascade: true });
  });
  test("Should exist", async (done) => {
    const response = await server.post("/login");

    expect(response.status).not.toBe(404);
    done();
  });
  test("Should that the request contains email and password", async (done) => {
    const response = await server.post("/login").send({});

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual([
      "email is a required field",
      "password is a required field",
    ]);
    done();
  });
  test("Should respond with an error when the user is not found.", async (done) => {
    const response = await server
      .post("/login")
      .send({ email: "ciao@ciao.com", password: "12345678910" });
    // console.log("error", response.body.errors);
    expect(response.status).toBe(401);
    expect(response.body.message).toEqual("Email or password is incorrect");

    done();
  });
  test("Should respond with an error if the password doesn't match.", async (done) => {
    const user = await db.User.create({
      name: "ciao",
      lastName: "ciao",
      email: "ciao@ciao.com",
      password: "12345678",
    });
    const response = await server
      .post("/login")
      .send({ email: "ciao@ciao.com", password: "abcdefghi" });

    expect(response.status).toBe(401);
    expect(response.body.message).toEqual("Email or password is incorrect");

    done();
  });
  test("Should respond with a token when the user is successfully authenticated", async (done) => {
    const user = await db.User.create({
      name: "ciao",
      lastName: "ciao",
      email: "ciao@ciao.com",
      password: "12345678",
    });
    const response = await server
      .post("/login")
      .send({ email: "ciao@ciao.com", password: "12345678" });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();

    done();
  });
  test.todo("The user id should be encrypted inside of the token");
});
