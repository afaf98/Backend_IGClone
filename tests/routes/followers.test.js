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
    await db.Follower.destroy({ truncate: true, cascade: true });
    await db.User.destroy({ truncate: true, cascade: true });
  });
  test("should be an authenticated route", async (done) => {
    const response = await server.get("/followers");

    expect(response.status).not.toBe(404);
    expect(response.status).toBe(401);

    done();
  });
  test("should return all followers when a valid token is sent", async (done) => {
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

    const token = createToken(user.id);
    await user.addFollowers(secondUser);

    const response = await server
      .get("/followers")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.followers[0].firstName).toBe("a");
    expect(response.body.followers[0].id).toBe(secondUser.id);
    expect(response.body.followers[0].password).not.toBeDefined();

    done();
  });
  test("should return all followers when a valid token is sent", async (done) => {
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

    const token = createToken(user.id);

    const response = await server
      .post(`/followers/${secondUser.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("You now follow a");

    done();
  });
  test("should return all followers when a valid token is sent", async (done) => {
    const user = await db.User.create({
      firstName: "bla",
      lastName: "bla",
      email: "bla@bla.com",
      password: "12345678",
    });

    const token = createToken(user.id);

    const response = await server
      .post(`/followers/0`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("This user does not exist");

    done();
  });
});
