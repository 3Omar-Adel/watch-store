const Wishlist = require("../models/WishlistModel");

const toggleWishlist = async (req, res) => {

    try {
        const { productId } = req.body;
        if (!productId) {
        return res.status(400).json({
        message: "Product ID is required",
        });
}
        let wishlist = await Wishlist.findOne({
            user: req.user._id,
        });
        if (!wishlist) {
            wishlist = await Wishlist.create({
                user: req.user._id,
                products: [],
            });
        }
        const exists = wishlist.products.find(
            (id) => id.toString() === productId
        );
        if (exists) {
            wishlist.products =
                wishlist.products.filter(
                    (id) => id.toString() !== productId
                );
        } else {
            wishlist.products.push(productId);
        }
        await wishlist.save();

        const updatedWishlist = await Wishlist.findOne({
        user: req.user._id,
        }).populate("products");
        res.status(200).json({
            products: updatedWishlist.products,
            message: exists
            ? "Removed from wishlist"
            : "Added to wishlist",
});
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({
            user: req.user._id,
        }).populate("products");
        if (!wishlist) {
            return res.status(200).json([]);
        }
        res.status(200).json(wishlist.products);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    toggleWishlist,
    getWishlist,
}