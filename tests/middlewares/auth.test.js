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
  // token not present or  invalid token  (status 401)
  // send the wrong header (no Bearer ..) (status 400)
  // expired token (status 401 + response)
  // no user exist (status 401)
  test("should add a user to the request if the JWT is valid", async (done) => {
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
  test("should return 401 if no auth header is present ", async (done) => {
    // no auth header at all (status 401)

    const req = { headers: {} };
    const res = {
      json: jest.fn(function () {
        return this;
      }),
      status: jest.fn(function () {
        return this;
      }),
    };
    const next = jest.fn();

    await authMiddleware(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Not Authorized",
      errors: ["No authorization header present on this request"],
    });

    done();
  });
});
