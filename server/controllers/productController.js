const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");
const uploadToCloudinary = require("../utils/cloudinaryUpload")

// for Add by POST


const createProduct = async (req, res) => {
    try {
        const images = [];
        
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const result = await uploadToCloudinary(
                    file.buffer,
                    "products"
                );
                images.push({
                    url: result.secure_url,
                    public_id: result.public_id,
                });
            }
        }

        const product = await Product.create({
            ...req.body,
            images,
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
// 
const getFeaturedProducts = async (req, res) => {
    try {
        const products = await Product.find({ featured: true }).limit(12);

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
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
console.log("FILES:", req.files);
console.log("FILES:", req.files);
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        // حذف الصور المطلوبة
        if (req.body.deletedImages) {

            const deletedImages = Array.isArray(req.body.deletedImages)
                ? req.body.deletedImages
                : [req.body.deletedImages];

            for (const img of deletedImages) {

                const image = product.images.find(
                    (i) => i.url === img
                );

                if (image) {
                    await cloudinary.uploader.destroy(
                        image.public_id
                    );
                }
            }

            product.images = product.images.filter(
                (i) => !deletedImages.includes(i.url)
            );
        }

        // رفع الصور الجديدة
        if (req.files && req.files.length > 0) {

            for (const file of req.files) {

                const result = await uploadToCloudinary(
                    file.buffer,
                    "products"
                );

                product.images.push({
                    url: result.secure_url,
                    public_id: result.public_id,
                });
            }
        }

        product.name = req.body.name;
        product.brand = req.body.brand;
        product.category = req.body.category;
        product.gender = req.body.gender;
        product.price = req.body.price;
        product.discount = req.body.discount;
        product.stock = req.body.stock;
        product.description = req.body.description;
        product.featured =
            req.body.featured === "true" ||
            req.body.featured === true;
console.log(product);
        await product.save();

        res.status(200).json(product);

    } catch (error) {
console.log(error);
        res.status(500).json({
            message: error.message,
        });

    }
    
};

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
    getFeaturedProducts,
}