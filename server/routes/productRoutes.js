const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware")

const {
    createProduct,
    getProduct,
    getProductedById,
    updateProduct,
    deleteProduct,
} = require("../controllers/productController");


// for Add
router.post("/", protect, admin, upload.array("images", 5), createProduct);
// for show all
router.get("/" , getProduct);
// for get the product 
router.get("/:id", getProductedById);
// for edit product
router.put("/:id", protect, admin, updateProduct);
// for Delete
router.delete("/:id", protect, admin, deleteProduct)




module.exports = router;
