import { Box, Typography, Radio } from "@mui/material";

function PaymentMethod() {
    return (
        <Box className="checkoutSection">
            <Typography
                sx={{
                    fontSize: 21,
                    fontWeight: 700,
                    mb: 2,
                }}
            >
                Payment Method
            </Typography>

            <Box
                sx={{
                    p: 2,
                    borderRadius: 2,
                    border: "1px solid #C6A769",
                    background: "#FFFDF9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                }}
            >
                <Box>
                    <Typography
                        fontWeight={700}
                        fontSize={15}
                    >
                        Cash On Delivery
                    </Typography>

                    <Typography
                        color="text.secondary"
                        fontSize={13}
                        mt={0.5}
                    >
                        Pay when your order arrives
                    </Typography>
                </Box>

                <Radio
                    checked
                    sx={{
                        color: "#C6A769",
                        "&.Mui-checked": {
                            color: "#C6A769",
                        },
                    }}
                />
            </Box>
        </Box>
    );
}

export default PaymentMethod;