const request = require("supertest");
const app = require("../../app");
const db = require("../../models");
const server = request(app);
const { createToken } = require("../../auth/utils");

describe.only("get /feed", () => {
  afterAll(async () => {
    await db.Follower.destroy({ truncate: true, cascade: true });
    await db.User.destroy({ truncate: true, cascade: true });
    await db.Image.destroy({ truncate: true, cascade: true });
    await db.sequelize.close();
  });

  beforeEach(async () => {
    await db.Follower.destroy({ truncate: true, cascade: true });
    await db.User.destroy({ truncate: true, cascade: true });
    await db.Image.destroy({ truncate: true, cascade: true });
  });
  test("should be an authenticated route", async (done) => {
    const response = await server.get("/feed");

    expect(response.status).not.toBe(404);
    expect(response.status).toBe(401);

    done();
  });
  test("should return all images from users that you follow when a valid token is sent ", async (done) => {
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
    const thirdUser = await db.User.create({
      firstName: "b",
      lastName: "b",
      email: "b@b.com",
      password: "12345678",
    });
    const oldest = await db.Image.create({
      name: "oldest",
      url:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fgeographical.co.uk%2Fnature%2Fclimate%2Fitem%2F3296-sun-block&psig=AOvVaw2Q0t9mK5MCzj8LetLtFWa3&ust=1615989018262000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIDF8a36tO8CFQAAAAAdAAAAABAD",
      userId: secondUser.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const middle = await db.Image.create({
      name: "middle",
      url:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fgeographical.co.uk%2Fnature%2Fclimate%2Fitem%2F3296-sun-block&psig=AOvVaw2Q0t9mK5MCzj8LetLtFWa3&ust=1615989018262000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIDF8a36tO8CFQAAAAAdAAAAABAD",
      userId: thirdUser.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const latest = await db.Image.create({
      name: "latest",
      url:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fgeographical.co.uk%2Fnature%2Fclimate%2Fitem%2F3296-sun-block&psig=AOvVaw2Q0t9mK5MCzj8LetLtFWa3&ust=1615989018262000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIDF8a36tO8CFQAAAAAdAAAAABAD",
      userId: secondUser.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const donotShow = await db.Image.create({
      name: "no",
      url:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fgeographical.co.uk%2Fnature%2Fclimate%2Fitem%2F3296-sun-block&psig=AOvVaw2Q0t9mK5MCzj8LetLtFWa3&ust=1615989018262000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIDF8a36tO8CFQAAAAAdAAAAABAD",
      userId: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const token = createToken(user.id);
    await user.addFollowers(secondUser);
    await user.addFollowers(thirdUser);

    const response = await server
      .get("/feed")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.images[0].name).toBe("latest");
    expect(response.body.images[1].name).toBe("middle");
    expect(response.body.images[2].name).toBe("oldest");
    expect(response.body.images[0].userFirstName).toBe("a");

    expect(response.body.images.length).toBe(3);

    done();
  });
});
