import "../../pages/Cart/Cart.css";

import {
    Box,
    Typography,
    Button,
    Divider,
} from "@mui/material";

function OrderSummary({ cartItems, buttonText, buttonAction,shipping = 15, disabled,}) {

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    // const shipping = subtotal > 0 ? 150 : 0;
    const total = subtotal + shipping;
    return (
        <Box className="cartSummary">
            <Typography variant="h5" fontWeight={700}>
                Order Summary
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box className="summaryRow">
                <Typography>
                    Subtotal
                </Typography>
                <Typography>
                    EGP {subtotal}
                </Typography>
            </Box>
            <Box className="summaryRow">
                <Typography>
                    Shipping
                </Typography>
                <Typography>
                    EGP {shipping}
                </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box className="summaryRow">
                <Typography
                    fontWeight={700}
                    fontSize={20}
                >
                    Total
                </Typography>
                <Typography
                    fontWeight={700}
                    fontSize={20}
                >
                    EGP {total}
                </Typography>
            </Box>
            <Button
                fullWidth
                variant="contained"
                onClick={buttonAction}
                disabled={disabled}
                sx={{
                    mt: 3,
                    height: 55,
                    background: "#C6A769",
                    "&:hover": {
                        background: "#b89656",
                    },
                }}
            >
                {buttonText}
            </Button>
        </Box>
    );
}

export default OrderSummary;