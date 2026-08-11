import {
    TableRow,
    TableCell,
    Chip,
    Typography,
    Stack,
} from "@mui/material";

import OrderActions from "./OrderActions";

function OrderRow({
    order,
    onView,
    onEdit,
}) {
    return (
        <TableRow
            hover
            sx={{
                transition: ".25s",

                "& td": {
                    py: 1.5,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    whiteSpace: "nowrap",
                },

                "&:hover": {
                    bgcolor: "action.hover",
                },
            }}
        >
            {/* Order ID */}

            <TableCell
                sx={{
                    fontWeight: 700,
                    color: "#C6A769",
                }}
            >
                #{order._id.slice(-6)}
            </TableCell>

            {/* Customer */}

            <TableCell>
                <Stack spacing={0.2}>
                    <Typography
                        fontWeight={600}
                        fontSize={13}
                    >
                        {order.shippingAddress.firstName}{" "}
                        {order.shippingAddress.lastName}
                    </Typography>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                    >
                        {order.shippingAddress.phone}
                    </Typography>
                </Stack>
            </TableCell>

            {/* Date */}

            <TableCell>
                {new Date(order.createdAt).toLocaleDateString("en-GB")}
            </TableCell>

            {/* Products */}

            <TableCell>
                <Stack spacing={0.2}>
                    <Typography
                        fontWeight={600}
                        fontSize={13}
                    >
                        {order.orderItems?.[0]?.name}
                    </Typography>

                    {order.orderItems.length > 1 && (
                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            +{order.orderItems.length - 1} more
                        </Typography>
                    )}
                </Stack>
            </TableCell>

            {/* Total */}

            <TableCell
                sx={{
                    fontWeight: 700,
                    color: "#C6A769",
                }}
            >
                {order.totalPrice} EGP
            </TableCell>

            {/* Payment */}

            <TableCell>
                <Chip
                    size="small"
                    label={order.paymentMethod}
                    color="primary"
                    variant="outlined"
                />
            </TableCell>

            {/* Status */}

            <TableCell>
                <Chip
                    size="small"
                    label={order.orderStatus}
                    color={
                        order.orderStatus === "Delivered"
                            ? "success"
                            : order.orderStatus === "Cancelled"
                            ? "error"
                            : order.orderStatus === "Shipped"
                            ? "info"
                            : "warning"
                    }
                />
            </TableCell>

            {/* Actions */}

            <TableCell align="center">
                <OrderActions
                    order={order}
                    onView={onView}
                    onEdit={onEdit}
                />
            </TableCell>
        </TableRow>
    );
}

export default OrderRow;