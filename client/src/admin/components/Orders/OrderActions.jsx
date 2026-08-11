import {
    Box,
    IconButton,
    Tooltip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

function OrderActions({
    order,
    onView,
    onEdit,
}) {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                gap: .5,
            }}
        >
            {/* View */}

            <Tooltip title="View Order">
                <IconButton
                    onClick={() => onView(order)}
                    sx={{
                        width: 34,
                        height: 34,
                        color: "#1976d2",
                        transition: ".25s",

                        "&:hover": {
                            bgcolor: "rgba(25,118,210,.12)",
                            transform: "scale(1.08)",
                        },
                    }}
                >
                    <VisibilityIcon
                        sx={{
                            fontSize: 20,
                        }}
                    />
                </IconButton>
            </Tooltip>

            {/* Update Status */}

            <Tooltip title="Update Status">
                <IconButton
                    onClick={() => onEdit(order)}
                    sx={{
                        width: 34,
                        height: 34,
                        color: "#C6A769",
                        transition: ".25s",

                        "&:hover": {
                            bgcolor: "rgba(198,167,105,.15)",
                            transform: "scale(1.08)",
                        },
                    }}
                >
                    <EditIcon
                        sx={{
                            fontSize: 20,
                        }}
                    />
                </IconButton>
            </Tooltip>
        </Box>
    );
}

export default OrderActions;