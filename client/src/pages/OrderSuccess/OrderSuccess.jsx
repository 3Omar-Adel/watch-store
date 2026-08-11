import { Box, Typography, Button } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import { useNavigate } from "react-router-dom";

function OrderSuccess() {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                px:
                {
                    xs: 2,
                    sm: 3,
                },
                background: "#F8F8F8",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 520,
                    background: "#fff",
                    borderRadius: "28px",
                    py: {
                        xs: 4,
                        md: 4,
                    },
                    mt: 10,
                    textAlign: "center",
                    boxShadow: "0 20px 60px rgba(0,0,0,.08)",
                }}
            >
                <CheckCircleRoundedIcon
                    sx={{
                        fontSize: {
                            xs: 50,
                            md: 70,
                        },
                        color: "#4CAF50",
                        mb: 1,
                    }}
                />

                <Typography
                    variant="h3"
                    fontWeight={800}
                    sx={{
                        mb: 2,
                        fontSize: {
                            xs: "2rem",
                            md: "2.6rem",
                        },
                    }}
                >
                    Thank You!
                </Typography>

                <Typography
                    sx={{
                        color: "#666",
                        fontSize: {
                            xs: 16,
                            md: 18,
                        },
                        lineHeight: 1.8,
                        mb: 1,
                    }}
                >
                    Your order has been placed successfully.
                </Typography>

                <Typography
                    sx={{
                        color: "#888",
                        fontSize: 15,
                        mb: 5,
                    }}
                >
                    We’ve received your order and our team will start preparing
                    it shortly.
                </Typography>

                <Box
                    sx={{
                        background: "#FAFAFA",
                        border: "1px solid #ECECEC",
                        borderRadius: "18px",
                        p: 3,
                        mb: 5,
                    }}
                >
                    <Typography
                        fontWeight={700}
                        mb={1}
                    >
                        What's next?
                    </Typography>

                    <Typography
                        sx={{
                            color: "text.secondary",
                            fontSize: 15,
                            lineHeight: 1.8,
                        }}
                    >
                        • We'll review your order.
                        <br />
                        • You'll receive updates as its status changes.
                        <br />
                        • You can track it anytime from{" "}
                        <Box
                            component="span"
                            onClick={() => navigate("/orders")}
                            sx={{
                                color: "#B08D47",
                                fontWeight: 700,
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                "&:hover": { color: "#8F7138", textDecoration: "underline", },
                            }}
                        >
                            My Orders
                        </Box>.
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    startIcon={<ShoppingBagRoundedIcon />}
                    onClick={() => navigate("/shop")}
                    sx={{
                        width: {
                            xs: "100%",
                            sm: 280,
                        },
                        height: 50,
                        borderRadius: "14px",
                        background: "#C6A769",
                        fontWeight: 700,
                        fontSize: 16,
                        textTransform: "none",

                        "&:hover": {
                            background: "#B08D47",
                        },
                    }}
                >
                    Continue Shopping
                </Button>
            </Box>
        </Box>
    );
}

export default OrderSuccess;