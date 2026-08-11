import { Box, Typography, Button } from "@mui/material";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

function EmptyWishlist() {
    return (
        <Box
            sx={{
                minHeight: {
                    xs: "calc(100vh - 100px)",
                    sm: "80vh",
                },

                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",

                px: {
                    xs: 2.5,
                    sm: 3,
                },

                mt: {
                    xs: 7,
                    sm: 5,
                    md: 3,
                },

                textAlign: "center",
            }}
        >
            {/* Heart */}

            <Box
                sx={{
                    width: {
                        xs: 70,
                        sm: 80,
                    },

                    height: {
                        xs: 70,
                        sm: 80,
                    },

                    borderRadius: "50%",

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    background: "#FFF9ED",

                    color: "#C6A769",

                    mb: {
                        xs: 2,
                        sm: 2.5,
                    },

                    "& svg": {
                        fontSize: {
                            xs: 44,
                            sm: 64,
                        },
                    },
                }}
            >
                <FaRegHeart />
            </Box>

            {/* Title */}

            <Typography
                sx={{
                    fontSize: {
                        xs: 25,
                        sm: 30,
                        md: 34,
                    },

                    lineHeight: 1.3,

                    fontWeight: 700,
                    color: "#222",
                }}
            >
                Your Wishlist is Empty
            </Typography>

            {/* Description */}

            <Typography
                sx={{
                    mt: 1.2,

                    color: "#888",

                    fontSize: {
                        xs: 13,
                        sm: 14,
                    },

                    lineHeight: 1.7,

                    maxWidth: {
                        xs: 300,
                        sm: 420,
                    },
                }}
            >
                Save your favorite luxury watches and
                they'll appear here.
            </Typography>

            {/* Button */}

            <Button
                component={Link}
                to="/shop"
                variant="contained"
                sx={{
                    mt: {
                        xs: 2.5,
                        sm: 3,
                    },

                    height: {
                        xs: 44,
                        sm: 48,
                    },

                    px: {
                        xs: 3,
                        sm: 4,
                    },

                    borderRadius: {
                        xs: "11px",
                        sm: "13px",
                    },

                    background: "#C6A769",

                    fontSize: {
                        xs: 13,
                        sm: 14,
                    },

                    fontWeight: 700,

                    boxShadow:
                        "0 6px 18px rgba(198,167,105,.2)",

                    "&:hover": {
                        background: "#B4934D",
                        boxShadow:
                            "0 8px 22px rgba(198,167,105,.25)",
                    },
                }}
            >
                Continue Shopping
            </Button>
        </Box>
    );
}

export default EmptyWishlist;