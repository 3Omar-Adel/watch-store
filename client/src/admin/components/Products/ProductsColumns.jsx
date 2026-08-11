import {
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";

function ProductsColumns() {
    return (
        <TableHead>
            <TableRow
                sx={{
                    "& th": {
                        fontWeight: 700,
                        fontSize: 14,
                        color: "text.primary",
                        py: 2,
                        whiteSpace: "nowrap",
                    },
                }}
            >
                <TableCell width={90}>
                    Image
                </TableCell>

                <TableCell>
                    Product
                </TableCell>

                <TableCell>
                    Brand
                </TableCell>

                <TableCell>
                    Category
                </TableCell>

                <TableCell align="center">
                    Gender
                </TableCell>

                <TableCell align="center">
                    Price
                </TableCell>

                <TableCell align="center">
                    Discount
                </TableCell>

                <TableCell align="center">
                    Stock
                </TableCell>

                <TableCell align="center">
                    Featured
                </TableCell>

                <TableCell align="center">
                    Actions
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

export default ProductsColumns;