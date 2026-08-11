const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    images: [
    {
        url: {
            type: String,
        },
        public_id: {
            type: String,
            },
        },
    ],
    gender: {
        type: String,
        enum: ["men", "women", "unisex"],
        required: true,
    },
    discount: {
        type: Number,
        default: 0,
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
    },
    featured: {
        type: Boolean,
        default: false,
    },
    },
        {
            timestamps: true,
            collection: "WATCHSTORE"
        }
)

module.exports = mongoose.model("Product", productSchema)