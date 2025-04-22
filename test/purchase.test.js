const request = require("supertest");
const app = require("../app");

describe("Purchase Endpoints", () => {
  let token;

  beforeAll(async () => {
    // Login to get a valid token
    const response = await request(app).post("/api/login").send({
      email: "jason@mail.com",
      password: "jason123",
    });
    token = response.body.token;
  });

  it("should purchase a product", async () => {
    // Given
    const purchaseData = {
      productId: 1,
    };

    // When
    const response = await request(app)
      .post("/api/purchases")
      .set("Authorization", `Bearer ${token}`)
      .send(purchaseData);

    // Then
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", "Purchase successful");
    expect(response.body.purchase).toHaveProperty(
      "productId",
      purchaseData.productId
    );
  });

  it("should not purchase a non-existent product", async () => {
    // Given
    const invalidPurchaseData = {
      productId: 9999, // Non-existent product
    };

    // When
    const response = await request(app)
      .post("/api/purchases")
      .set("Authorization", `Bearer ${token}`)
      .send(invalidPurchaseData);

    // Then
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Product not found");
  });
});
