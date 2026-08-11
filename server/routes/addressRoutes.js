const express = require("express");

const router = express.Router();

const {
    createAddress,
    getAddresses,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
} = require("../controllers/addressController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createAddress);

router.get("/", protect, getAddresses);

router.put("/default/:id", protect, setDefaultAddress);

router.put("/:id", protect, updateAddress);

router.delete("/:id", protect, deleteAddress);

module.exports = router;