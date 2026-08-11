import { Box, Typography } from "@mui/material";

function ProductFeatures() {
    const features = [
        ["🚚", "Free Shipping"],
        ["🛡️", "2 Years Warranty"],
        ["💳", "Cash On Delivery"],
        ["↩️", "Easy Returns"],
    ];

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr 1fr",
                    sm: "repeat(2, 1fr)",
                },
                gap: 1.5,
                mt: 4,
            }}
        >
            {features.map(([icon, text]) => (
                <Box
                    key={text}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        p: 1.5,
                        borderRadius: 2,
                        background: "#fff",
                    }}
                >
                    <Box
                        sx={{
                            fontSize: 19,
                        }}
                    >
                        {icon}
                    </Box>

                    <Typography
                        fontSize={13}
                        fontWeight={600}
                    >
                        {text}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
}

export default ProductFeatures;