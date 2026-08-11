import EmptyCart from "./EmptyCart";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import { showSnackbar } from "../../features/snackbar/snackbarSlice";

import {
    Box,
    Container,
    Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

function Cart() {
    const { user } = useSelector(
        (state) => state.auth
    );

    const { cartItems = [] } = useSelector(
        (state) => state.cart
    );

    const navigate = useNavigate();
    const dispatch = useDispatch();

    if (cartItems.length === 0) {
        return <EmptyCart />;
    }

    const checkoutHandler = () => {
        if (!user) {
            dispatch(
                showSnackbar({
                    message: "Please login first",
                    severity: "warning",
                })
            );

            navigate("/login", {
                state: {
                    from: "/checkout",
                },
            });

            return;
        }

        navigate("/checkout");
    };

    return (
        <Container
            maxWidth="lg"
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
                    display: {
                        xs: "none",
                        md: "block",
                    },
                    mb: 3,
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
                    Shopping Cart
                </Typography>

                <Typography
                    sx={{
                        mt: 0.5,
                        color: "#888",

                        fontSize: {
                            xs: 13,
                            sm: 14,
                        },
                    }}
                >
                    Review your items before checkout.
                </Typography>
            </Box>

            {/* Main Layout */}

            <Box
                sx={{
                    display: "grid",

                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "minmax(0, 1fr) 350px",
                    },

                    gap: {
                        xs: 2.5,
                        md: 3,
                    },

                    alignItems: "start",
                }}
            >
                {/* Products */}

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",

                        gap: {
                            xs: 1.5,
                            sm: 2,
                        },

                        /* Scroll only products */

                        maxHeight: {
                            xs: "none",
                            md: "720px",
                            lg: "760px",
                        },

                        overflowY: {
                            xs: "visible",
                            md: "auto",
                        },

                        pr: {
                            xs: 0,
                            md: 1,
                        },

                        /* Scrollbar */

                        "&::-webkit-scrollbar": {
                            width: "5px",
                        },

                        "&::-webkit-scrollbar-thumb": {
                            background: "#D8C99F",
                            borderRadius: "10px",
                        },

                        "&::-webkit-scrollbar-track": {
                            background: "#f7f7f7",
                        },
                    }}
                >
                    {cartItems.map((item) => (
                        <CartItem
                            key={item._id}
                            item={item}
                        />
                    ))}
                </Box>

                {/* Summary */}

                <Box
                    sx={{
                        position: {
                            xs: "static",
                            md: "sticky",
                        },

                        top: {
                            md: 100,
                        },

                        width: "100%",
                    }}
                >
                    <CartSummary
                        cartItems={cartItems}
                        onCheckout={checkoutHandler}
                    />
                </Box>
            </Box>
        </Container>
    );
}

export default Cart;