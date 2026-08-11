const express = require("express");

const router = express.Router();

const {
    createOrder,
    getMyOrders,
    getOrderById,
    getAllOrders,
    updateOrderStatus,
} = require("../controllers/orderController");

const {
    protect,
    admin,
} = require("../middleware/authMiddleware");

// Create Order
router.post("/", protect, createOrder);

// My Orders
router.get("/my", protect, getMyOrders);

// All Orders (Admin)
router.get("/", protect, admin, getAllOrders);

// Order Details
router.get("/:id", protect, getOrderById);

// update Order status
router.put("/:id/status", protect, admin, updateOrderStatus);

module.exports = router;