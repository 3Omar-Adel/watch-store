const Order = require("../models/orderModel");
const Product = require("../models/Product");

const createOrder = async (req, res) => {
    try {
        const {
            orderItems,
            shippingAddress,    
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
        } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({
                message: "No order items",
            });
        }

        const itemsWithCategory = await Promise.all(
            orderItems.map(async (item) => {
                const product = await Product.findById(item.product);
console.log("Product =>", product);
    console.log("Category =>", product?.category);
        return {
            product: item.product,
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: item.quantity,

            category: product.category,
        };
        })
        );

        const order = await Order.create({
    user: req.user._id,
    orderItems: itemsWithCategory,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
        });
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user._id,
        }).sort({
            createdAt: -1,
        });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate(
                "user",
                "name email"
            );
        if (!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }
        if (
            order.user._id.toString() !== req.user._id.toString() &&
            req.user.role !== "admin"
        ) {

            return res.status(401).json({
                message: "Not Authorized",
            });

        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }

};

const getAllOrders = async (req, res) => {

    try {
        const orders = await Order.find()
            .populate(
                "user",
                "name email"
            )
            .sort({
                createdAt: -1,
            });

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { orderStatus } = req.body;
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        const validStatus = [
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled",
        ];

        if (!validStatus.includes(orderStatus)) {
            return res.status(400).json({
                message: "Invalid order status",
            });
        }

        // الحالات النهائية
        if (
            order.orderStatus === "Delivered" ||
            order.orderStatus === "Cancelled"
        ) {
            return res.status(400).json({
                message: "Order status can no longer be changed",
            });
        }
        // منع الرجوع للخلف
        if (
            order.orderStatus === "Shipped" &&
            (orderStatus === "Processing" ||
                orderStatus === "Cancelled")
        ) {
            return res.status(400).json({
                message: "Invalid status transition",
            });
        }
        order.orderStatus = orderStatus;
        await order.save();
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    createOrder,
    getMyOrders,
    getOrderById,
    getAllOrders,
    updateOrderStatus,
};