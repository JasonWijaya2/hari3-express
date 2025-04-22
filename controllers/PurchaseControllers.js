const { Purchases, Products, Users } = require("../models");

class PurchasesControllers {
  static async purchasesProduct(req, res, next) {
    try {
      const { productId } = req.body;
      const userId = req.user.id;
      console.log("User ID: ", userId);

      // Validate input
      if (!productId) {
        throw { status: 400, message: "Product ID is required" };
      }

      // Check if the product exists
      const product = await Products.findByPk(productId);
      if (!product) {
        throw { status: 404, message: "Product not found" };
      }

      // Create a new purchase record
      const purchase = await Purchases.create({
        userId,
        productId,
      });

      res.status(201).send({
        message: "Purchase successful",
        purchase: {
          id: purchase.id,
          userId: purchase.userId,
          productId: purchase.productId,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getUserPurchases(req, res, next) {
    try {
      const userId = req.user.id;

      // Fetch all purchases for the authenticated user
      const purchases = await Purchases.findAll({
        where: { userId },
        include: [
          {
            model: Products,
            as: "product",
            attributes: ["id", "name", "price"],
          },
        ],
      });

      res.status(200).send({
        message: "User purchases retrieved successfully",
        purchases,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PurchasesControllers;
