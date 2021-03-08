const db = require("../../models");
const authMiddleware = require("../../auth/middleware.js");
const { createToken } = require("../../auth/utils");

describe.only("auth middleware", () => {
  afterAll(async () => {
    await db.sequelize.close();
  });

  beforeEach(async () => {
    await db.User.destroy({ truncate: true, cascade: true });
  });

  test("should ", async (done) => {
    const user = await db.User.create({
      firstName: "bla",
      lastName: "bla",
      email: "bla@bla.com",
      password: "12345678",
    });

    const token = createToken(user.id);
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = { json: jest.fn(), status: jest.fn() };
    const next = jest.fn();

    await authMiddleware(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.user instanceof db.User).toBe(true);
    expect(req.user.id).toBe(user.id);

    done();
  });
});
