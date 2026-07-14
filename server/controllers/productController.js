const Product = require("../models/product");
const cloudinary = require("../config/cloudinary");
const uploadToCloudinary = require("../utils/cloudinaryUpload")

// for Add by POST
const createProduct = async (req, res) => {
    try {
        const imageUrls = [];
        
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const result = await uploadToCloudinary(
                    file.buffer,
                    "products"
                );
                imageUrls.push(result.secure_url);
            }
        }

        const product = await Product.create({
            ...req.body,
            images: imageUrls,
        });

        res.status(201).json({
            message: "Product created successfully",
            product,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
// for show all by GET
const getProduct = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
// for get the product by GET with ID
const getProductedById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if(!product) {
            return res.status(404).json({
                message: "product not found"
            })
        }
        res.status(200).json({
            message: " Your Product is : ",
            product
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
    
}
// for edit product by PUT with ID and body and other
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
        {
            returnDocument: "after",
            runValidators: true
        }
    )
    if(!product) {
            return res.status(404).json({
                message: "product not found"
            })
        }
    res.status(200).json(product)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
// for Delete by DELETE with ID
const deleteProduct = async (req, res) => {
    try{
        const product = await Product.findByIdAndDelete(
            req.params.id
        )
        if(!product) {
            return res.status(404).json({
                message: "product not found"
            })
        }
        res.status(200).json({
            message: "producted deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    createProduct,
    getProduct,
    getProductedById,
    updateProduct,
    deleteProduct,
}