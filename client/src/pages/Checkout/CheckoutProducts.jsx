import {
    Box,
    Typography,
} from "@mui/material";

function CheckoutProducts({ cartItems }) {
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                }}
            >
                <Typography
                    sx={{
                        fontSize: 21,
                        fontWeight: 700,
                    }}
                >
                    Products
                </Typography>

                <Typography
                    color="text.secondary"
                    fontSize={13}
                >
                    {cartItems.length} items
                </Typography>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    overflowX: "auto",
                    pb: 1,

                    "&::-webkit-scrollbar": {
                        height: 5,
                    },

                    "&::-webkit-scrollbar-thumb": {
                        background: "#C6A769",
                        borderRadius: 10,
                    },
                }}
            >
                {cartItems.map((item) => {
                    const image =
                        item.images?.[0]?.url ||
                        item.images?.[0] ||
                        item.image;

                    return (
                        <Box
                            key={item._id}
                            sx={{
                                flex: {
                                    xs: "0 0 135px",
                                    sm: "0 0 155px",
                                },
                                border:
                                    "1px solid #eee",
                                borderRadius: 2,
                                overflow: "hidden",
                                background: "#fff",
                            }}
                        >
                            <Box
                                sx={{
                                    height: {
                                        xs: 105,
                                        sm: 120,
                                    },
                                    background: "#fafafa",
                                }}
                            >
                                <Box
                                    component="img"
                                    src={image}
                                    alt={item.name}
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit:
                                            "contain",
                                        p: 1,
                                    }}
                                />
                            </Box>

                            <Box sx={{ p: 1.5 }}>
                                <Typography
                                    fontWeight={700}
                                    fontSize={13}
                                    sx={{
                                        display:
                                            "-webkit-box",
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient:
                                            "vertical",
                                        overflow: "hidden",
                                    }}
                                >
                                    {item.name}
                                </Typography>

                                <Typography
                                    color="text.secondary"
                                    fontSize={12}
                                    mt={0.5}
                                >
                                    Qty: {item.quantity}
                                </Typography>

                                <Typography
                                    color="#C6A769"
                                    fontWeight={700}
                                    fontSize={13}
                                    mt={0.5}
                                >
                                    EGP{" "}
                                    {item.price.toLocaleString()}
                                </Typography>
                            </Box>
                        </Box>
                    );
                })}
            </Box>
        </>
    );
}

export default CheckoutProducts;