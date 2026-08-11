import { useEffect } from "react";
import {
    Box,
    Container,
    Typography,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import {
    fetchWishlist,
    reset,
} from "../../features/wishlist/wishlistSlice";

import EmptyWishlist from "./EmptyWishlist";
import WishlistItem from "./WishlistItem";

function Wishlist() {
    const dispatch = useDispatch();

    const {
        wishlistItems = [],
        isSuccess,
    } = useSelector((state) => state.wishlist);

    useEffect(() => {
        dispatch(fetchWishlist());
    }, [dispatch]);

    useEffect(() => {
        if (isSuccess) {
            dispatch(reset());
        }
    }, [isSuccess, dispatch]);

    if (wishlistItems.length === 0) {
        return <EmptyWishlist />;
    }

    return (
        <Container
            // maxWidth="lg"
            sx={{
                mt: {
                    xs: 11,
                    sm: 12,
                    md: 13,
                },
                mb: 6,

                px: {
                    xs: 1.5,
                    sm: 2,
                    md: 3,
                },
            }}
        >
            {/* Header */}

            <Box
                sx={{
                    textAlign: "center",
                    mb: {
                        xs: 3,
                        sm: 4,
                    },
                }}
            >
                <Typography
                    sx={{
                        fontSize: {
                            xs: 26,
                            sm: 30,
                            md: 32,
                        },
                        fontWeight: 700,
                        color: "#222",
                    }}
                >
                    My Wishlist
                </Typography>

                <Typography
                    sx={{
                        mt: 0.5,
                        fontSize: {
                            xs: 13,
                            sm: 14,
                        },
                        color: "#888",
                    }}
                >
                    Your favorite watches, all in one place.
                </Typography>
            </Box>

            {/* Wishlist Grid */}

            <Box
                sx={{
                    display: "grid",

                    gridTemplateColumns: {
                        xs: "repeat(2, minmax(0, 1fr))",
                        sm: "repeat(2, minmax(0, 1fr))",
                        md: "repeat(3, minmax(0, 1fr))",
                        lg: "repeat(5, minmax(0, 1fr))",
                    },

                    gap: {
                        xs: 1.5,
                        sm: 2,
                        md: 2.5,
                    },

                    alignItems: "stretch",
                }}
            >
                {wishlistItems.map((item) => (
                    <WishlistItem
                        key={item._id}
                        item={item}
                    />
                ))}
            </Box>
        </Container>
    );
}

export default Wishlist;