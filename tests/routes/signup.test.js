const request = require("supertest");
const app = require("../../app");
const db = require("../../models");

const server = request(app);

describe("post /user", () => {
  afterAll(async () => {
    await db.sequelize.close();
  });

  beforeEach(async () => {
    await db.User.destroy({ truncate: true, cascade: true });
  });

  test("should exist", async (done) => {
    const response = await server.post("/user");

    expect(response.status).not.toBe(404);
    done();
  });

  test("should create a new user with an email an password", async (done) => {
    const response = await server.post("/user").send({
      firstName: "bla",
      lastName: "bla",
      email: "bla@bla.com",
      password: "12345678",
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User created");
    expect(response.body.token).toBeDefined();

    done();
  });

  test("should validate that email and password are present", async (done) => {
    const response = await server.post("/user").send({});

    expect(response.status).toBe(400);

    //See what yup gives as an error
    expect(response.body.message).toEqual("Bad request");
    expect(response.body.errors).toEqual([
      "firstName is a required field",
      "lastName is a required field",
      "email is a required field",
      "password is a required field",
    ]);

    done();
  });

  test("Should add user to the database", async (done) => {
    // arrange
    const newUser = {
      firstName: "bla",
      lastName: "bla",
      email: "bla@bla.com",
      password: "12345678",
    };
    // acting
    const response = await server.post("/user").send(newUser);

    // assert => perform checks
    const checkUser = await db.User.findOne({
      where: { email: newUser.email },
    });

    expect(checkUser).not.toBeNull();

    done();
  });
  test("Should store users passwords as a bcrypt hash not as text", async (done) => {
    // arrange
    const newUser = {
      firstName: "bla",
      lastName: "bla",
      email: "bla@bla.com",
      password: "12345678",
    };
    // acting
    const response = await server.post("/user").send(newUser);

    // assert => perform checks
    const checkUser = await db.User.findOne({
      where: { email: newUser.email },
    });

    expect(checkUser.password).not.toBe(newUser.password);
    expect(checkUser.password.length).toBe(60);
    done();
  });
  test("Should validate if the email is unique  in the database ", async (done) => {
    const newUser = {
      firstName: "bla",
      lastName: "bla",
      email: "bla@bla.com",
      password: "12345678",
    };
    await db.User.create(newUser);
    const response = await server.post("/user").send(newUser);

    expect(response.status).toBe(409);
    expect(response.body.message).toEqual(
      "User with this email already exist."
    );
    done();
  });
  test("Should check if the email is in the right format", async (done) => {
    const newUser = {
      firstName: "bla",
      lastName: "bla",
      email: "blabla.com",
      password: "12345678",
    };
    const response = await server.post("/user").send(newUser);

    expect(response.body.errors).toEqual(["email must be a valid email"]);

    done();
  });
  test("Should check if the password has at least 8 characters", async (done) => {
    const newUser = {
      firstName: "bla",
      lastName: "bla",
      email: "bla@bla.com",
      password: "1234",
    };
    const response = await server.post("/user").send(newUser);

    expect(response.body.errors).toEqual([
      "password must be at least 8 characters",
    ]);

    done();
  });
});
