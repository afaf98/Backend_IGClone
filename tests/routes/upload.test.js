const request = require("supertest");
const app = require("../../app");
const db = require("../../models");
const { createToken } = require("../../auth/utils");

const server = request(app);

//Unhappy path
// not compatible file
// not allowed to modify images from other users (later)

describe.skip("post /images", () => {
  afterAll(async () => {
    await db.sequelize.close();
  });

  beforeEach(async () => {
    await db.User.destroy({ truncate: true, cascade: true });
    await db.Image.destroy({ truncate: true, cascade: true });
  });

  test.skip("should exist", async (done) => {
    const response = await server.post("/images");

    expect(response.status).not.toBe(404);
    done();
  });
  test("should ", async (done) => {
    const user = await db.User.create({
      firstName: "bla",
      lastName: "bla",
      email: "bla@bla.com",
      password: "12345678",
    });
    const token = createToken(user.id);
    const response = await server
      .post("/images")
      .set("Authorization", `Bearer ${token}`)
      .attach("image", `${__dirname}/dummy.png`);

    expect(response.status).toBe(201);
    expect(response.body.message).toEqual("Image uploaded");
    expect(response.body.url).toBeDefined();
    const image = await db.Image.findOne({ where: { url: response.body.url } });
    expect(image).not.toBe(null);
    expect(image.userId).toBe(user.id);
    done();
  });
  test.skip("should not accept a post request without a token", async (done) => {
    const response = await server.post("/images");

    expect(response.status).toBe(401);
    done();
  });
});
