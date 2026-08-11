import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Divider,
    Stack,
    Avatar,
    Box,
} from "@mui/material";

function ViewOrderDialog({
    open,
    onClose,
    order,
}) {

    if (!order) return null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            slotProps={{
                paper: {
                    sx: {
                        bgcolor: "var(--bg-dialong)",
                        color: "var(--text)",
                        borderRadius: 2,
                        border: "1px solid",
                        borderColor: "var(--paper-2)",
                        overflow: "hidden",
                    },
                },
            }}
        >
            <DialogTitle
            >
                Order #{order._id.slice(-6)}
            </DialogTitle>


            <DialogContent>
                <Typography
                    sx={{
                        p: "3px",
                    }}
                    fontWeight={700}>
                    Customer
                </Typography>

                <Typography>
                    {order.shippingAddress.firstName}{" "}
                    {order.shippingAddress.lastName}
                </Typography>

                <Typography>
                    {order.shippingAddress.phone}
                </Typography>

                <Typography sx={{ mb: 2 }}>
                    {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.governorate}
                </Typography>
                <Typography color="text.secondary">
                    Date :
                    {" "}
                    {new Date(order.createdAt).toLocaleString("en-GB")}
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Typography
                    fontWeight={700}
                    sx={{ mb: 2 }}
                >
                    Products
                </Typography>

                <Stack spacing={2}>

                    {order.orderItems.map((item, index) => (

                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                p: 2,
                                borderRadius: 3,
                                bgcolor: "background.paper",
                                border: "1px solid",
                                borderColor: "divider",
                            }}
                        >
                            <Avatar
                                src={item.image}
                                variant="rounded"
                                sx={{
                                    width: 60,
                                    height: 60,
                                }}
                            />

                            <Box sx={{ flex: 1 }}>

                                <Typography fontWeight={700}>
                                    {item.name}
                                </Typography>

                                <Typography color="text.secondary">
                                    Qty : {item.quantity}
                                </Typography>

                            </Box>

                            <Typography fontWeight={700}>
                                {item.price} EGP
                            </Typography>

                        </Box>

                    ))}

                </Stack>

                <Divider sx={{ my: 3 }} />

                <Typography>
                    Payment :
                    <b> {order.paymentMethod}</b>
                </Typography>

                <Typography>
                    Items :
                    <b> {order.itemsPrice} EGP</b>
                </Typography>

                <Typography>
                    Shipping :
                    <b> {order.shippingPrice} EGP</b>
                </Typography>

                <Typography
                    fontWeight={700}
                    fontSize={18}
                    mt={1}
                >
                    Total : {order.totalPrice} EGP
                </Typography>

            </DialogContent>

            <DialogActions>

                <Button
                    variant="contained"
                    onClick={onClose}
                    sx={{ m: 3 }}
                >
                    Close
                </Button>

            </DialogActions>

        </Dialog>
    );
}

export default ViewOrderDialog;