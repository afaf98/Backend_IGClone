const request = require("supertest");
const app = require("../../app");
const db = require("../../models");
const { createToken } = require("../../auth/utils");

const server = request(app);

describe("get /home", () => {
  afterAll(async () => {
    await db.sequelize.close();
  });

  beforeEach(async () => {
    await db.User.destroy({ truncate: true, cascade: true });
    await db.Image.destroy({ truncate: true, cascade: true });
  });
  //should exsist
  // should fetch all images from a user
  // should
  test("should /home exist", async (done) => {
    const response = await server.get("/profile");

    expect(response.status).not.toBe(404);
    done();
  });

  test("should get all images from a user", async (done) => {
    const user = await db.User.create({
      firstName: "bla",
      lastName: "bla",
      email: "bla@bla.com",
      password: "12345678",
    });
    const token = createToken(user.id);
    const image = await db.Image.create({
      name: "bla",
      url:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fgeographical.co.uk%2Fnature%2Fclimate%2Fitem%2F3296-sun-block&psig=AOvVaw2Q0t9mK5MCzj8LetLtFWa3&ust=1615989018262000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIDF8a36tO8CFQAAAAAdAAAAABAD",
      userId: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const response = await server
      .get("/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.images[0].name).toEqual("bla");
    expect(response.body.images[0].url).toEqual(
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fgeographical.co.uk%2Fnature%2Fclimate%2Fitem%2F3296-sun-block&psig=AOvVaw2Q0t9mK5MCzj8LetLtFWa3&ust=1615989018262000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIDF8a36tO8CFQAAAAAdAAAAABAD"
    );
    expect(response.body.images[0].userId).toBe(user.id);

    done();
  });
  test("should give an error if no images are found from a user", async (done) => {
    const user = await db.User.create({
      firstName: "bla",
      lastName: "bla",
      email: "bla@bla.com",
      password: "12345678",
    });
    const token = createToken(user.id);

    const response = await server
      .get("/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toEqual("No images are found");

    done();
  });
});
