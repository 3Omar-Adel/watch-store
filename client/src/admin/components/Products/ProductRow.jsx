import {
    Avatar,
    Chip,
    IconButton,
    Stack,
    TableCell,
    TableRow,
    Typography,
} from "@mui/material";

import ProductActions from "./ProductActions";

function ProductRow({
    product,
    onEdit,
    onDelete,
}) {
    return (
        <TableRow
            hover
            sx={{
                transition: ".25s",

                "& td": {
                    py: 2,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                },

                "&:hover": {
                    bgcolor: "action.hover",
                },

            }}
        >
            {/* Image */}

            <TableCell >
                <Avatar
                    src={
                        typeof product.images?.[0] === "string"
                            ? product.images[0]
                            : product.images?.[0]?.url
                    }
                    variant="rounded"
                    sx={{
                        width: 50,
                        height: 50,
                        borderRadius: 3,
                    }}
                />
            </TableCell>
            {/* Product */}
            <TableCell
                sx={{
                    width: "100px",
                    maxWidth: "100px",
                    minWidth: "100px",
                }}
            >
                <Stack
                    spacing={0.1}
                    sx={{
                        minWidth: 0,
                        width: "100%",
                    }}
                >
                    <Typography
                        fontWeight={700}
                        fontSize={13}
                        sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {product.name}
                    </Typography>
                </Stack>
            </TableCell>
            {/* Brand */}
            <TableCell>
                <Typography
                    fontWeight={400}
                    fontSize={13}
                >
                    {product.brand}
                </Typography>

            </TableCell>
            {/* Category */}

            <TableCell>

                <Chip
                    label={product.category}
                    size="small"
                    color="primary"
                    variant="outlined"
                />
            </TableCell>

            {/* Gender */}

            <TableCell align="center">
                <Chip
                    label={product.gender}
                    size="small"
                />

            </TableCell>

            {/* Price */}

            <TableCell align="center">

                <Typography
                    fontWeight={700}
                    color="#C6A769"
                >
                    {product.price} EGP
                </Typography>

            </TableCell>
            {/* Discount */}
            <TableCell align="center">

                {
                    product.discount > 0 ?

                        <Chip
                            label={`${product.discount}`}
                            size="small"
                        />
                        :
                        "-"
                }
            </TableCell>
            {/* Stock */}
            <TableCell align="center">

                <Chip
                    label={product.stock}
                    size="small"
                />

            </TableCell>

            {/* Featured */}

            <TableCell align="center">

                <Chip
                    label={
                        product.featured
                            ? "Featured"
                            : "Normal"
                    }
                    size="small"
                    color={
                        product.featured
                            ? "warning"
                            : "default"
                    }
                />

            </TableCell>
            {/* Actions */}

            <TableCell align="center">
                <ProductActions
                    product={product}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            </TableCell>

        </TableRow>
    );
}

export default ProductRow;