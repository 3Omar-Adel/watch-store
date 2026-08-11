import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Avatar,
    Stack,
    Typography,
} from "@mui/material";

import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

function DeleteDialog({
    open,
    onClose,
    product,
    onConfirm,
    loading = false,
}) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
        >
            <DialogTitle
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    fontWeight: 700,
                }}
            >
                <DeleteForeverRoundedIcon color="error" />
                Delete Product
            </DialogTitle>

            <DialogContent>

                <DialogContentText sx={{ mb: 2 }}>
                    Are you sure you want to delete this product?
                </DialogContentText>

                {product && (
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                            alignItems: "center",
                            p: 2,
                            borderRadius: 2,
                            bgcolor: "action.hover",
                        }}
                    >
                        <Avatar
                            src={product.images?.[0]?.url}
                            variant="rounded"
                            sx={{
                                width: 70,
                                height: 70,
                            }}
                        />

                        <Stack>

                            <Typography
                                fontWeight={700}
                            >
                                {product.name}
                            </Typography>

                            <Typography
                                color="text.secondary"
                                fontSize={14}
                            >
                                {product.brand}
                            </Typography>

                            <Typography
                                color="#C6A769"
                                fontWeight={700}
                            >
                                {product.price}ُEGP
                            </Typography>

                        </Stack>

                    </Stack>
                )}

            </DialogContent>

            <DialogActions sx={{ p: 2 }}>

                <Button
                    onClick={onClose}
                    variant="outlined"
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    color="error"
                    onClick={() => onConfirm(product)}
                    disabled={loading}
                >
                    Delete
                </Button>

            </DialogActions>

        </Dialog>
    );
}

export default DeleteDialog;