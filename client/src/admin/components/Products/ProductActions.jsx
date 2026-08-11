import {
    Box,
    IconButton,
    Tooltip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function ProductActions({
    product,
    onEdit,
    onDelete,
}) {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                gap: .5,
            }}
        >
            <Tooltip title="Edit Product">
                <IconButton
                    onClick={() => onEdit(product)}
                    sx={{
                        color: "var(--text)",
                        width: 33,
                        height: 33,
                        transition: ".25s",
                        "&:hover": {
                            bgcolor: "primary.dark",
                            transform: "scale(1.08)",
                        },
                    }}
                >
                    <EditIcon
                        sx={{
                            fontSize: "22px"
                        }}
                    />
                </IconButton>
            </Tooltip>

            <Tooltip title="Delete Product">
                <IconButton
                    onClick={() => onDelete(product)}
                    sx={{
                        color: "var(--text)",
                        width: 33,
                        height: 33,
                        transition: ".25s",

                        "&:hover": {
                            bgcolor: "error.dark",
                            transform: "scale(1.08)",
                        },
                    }}
                >
                    <DeleteIcon
                        sx={{
                            fontSize: "20px"
                        }}
                    />
                </IconButton>
            </Tooltip>
        </Box>
    );
}

export default ProductActions;