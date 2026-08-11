import { Box, Typography } from "@mui/material";

function CheckoutHeader() {
    return (
        <Box
            sx={{
                display: {
            xs: "none",
            md: "block",
        },
                mb: { xs: 3, md: 4 },
            }}
        >
            <Typography
                sx={{
                    fontSize: {
                        xs: 28,
                        md: 36,
                    },
                    fontWeight: 700,
                    color: "#222",
                }}
            >
                Checkout
            </Typography>

            <Typography
                sx={{
                    mt: 0.5,
                    color: "#888",
                    fontSize: 14,
                }}
            >
                Complete your order details below.
            </Typography>
        </Box>
    );
}

export default CheckoutHeader;