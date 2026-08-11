import { Box, Typography, Button, Divider } from "@mui/material";

function CartSummary({ cartItems, onCheckout }) {
    const subtotal = cartItems.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

    const shipping = subtotal >= 10000 ? 0 : 15;

    const total = subtotal + shipping;

    return (
        <Box
            sx={{
                background: "#fff",
                border: "1px solid #EEEEEE",
                borderRadius: "20px",
                p: {
                    xs: 2.5,
                    sm: 3,
                },
                boxShadow:
                    "0 8px 25px rgba(0,0,0,.06)",
            }}
        >
            <Typography
                sx={{
                    fontSize: {
                        xs: 20,
                        sm: 22,
                    },
                    fontWeight: 700,
                    color: "#222",
                }}
            >
                Order Summary
            </Typography>

            <Box
                sx={{
                    mt: 3,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography color="#777">
                        Subtotal
                    </Typography>

                    <Typography fontWeight={600}>
                        EGP {subtotal.toLocaleString()}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography color="#777">
                        Shipping
                    </Typography>

                    <Typography
                        fontWeight={600}
                        color={
                            shipping === 0
                                ? "#4CAF50"
                                : "#222"
                        }
                    >
                        {shipping === 0
                            ? "Free"
                            : `EGP ${shipping}`}
                    </Typography>
                </Box>
            </Box>

            <Divider sx={{ my: 2.5 }} />

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography
                    fontSize={17}
                    fontWeight={700}
                >
                    Total
                </Typography>

                <Typography
                    fontSize={20}
                    fontWeight={700}
                    color="#C6A769"
                >
                    EGP {total.toLocaleString()}
                </Typography>
            </Box>

            <Button
                fullWidth
                variant="contained"
                onClick={onCheckout}
                sx={{
                    mt: 3,
                    height: 50,
                    borderRadius: "12px",
                    background: "#C6A769",
                    fontWeight: 700,
                    boxShadow: "none",

                    "&:hover": {
                        background: "#B08D47",
                        boxShadow: "none",
                    },
                }}
            >
                Checkout
            </Button>
        </Box>
    );
}

export default CartSummary;