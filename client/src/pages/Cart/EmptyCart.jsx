import { Box, Typography, Button } from "@mui/material";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { Link } from "react-router-dom";

function EmptyCart() {
    return (
        <Box
    sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f8f8f8",
        px: 2,
    }}
>
    <Box
        sx={{
            background: "#fff",
            p: { xs: 3, md: 6 },
            borderRadius: "30px",
            textAlign: "center",
            maxWidth: "520px",
            width: "100%",
            boxShadow: "0 15px 40px rgba(0,0,0,.08)",
        }}
    >
        <Box
            sx={{
                color: "#C6A769",
                fontSize: {
                    xs: 90,
                    sm: 110,
                    md: 150,
                },
                mb: 2,
            }}
        >
            <PiShoppingCartSimpleBold />
        </Box>

        <Typography
            variant="h4"
            fontWeight={700}
            sx={{
                fontSize: {
                    xs: "1.6rem",
                    md: "2.125rem",
                },
            }}
        >
            Your Cart is Empty
        </Typography>

        <Typography
            sx={{
                color: "#777",
                mt: 2,
                mb: 4,
                lineHeight: 1.8,
                fontSize: {
                    xs: 14,
                    md: 16,
                },
            }}
        >
            Looks like you haven't added any watches to your cart yet.
        </Typography>

        <Button
            component={Link}
            to="/shop"
            variant="contained"
            sx={{
                px: { xs: 3, md: 5 },
                py: { xs: 1.2, md: 1.8 },
                borderRadius: "15px",
                background: "#b7924f",
                fontWeight: 700,
                fontSize: {
                    xs: 15,
                    md: 17,
                },
                "&:hover": {
                    transform: "scale(1.05)",
                    transition: ".3s",
                    backgroundColor: "#e0b25d",
                },
            }}
        >
            Start Shopping
        </Button>
    </Box>
</Box>
    );
}

export default EmptyCart;