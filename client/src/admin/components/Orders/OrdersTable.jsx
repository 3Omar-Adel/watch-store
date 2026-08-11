import {
    Box,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TablePagination,
    Typography,
} from "@mui/material";

import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

import OrderRow from "./OrderRow";

function OrdersTable({
    search,
    onView,
    onEdit,
}) {

    const {
        orders,
        isLoading,
    } = useSelector(
        state => state.order
    );
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);

    const filteredOrders = useMemo(() => {
        const keyword = search.toLowerCase().trim();
        return orders.filter((order) => {
            const fullName =
                `${order.shippingAddress?.firstName || ""} ${order.shippingAddress?.lastName || ""}`;
            return (
                order._id?.toLowerCase().includes(keyword) ||
                fullName.toLowerCase().includes(keyword) ||
                order.paymentMethod?.toLowerCase().includes(keyword) ||
                order.orderStatus?.toLowerCase().includes(keyword)
            );
        });
    }, [orders, search]);

    const visibleRows = useMemo(() => {

        return filteredOrders.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
        );

    }, [filteredOrders, page, rowsPerPage]);

    return (

        <Box
            sx={{
                width: "100%",
                maxWidth: "100%",
                overflow: "hidden",
                borderRadius: 1,
            }}>
            <Paper
                elevation={0}
                sx={{
                    borderRadius: 1,
                    border: "1px solid",
                    borderColor: "divider",
                    backgroundColor: "var(--bg-color)",
                    
                }}
            >
                <TableContainer sx={{
                    backgroundColor: "var(--bg-color)",
                    overflowX: "auto",
                    width: "100%",
                }}
                >
                    <Table
                        size="small"
                        sx={{
                            minWidth: 900,
                        }}
                    >
                        <TableHead>
                            <TableRow
                                sx={{
                                    "& th": {
                                        fontWeight: 700,
                                        whiteSpace: "nowrap",

                                    },
                                }}
                            >
                                <TableCell>Order ID</TableCell>
                                <TableCell>Customer</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Items</TableCell>
                                <TableCell>Total</TableCell>
                                <TableCell>Payment</TableCell>
                                <TableCell >Status</TableCell>
                                <TableCell align="center">
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                isLoading ?
                                    <TableRow>
                                        <TableCell
                                            colSpan={7}
                                            align="center"
                                        >
                                            Loading...
                                        </TableCell>
                                    </TableRow>
                                    :
                                    visibleRows.length ?
                                        visibleRows.map(order => (
                                            <OrderRow
                                                key={order._id}
                                                order={order}
                                                onView={onView}
                                                onEdit={onEdit}
                                            />
                                        ))
                                        :
                                        <TableRow>
                                            <TableCell
                                                colSpan={8}
                                                align="center"
                                            >
                                                <Typography>
                                                    No Orders
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={filteredOrders.length}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[6, 10, 20, 50]}
                    onPageChange={(e, p) => setPage(p)}
                    onRowsPerPageChange={(e) => {
                        setRowsPerPage(+e.target.value);
                        setPage(0);
                    }}
                    slotProps={{
                        select: {
                            MenuProps: {
                                disableScrollLock: true,
                            },
                        },
                    }}
                    sx={{

                        backgroundColor: "var(--bg-color)",
                        "& .MuiTablePagination-toolbar": {
                            display: "flex",
                            alignItems: "center",
                        },

                        "& .MuiTablePagination-spacer": {
                            display: "none",
                        },

                        "& .MuiTablePagination-selectLabel": {
                            margin: 0,
                        },

                        "& .MuiTablePagination-input": {
                            marginLeft: 1,
                            marginRight: "auto",
                        },

                        "& .MuiTablePagination-actions": {
                            marginLeft: "auto",
                        },
                    }}
                />

            </Paper>

        </Box>

    );
}

export default OrdersTable;