const request = require("supertest");
const app = require("../src/app");

describe("GET /", () => {
  it("should return app running message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
  });
});

