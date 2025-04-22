const request = require("supertest");
const app = require("../app"); // Import your Express app

describe("User Endpoints", () => {
  it("should register a new user", async () => {
    // Given
    const newUser = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
      role: "user",
    };

    // When
    const response = await request(app).post("/api/register").send(newUser);

    // Then
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("name", newUser.name);
    expect(response.body).toHaveProperty("email", newUser.email);
    expect(response.body).toHaveProperty("role", newUser.role);
  });

  it("should not register a user with an existing email", async () => {
    // Given
    const existingUser = {
      name: "Jane Doe",
      email: "john.doe@example.com", // Same email as above
      password: "password123",
      role: "user",
    };

    // When
    const response = await request(app)
      .post("/api/register")
      .send(existingUser);

    // Then
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "User registered");
  });

  it("should login a user", async () => {
    // Given
    const loginUser = {
      email: "john.doe@example.com",
      password: "password123",
    };

    // When
    const response = await request(app).post("/api/login").send(loginUser);

    // Then
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("should not login with invalid credentials", async () => {
    // Given
    const invalidUser = {
      email: "john.doe@example.com",
      password: "wrongpassword",
    };

    // When
    const response = await request(app).post("/api/login").send(invalidUser);

    // Then
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Email or Password is wrong!"
    );
  });

  it("should not login with a non-existent email", async () => {
    // Given
    const nonExistentUser = {
      email: "nonexistent@example.com",
      password: "password123",
    };

    // When
    const response = await request(app)
      .post("/api/login")
      .send(nonExistentUser);

    // Then
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Email or Password is wrong!"
    );
  });

  it("should not register a user with missing fields", async () => {
    // Given
    const incompleteUser = {
      email: "missingfields@example.com",
    };

    // When
    const response = await request(app)
      .post("/api/register")
      .send(incompleteUser);

    // Then
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Name, Email, Password, and Role are required"
    );
  });
});
