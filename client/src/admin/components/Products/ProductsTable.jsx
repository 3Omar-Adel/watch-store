import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    Box,
} from "@mui/material";

import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

import ProductRow from "./ProductRow";

function ProductsTable({
    search,
    onEdit,
    onDelete,
}) {

    const {
        products,
        loading,
    } = useSelector((state) => state.products);

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(6);

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const filteredProducts = useMemo(() => {
        return products.filter((product) =>
            product.name
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [products, search]);

    const visibleRows = useMemo(() => {
        return filteredProducts.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
        );
    }, [filteredProducts, page, rowsPerPage]);

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: "100%",
                overflow: "hidden",
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    borderRadius: 1,
                    border: "1px solid",
                    borderColor: "divider",
                    backgroundColor: "var(--bg-color)",
                }}
            >
                <TableContainer
                    sx={{
                        overflowX: "auto",
                        width: "100%",
                    }}
                >
                    <Table
                        size="small"
                        sx={{
                            "& .MuiTypography-root": {
                                fontSize: "13px",
                            },

                            "& .MuiChip-label": {
                                fontSize: "11px",
                            },

                            "& .MuiTableCell-root": {
                                py: 0.5,
                                px: 0.75,
                            },
                            minWidth: 1050,
                        }}
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell>Product</TableCell>
                                <TableCell>Brand</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell align="center">Gender</TableCell>
                                <TableCell align="center">Price</TableCell>
                                <TableCell align="center">Discount</TableCell>
                                <TableCell align="center">Stock</TableCell>
                                <TableCell align="center">Featured</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={10}
                                        align="center"
                                    >
                                        Loading...
                                    </TableCell>
                                </TableRow>

                            ) : visibleRows.length > 0 ? (

                                visibleRows.map((product) => (
                                    <ProductRow
                                        key={product._id}
                                        product={product}
                                        onEdit={onEdit}
                                        onDelete={onDelete}
                                    />
                                ))

                            ) : (

                                <TableRow>

                                    <TableCell
                                        colSpan={10}
                                        align="center"
                                    >
                                        <Typography>
                                            No Products Found
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={filteredProducts.length}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    rowsPerPageOptions={[6, 10, 20, 50]}
                    slotProps={{
                        select: {
                            MenuProps: {
                                disableScrollLock: true,
                            },
                        },
                    }}
                    sx={{
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

export default ProductsTable;