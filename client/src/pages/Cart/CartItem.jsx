import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
} from "../../features/cart/cartSlice";

import {
    Box,
    Typography,
    IconButton,
    Button,
} from "@mui/material";

import { FaTrash } from "react-icons/fa";

function CartItem({ item }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const image = item?.images?.[0]?.url;

    const openProduct = () => {
        navigate(`/product/${item._id}`);
    };

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: {
                    xs: 1.5,
                    sm: 2.5,
                    md: 3,
                },

                p: {
                    xs: 1.3,
                    sm: 2,
                    md: 2.2,
                },

                background: "#fff",
                border: "1px solid #EEEEEE",

                borderRadius: {
                    xs: "14px",
                    sm: "17px",
                },

                boxShadow:
                    "0 5px 18px rgba(0,0,0,.05)",

                transition: ".3s ease",

                "&:hover": {
                    boxShadow:
                        "0 9px 25px rgba(0,0,0,.08)",
                },
            }}
        >
            {/* Product Click Area */}

            <Box
                onClick={openProduct}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: {
                        xs: 1.5,
                        sm: 2.5,
                    },

                    flex: 1,
                    minWidth: 0,

                    cursor: "pointer",
                }}
            >
                {/* Image */}

                <Box
                    sx={{
                        flexShrink: 0,

                        width: {
                            xs: 90,
                            sm: 120,
                            md: 135,
                        },

                        height: {
                            xs: 90,
                            sm: 120,
                            md: 135,
                        },

                        borderRadius: {
                            xs: "10px",
                            sm: "13px",
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
                            src={image}
                            alt={item?.name || "Watch"}
                            sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                p: {
                                    xs: 1,
                                    sm: 1.5,
                                },
                            }}
                        />
                    ) : (
                        <Typography
                            sx={{
                                color: "#999",
                                fontSize: 11,
                            }}
                        >
                            No Image
                        </Typography>
                    )}
                </Box>

                {/* Product Info */}

                <Box
                    sx={{
                        minWidth: 0,
                        flex: 1,
                        maxWidth: {
                            xs: "calc(100% - 100px)",
                            sm: "320px",
                            md: "400px",
                        },
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Typography
                        sx={{
                            color: "#C6A769",
                            fontSize: {
                                xs: 10,
                                sm: 12,
                            },
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: ".4px",
                        }}
                    >
                        {item?.brand}
                    </Typography>

                    <Typography
                        sx={{
                            mt: 0.4,

                            fontSize: {
                                xs: 14,
                                sm: 17,
                                md: 18,
                            },

                            maxWidth: "50px",
                            fontWeight: 700,
                            color: "#222",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                        }}
                    >
                        {item?.name}
                    </Typography>

                    <Typography
                        sx={{
                            mt: 0.5,

                            fontSize: {
                                xs: 13,
                                sm: 15,
                            },

                            fontWeight: 600,
                            color: "#555",
                        }}
                    >
                        EGP{" "}
                        {item?.price?.toLocaleString()}
                    </Typography>
                </Box>
            </Box>

            {/* Quantity */}

            <Box
                sx={{
                    flexShrink: 0,
                    width: {
                        xs: "auto",
                        sm: 250,
                        md: 285,
                    },

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",

                    gap: {
                        xs: 1,
                        sm: 2,
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",

                        border: "1px solid #E5E5E5",
                        borderRadius: "10px",
                        overflow: "hidden",
                    }}
                >
                    <Button
                        onClick={() =>
                            dispatch(
                                decreaseQuantity(
                                    item._id
                                )
                            )
                        }
                        sx={{
                            minWidth: {
                                xs: 27,
                                sm: 32,
                            },

                            fontSize: {
                                xs: 22,
                                sm: 26,
                            },
                            width: {
                                xs: 27,
                                sm: 32,
                            },

                            height: {
                                xs: 30,
                                sm: 34,
                            },

                            p: 0,
                            color: "#555",
                        }}
                    >
                        -
                    </Button>

                    <Typography
                        sx={{
                            minWidth: {
                                xs: 25,
                                sm: 30,
                            },

                            textAlign: "center",

                            fontSize: {
                                xs: 12,
                                sm: 14,
                            },

                            fontWeight: 700,
                        }}
                    >
                        {item?.quantity}
                    </Typography>

                    <Button
                        onClick={() =>
                            dispatch(
                                increaseQuantity(
                                    item._id
                                )
                            )
                        }
                        sx={{
                            minWidth: {
                                xs: 27,
                                sm: 32,
                            },

                            width: {
                                xs: 27,
                                sm: 32,
                            },

                            height: {
                                xs: 30,
                                sm: 34,
                            },

                            p: 0,
                            color: "#555",
                        }}
                    >
                        +
                    </Button>
                </Box>

                {/* Total */}

                <Typography
                    sx={{
                        width: {
                            xs: 65,
                            sm: 90,
                        },
                        flexShrink: 0,
                        textAlign: "right",
                        fontSize: {
                            xs: 12,
                            sm: 15,
                        },
                        fontWeight: 700,
                    }}
                >
                    EGP{" "}
                    {(
                        item.price *
                        item.quantity
                    ).toLocaleString()}
                </Typography>

                {/* Delete */}

                <IconButton
                    onClick={() =>
                        dispatch(
                            removeFromCart(item._id)
                        )
                    }
                    sx={{
                        width: {
                            xs: 30,
                            sm: 36,
                        },

                        height: {
                            xs: 30,
                            sm: 36,
                        },

                        color: "#999",

                        "&:hover": {
                            background: "#FFF1F1",
                            color: "#D32F2F",
                        },
                    }}
                >
                    <FaTrash size={12} />
                </IconButton>
            </Box>
        </Box>
    );
}

export default CartItem;