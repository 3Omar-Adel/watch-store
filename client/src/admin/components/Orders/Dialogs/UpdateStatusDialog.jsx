import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
} from "@mui/material";

import { useEffect, useState } from "react";

function UpdateStatusDialog({
    open,
    onClose,
    order,
    onSave,
    loading = false,
}) {

    const [status, setStatus] = useState("Processing");

    useEffect(() => {

        if (order) {
            setStatus(order.orderStatus);
        }

    }, [order]);

    if (!order) return null;

    const handleSave = () => {

        onSave({
            id: order._id,
            orderStatus: status,
        });

    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="xs"
        >
            <DialogTitle>
                Update Order Status
            </DialogTitle>

            <DialogContent>

                <TextField
                    select
                    fullWidth
                    label="Order Status"
                    value={status}
                    onChange={(e) =>
                        setStatus(e.target.value)
                    }
                    sx={{
                        mt: 2,
                    }}
                >
                    <MenuItem value="Processing">
                        Processing
                    </MenuItem>

                    <MenuItem value="Shipped">
                        Shipped
                    </MenuItem>

                    <MenuItem value="Delivered">
                        Delivered
                    </MenuItem>

                    <MenuItem value="Cancelled">
                        Cancelled
                    </MenuItem>

                </TextField>

            </DialogContent>

            <DialogActions>

                <Button
                    onClick={onClose}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={loading}
                >
                    Save
                </Button>

            </DialogActions>

        </Dialog>
    );
}

export default UpdateStatusDialog;