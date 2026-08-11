import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Grid,
    IconButton,
    Box,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import {
    createAddress,
    updateAddress,
} from "../../features/address/addressSlice";

import { showSnackbar } from "../../features/snackbar/snackbarSlice";

function AddressForm({
    open,
    onClose,
    editingAddress,
}) {
    const dispatch = useDispatch();

    const emptyForm = {
        firstName: "",
        lastName: "",
        phone: "",
        governorate: "",
        city: "",
        address: "",
    };

    const [formData, setFormData] = useState(emptyForm);

    useEffect(() => {
        if (editingAddress) {
            setFormData({
                firstName: editingAddress.firstName || "",
                lastName: editingAddress.lastName || "",
                phone: editingAddress.phone || "",
                governorate: editingAddress.governorate || "",
                city: editingAddress.city || "",
                address: editingAddress.address || "",
            });
        } else {
            setFormData(emptyForm);
        }
    }, [editingAddress]);

    const onChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const {
            firstName,
            lastName,
            phone,
            governorate,
            city,
            address,
        } = formData;

        if (
            !firstName.trim() ||
            !lastName.trim() ||
            !phone.trim() ||
            !governorate.trim() ||
            !city.trim() ||
            !address.trim()
        ) {
            dispatch(
                showSnackbar({
                    severity: "warning",
                    message: "Please fill all fields",
                })
            );

            return;
        }

        if (editingAddress) {
            dispatch(
                updateAddress({
                    id: editingAddress._id,
                    addressData: formData,
                })
            );

            dispatch(
                showSnackbar({
                    severity: "success",
                    message: "Address updated successfully",
                })
            );
        } else {
            dispatch(createAddress(formData));

            dispatch(
                showSnackbar({
                    severity: "success",
                    message: "Address added successfully",
                })
            );
        }

        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            fullScreen={false}
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: {
                            xs: "0px",
                            sm: "20px",
                        },
                        width: {
                            xs: "100%",
                            sm: "100%",
                        },
                        maxHeight: {
                            xs: "100vh",
                            sm: "90vh",
                        },
                        m: {
                            xs: 0,
                            sm: 2,
                        },
                    },
                },
            }}
        >
            <form onSubmit={onSubmit}>
                {/* ================= TITLE ================= */}

                <DialogTitle
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",

                        px: {
                            xs: 2,
                            sm: 3,
                        },

                        py: {
                            xs: 2,
                            sm: 2.5,
                        },

                        fontSize: {
                            xs: 19,
                            sm: 22,
                        },

                        fontWeight: 800,
                    }}
                >
                    {editingAddress
                        ? "Edit Address"
                        : "Add New Address"}

                    <IconButton
                        onClick={onClose}
                        size="small"
                        sx={{
                            color: "#777",

                            "&:hover": {
                                background: "#f5f5f5",
                                color: "#222",
                            },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                {/* ================= CONTENT ================= */}

                <DialogContent
                    sx={{
                        px: {
                            xs: 2,
                            sm: 3,
                        },

                        py: {
                            xs: 1,
                            sm: 2,
                        },
                    }}
                >
                    <Grid
                        container
                        spacing={{
                            xs: 1.5,
                            sm: 2,
                        }}
                        sx={{
                            mt: {
                                xs: 0.5,
                                sm: 1,
                            },
                        }}
                    >
                        <Grid
                            size={{
                                xs: 12,
                                sm: 6,
                            }}
                        >
                            <TextField
                                fullWidth
                                size="small"
                                label="First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={onChange}
                            />
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                sm: 6,
                            }}
                        >
                            <TextField
                                fullWidth
                                size="small"
                                label="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={onChange}
                            />
                        </Grid>

                        <Grid size={12}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Phone Number"
                                name="phone"
                                value={formData.phone}
                                onChange={onChange}
                            />
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                sm: 6,
                            }}
                        >
                            <TextField
                                fullWidth
                                size="small"
                                label="Governorate"
                                name="governorate"
                                value={formData.governorate}
                                onChange={onChange}
                            />
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                sm: 6,
                            }}
                        >
                            <TextField
                                fullWidth
                                size="small"
                                label="City"
                                name="city"
                                value={formData.city}
                                onChange={onChange}
                            />
                        </Grid>

                        <Grid size={12}>
                            <TextField
                                fullWidth
                                size="small"
                                multiline
                                rows={3}
                                label="Address"
                                name="address"
                                value={formData.address}
                                onChange={onChange}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>

                {/* ================= ACTIONS ================= */}

                <DialogActions
                    sx={{
                        px: {
                            xs: 2,
                            sm: 3,
                        },

                        pb: {
                            xs: 2,
                            sm: 3,
                        },

                        pt: 1,

                        gap: 1,
                    }}
                >
                    <Button
                        onClick={onClose}
                        fullWidth
                        variant="outlined"
                        sx={{
                            height: 44,

                            borderRadius: "12px",

                            borderColor: "#ddd",

                            color: "#555",

                            fontWeight: 600,

                            textTransform: "none",

                            "&:hover": {
                                borderColor: "#bbb",
                                background: "#f8f8f8",
                            },
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            height: 44,

                            borderRadius: "12px",

                            background: "#C6A769",

                            color: "#fff",

                            fontWeight: 700,

                            textTransform: "none",

                            boxShadow: "none",

                            "&:hover": {
                                background: "#b08d47",
                                boxShadow: "none",
                            },
                        }}
                    >
                        {editingAddress
                            ? "Save Changes"
                            : "Add Address"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default AddressForm;