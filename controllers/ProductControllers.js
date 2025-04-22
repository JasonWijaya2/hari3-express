const { Products } = require("../models");

class ProductControllers {
  // Create a new product
  static async createProduct(req, res, next) {
    try {
      const { name, price } = req.body;

      // Validate input
      if (!name || !price) {
        throw { status: 400, message: "Name and Price are required" };
      }

      // Create the product
      const product = await Products.create({ name, price });

      res.status(201).send({
        message: "Product created successfully",
        product,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get all products
  static async getAllProducts(req, res, next) {
    try {
      const products = await Products.findAll({
        attributes: ["id", "name", "price", "createdAt", "updatedAt"],
      });

      res.status(200).send({
        message: "Products retrieved successfully",
        products,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get a single product by ID
  static async getProductById(req, res, next) {
    try {
      const { id } = req.params;

      const product = await Products.findByPk(id);

      if (!product) {
        throw { status: 404, message: "Product not found" };
      }

      res.status(200).send({
        message: "Product retrieved successfully",
        product,
      });
    } catch (error) {
      next(error);
    }
  }

  // Update a product
  static async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const { name, price } = req.body;

      // Validate input
      if (!name || !price) {
        throw { status: 400, message: "Name and Price are required" };
      }

      const product = await Products.findByPk(id);

      if (!product) {
        throw { status: 404, message: "Product not found" };
      }

      // Update the product
      await product.update({ name, price });

      res.status(200).send({
        message: "Product updated successfully",
        product,
      });
    } catch (error) {
      next(error);
    }
  }

  // Delete a product
  static async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;

      const product = await Products.findByPk(id);

      if (!product) {
        throw { status: 404, message: "Product not found" };
      }

      // Delete the product
      await product.destroy();

      res.status(200).send({
        message: "Product deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductControllers;
