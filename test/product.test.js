const request = require("supertest");
const app = require("../app"); // Import your Express app

describe("Product Endpoints", () => {
  let token;

  beforeAll(async () => {
    // Login to get a valid token (assuming an admin user is required to manage products)
    const response = await request(app).post("/api/login").send({
      email: "jason@mail.com",
      password: "jason123",
    });
    token = response.body.token;
  });

  it("should create a new product", async () => {
    // Given
    const newProduct = {
      name: "Test Product",
      price: 100,
    };

    // When
    const response = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send(newProduct);

    // Then
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "Product created successfully"
    );
    expect(response.body.product).toHaveProperty("name", newProduct.name);
    expect(response.body.product).toHaveProperty("price", newProduct.price);
  });

  it("should retrieve all products", async () => {
    // When
    const response = await request(app)
      .get("/api/products")
      .set("Authorization", `Bearer ${token}`);

    // Then
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Products retrieved successfully"
    );
    expect(response.body.products).toBeInstanceOf(Array);
  });

  it("should retrieve a product by ID", async () => {
    // Given
    const productId = 1; // Replace with a valid product ID from your database

    // When
    const response = await request(app)
      .get(`/api/products/${productId}`)
      .set("Authorization", `Bearer ${token}`);

    // Then
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Product retrieved successfully"
    );
    expect(response.body.product).toHaveProperty("id", productId);
  });

  it("should update a product", async () => {
    // Given
    const productId = 1; // Replace with a valid product ID from your database
    const updatedProduct = {
      name: "Updated Product",
      price: 150,
    };

    // When
    const response = await request(app)
      .put(`/api/products/${productId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedProduct);

    // Then
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Product updated successfully"
    );
    expect(response.body.product).toHaveProperty("name", updatedProduct.name);
    expect(response.body.product).toHaveProperty("price", updatedProduct.price);
  });

  it("should delete a product", async () => {
    // Given
    const productId = 1; // Replace with a valid product ID from your database

    // When
    const response = await request(app)
      .delete(`/api/products/${productId}`)
      .set("Authorization", `Bearer ${token}`);

    // Then
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Product deleted successfully"
    );
  });

  it("should return 404 for a non-existent product", async () => {
    // Given
    const nonExistentProductId = 9999; // A product ID that doesn't exist

    // When
    const response = await request(app)
      .get(`/api/products/${nonExistentProductId}`)
      .set("Authorization", `Bearer ${token}`);

    // Then
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Product not found");
  });
});
