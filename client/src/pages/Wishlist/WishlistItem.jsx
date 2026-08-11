import {
    Box,
    Card,
    Typography,
    Button,
    IconButton,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

import { useDispatch } from "react-redux";

import { addToCart } from "../../features/cart/cartSlice";
import {
    toggleWishlist,
} from "../../features/wishlist/wishlistSlice";

import { showSnackbar } from "../../features/snackbar/snackbarSlice";

function WishlistItem({ item }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const image = item?.images?.[0];

    return (
        <Card
            onClick={() => navigate(`/product/${item._id}`)}
            sx={{
                borderRadius: "18px",
                overflow: "hidden",
                background: "#fff",
                border: "1px solid #EEEEEE",
                boxShadow:
                    "0 6px 20px rgba(0,0,0,.06)",
                transition: ".3s ease",

                "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow:
                        "0 12px 30px rgba(0,0,0,.1)",
                },
            }}
        >
            {/* Image */}

            <Box
                sx={{
                    position: "relative",
                    height: {
                        xs: 190,
                        sm: 200,
                        md: 250,
                    },
                    background: "#FAFAF8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                }}
            >
                {image ? (
                    <Box
                        component="img"
                        src={item.images?.[0]?.url}
                        alt={item?.name || "Watch"}
                        sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            p: .5,
                            transition: ".4s ease",

                            ".MuiCard-root:hover &": {
                                transform: "scale(1.05)",
                            },
                        }}
                    />
                ) : (
                    <Typography
                        sx={{
                            color: "#999",
                            fontSize: 13,
                        }}
                    >
                        No Image
                    </Typography>
                )}

                {/* Remove */}

                <IconButton
                    onClick={(e) => {
                        e.stopPropagation();
                        dispatch(
                            toggleWishlist(item._id)
                        );

                        dispatch(
                            showSnackbar({
                                severity: "success",
                                message:
                                    "Removed from wishlist",
                            })
                        );
                    }}
                    sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        width: 34,
                        height: 34,
                        background: "#fff",
                        color: "#888",
                        boxShadow:
                            "0 3px 10px rgba(0,0,0,.1)",

                        "&:hover": {
                            background: "#FFF1F1",
                            color: "#D32F2F",
                        },
                    }}
                >
                    <FaTrash size={13} />
                </IconButton>
            </Box>

            {/* Content */}

            <Box
                sx={{
                    p: 2,
                }}
            >
                <Typography
                    sx={{
                        color: "#C6A769",
                        fontSize: 12,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: ".5px",
                    }}
                >
                    {item?.brand}
                </Typography>

                <Typography
                    sx={{
                        mt: 0.5,
                        fontSize: 16,
                        fontWeight: 700,
                        color: "#222",

                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}
                >
                    {item?.name}
                </Typography>

                <Typography
                    sx={{
                        mt: 1,
                        fontSize: 17,
                        fontWeight: 700,
                        color: "#222",
                    }}
                >
                    {item?.price?.toLocaleString()} EGP
                </Typography>

                <Button
                    fullWidth
                    variant="contained"
                    onClick={(e) => {
                        e.stopPropagation();

                        dispatch(addToCart(item));
                    }}
                    sx={{
                        mt: 2,
                        height: 42,
                        borderRadius: "11px",
                        background: "#C6A769",
                        fontSize: {
                            xs: 11,
                            md: 13,
                        },
                        fontWeight: 700,
                        boxShadow: "none",

                        "&:hover": {
                            background: "#B08D47",
                            boxShadow: "none",
                        },
                    }}
                >
                    Add To Cart
                </Button>
            </Box>
        </Card>
    );
}

export default WishlistItem;