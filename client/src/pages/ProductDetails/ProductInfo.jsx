import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Box,
    Typography,
    Button,
    Rating,
} from "@mui/material";

import {
    IoHeart,
    IoHeartOutline,
} from "react-icons/io5";

import {
    addToCart,
} from "../../features/cart/cartSlice";

import {
    toggleWishlist,
} from "../../features/wishlist/wishlistSlice";

import ProductFeatures from "./ProductFeatures";

function ProductInfo({ product }) {
    const [quantity, setQuantity] = useState(1);

    const dispatch = useDispatch();

    const { wishlistItems = [] } = useSelector(
        (state) => state.wishlist
    );

    const isFavorite = wishlistItems.some(
        (item) => item._id === product._id
    );

    const increase = () => {
        setQuantity((prev) => prev + 1);
    };

    const decrease = () => {
        setQuantity((prev) => Math.max(1, prev - 1));
    };

    const handleAddToCart = () => {
        dispatch(
            addToCart({
                ...product,
                quantity,
            })
        );
    };

    return (
        <Box>
            <Typography
                sx={{
                    color: "#C6A769",
                    fontWeight: 700,
                    letterSpacing: 2,
                    fontSize: 13,
                    textTransform: "uppercase",
                }}
            >
                {product.brand}
            </Typography>

            <Typography
                sx={{
                    fontWeight: 700,
                    mt: 0.5,
                    fontSize: {
                        xs: 30,
                        md: 40,
                    },
                    lineHeight: 1.2,
                }}
            >
                {product.name}
            </Typography>

            <Typography
                sx={{
                    mt: 1.5,
                    fontWeight: 700,
                    fontSize: {
                        xs: 25,
                        md: 32,
                    },
                }}
            >
                EGP {product.price.toLocaleString()}
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mt: 1.5,
                }}
            >
                <Rating
                    value={product.rating || 0}
                    precision={0.5}
                    readOnly
                    size="small"
                />

                <Typography
                    color="text.secondary"
                    fontSize={13}
                >
                    (124 Reviews)
                </Typography>
            </Box>

            <Typography
                sx={{
                    mt: 3,
                    color: "#666",
                    whiteSpace: "pre-line",
                    lineHeight: 1.8,
                    fontSize: 15,
                }}
            >
                {product.description}
            </Typography>

            <ProductFeatures />

            {/* Quantity */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mt: 4,
                }}
            >
                <Typography
                    sx={{
                        fontWeight: 600,
                        mr: 1,
                    }}
                >
                    Quantity
                </Typography>

                <Button
                    onClick={decrease}
                    disabled={quantity === 1}
                    sx={quantityButton}
                >
                    −
                </Button>

                <Typography
                    sx={{
                        fontWeight: 700,
                        width: 25,
                        textAlign: "center",
                    }}
                >
                    {quantity}
                </Typography>

                <Button
                    onClick={increase}
                    sx={quantityButton}
                >
                    +
                </Button>
            </Box>

            {/* Actions */}
            <Box
                sx={{
                    display: "flex",
                    gap: 1.5,
                    mt: 4,
                }}
            >
                <Button
                    fullWidth
                    variant="contained"
                    onClick={handleAddToCart}
                    sx={{
                        height: 52,
                        borderRadius: 2.5,
                        background: "#C6A769",
                        fontWeight: 700,
                        "&:hover": {
                            background: "#b28d4b",
                        },
                    }}
                >
                    Add To Cart
                </Button>

                <Button
                    onClick={() =>
                        dispatch(
                            toggleWishlist(product._id)
                        )
                    }
                    sx={{
                        minWidth: 52,
                        height: 52,
                        borderRadius: 2.5,
                        border:
                            "1px solid #C6A769",
                        color: "#C6A769",
                    }}
                >
                    {isFavorite ? (
                        <IoHeart size={24} />
                    ) : (
                        <IoHeartOutline size={24} />
                    )}
                </Button>
            </Box>
        </Box>
    );
}

const quantityButton = {
    minWidth: 36,
    width: 36,
    height: 36,
    p: 0,
    borderRadius: 1.5,
    background: "#eee",
    color: "#222",
    fontSize: 22,

    "&:hover": {
        background: "#e2e2e2",
    },

    "&.Mui-disabled": {
        background: "#f5f5f5",
        color: "#bbb",
    },
};

export default ProductInfo;