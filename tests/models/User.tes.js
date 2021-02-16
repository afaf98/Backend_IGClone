describe("User model", () => {
  test.skip("should exist", async (done) => {
    const { User } = require("../../models");
    expect(User).toBeDefined();
  });
});
