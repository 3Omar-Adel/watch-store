import {
    Box,
    Container,
    Typography,
    Grid,
    Paper,
} from "@mui/material";

import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";

const features = [
    {
        icon: <LocalShippingOutlinedIcon sx={{ fontSize: 50 }} />,
        title: "Free Shipping",
        description: "Free delivery on all orders over $100.",
    },
    {
        icon: <VerifiedUserOutlinedIcon sx={{ fontSize: 50 }} />,
        title: "2-Year Warranty",
        description: "Official warranty on every luxury watch.",
    },
    {
        icon: <CreditCardOutlinedIcon sx={{ fontSize: 50 }} />,
        title: "Secure Payment",
        description: "100% secure and encrypted checkout.",
    },
    {
        icon: <CardGiftcardOutlinedIcon sx={{ fontSize: 50 }} />,
        title: "Exclusive Deals",
        description: "Enjoy premium discounts every season.",
    },
];

export default function WhyChooseUs() {
    return (
        <Box
            sx={{
                py: 5,
                backgroundColor: "#F5EFE6",
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        textAlign: "center",
                        px: {
                            xs: 2,
                            sm: 3,
                            md: 0,
                        },
                    }}
                >
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        sx={{
                            mb: {
                                xs: 1,
                                sm: 1.5,
                                md: 2,
                            },

                            fontSize: {
                                xs: 25,
                                sm: 30,
                                md: 34,
                            },

                            color: "#222",

                            lineHeight: 1.2,
                        }}
                    >
                        Why Choose Us
                    </Typography>

                    <Typography
                        sx={{
                            color: "#666",

                            maxWidth: {
                                xs: "100%",
                                sm: 600,
                                md: 650,
                            },

                            mx: "auto",

                            mb: {
                                xs: 4,
                                sm: 5,
                                md: 6,
                            },

                            fontSize: {
                                xs: 13,
                                sm: 14,
                                md: 16,
                            },

                            lineHeight: {
                                xs: 1.6,
                                md: 1.8,
                            },
                        }}
                    >
                        Discover premium watches crafted with precision, backed by
                        trusted service, secure payments, and fast worldwide delivery.
                    </Typography>
                </Box>

                <Grid
                    container
                    spacing={{
                        xs: 2,
                        sm: 2.5,
                        md: 3,
                    }}
                >
                    {features.map((item, index) => (
                        <Grid
                            size={{ xs: 6, sm: 6, md: 3, }} key={index}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: {
                                        xs: 2.5,
                                        sm: 3,
                                        md: 3,
                                    },

                                    borderRadius: {
                                        xs: 3,
                                        md: 4,
                                    },

                                    textAlign: "center",
                                    height: "100%",

                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",

                                    transition: "0.3s",
                                    cursor: "pointer",
                                    "&:hover": {
                                        transform: "translateY(-8px)",
                                        boxShadow:
                                            "0 15px 35px rgba(0,0,0,.12)",
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        width: {
                                            xs: 58,
                                            sm: 62,
                                            md: 65,
                                        },

                                        height: {
                                            xs: 58,
                                            sm: 62,
                                            md: 65,
                                        },

                                        mx: "auto",
                                        mb: {
                                            xs: 2,
                                            md: 2.5,
                                        },

                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: "50%",
                                        backgroundColor: "#F5EFE6",
                                        color: "#C89B6D",
                                        "& svg": {
                                            fontSize: {
                                                xs: 30,
                                                sm: 32,
                                                md: 34,
                                            },
                                        },
                                    }}
                                >

                                    {item.icon}
                                </Box>

                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    gutterBottom
                                    sx={{
                                        fontSize: {
                                            xs: 15,
                                            sm: 17,
                                            md: 18,
                                        },
                                    }}
                                >
                                    {item.title}
                                </Typography>

                                <Typography
                                    sx={{
                                        color: "#666",

                                        fontSize: {
                                            xs: 12,
                                            sm: 13,
                                            md: 15,
                                        },

                                        lineHeight: {
                                            xs: 1.6,
                                            md: 1.8,
                                        },
                                    }}
                                >
                                    {item.description}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}