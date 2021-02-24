import request from "supertest";
import { app } from "../app";

import createConnection from "../database";

describe("Users", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  it("Should be able to create a new user", async () => {
    const response = await request(app).post("/users").send({
      email: "user@example.com",
      name: "Custom Name",
    });

    expect(response.status).toBe(201);
  });

  it("Verify if User email already exists", async () => {
    const response = await request(app).post("/users").send({
      email: "user@example.com",
      name: "Custom Name",
    });

    expect(response.status).toBe(400);
  });
});
