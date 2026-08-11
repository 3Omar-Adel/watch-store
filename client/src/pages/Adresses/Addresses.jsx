import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Button,
    Grid,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { fetchAddresses } from "../../features/address/addressSlice";

import AddressForm from "./AddressForm";
import AddressCard from "./AddressCard";
import EmptyAddresses from "./EmptyAddresses";

function Addresses() {
    const dispatch = useDispatch();

    const {
        addresses,
        isLoading,
    } = useSelector(
        (state) => state.address
    );

    const [openForm, setOpenForm] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);

    useEffect(() => {
        dispatch(fetchAddresses());
    }, [dispatch]);

    const handleAddAddress = () => {
        setEditingAddress(null);
        setOpenForm(true);
    };

    const handleEditAddress = (address) => {
        setEditingAddress(address);
        setOpenForm(true);
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setEditingAddress(null);
    };

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: "1300px",
                mx: "auto",

                mt: {
                    xs: 10,
                    sm: 12,
                    md: 15,
                },

                px: {
                    xs: 1.5,
                    sm: 2.5,
                    md: 4,
                },

                // Important because the mobile navbar
                // is fixed at the bottom
                pb: {
                    xs: 14,
                    sm: 8,
                    md: 5,
                },
            }}
        >
            {/* ================= HEADER ================= */}

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: {
                        xs: "stretch",
                        sm: "center",
                    },

                    gap: 2,

                    mb: {
                        xs: 3,
                        sm: 4,
                        md: 5,
                    },

                    flexDirection: {
                        xs: "column",
                        sm: "row",
                    },
                }}
            >
                <Box>
                    <Typography
                        sx={{
                            fontSize: {
                                xs: 24,
                                sm: 28,
                                md: 32,
                            },

                            fontWeight: 800,
                            color: "var(--text)",

                            lineHeight: 1.2,
                        }}
                    >
                        My Addresses
                    </Typography>

                    <Typography
                        sx={{
                            mt: 0.8,

                            fontSize: {
                                xs: 13,
                                sm: 14,
                                md: 15,
                            },

                            color: "text.secondary",
                        }}
                    >
                        Manage your delivery addresses
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    onClick={handleAddAddress}
                    sx={{
                        background: "#C6A769",
                        color: "#fff",

                        borderRadius: "14px",

                        px: {
                            xs: 2,
                            sm: 3,
                            md: 4,
                        },

                        py: {
                            xs: 1.3,
                            sm: 1.4,
                            md: 1.6,
                        },

                        minWidth: {
                            xs: "100%",
                            sm: 190,
                            md: 220,
                        },

                        fontSize: {
                            xs: 14,
                            sm: 15,
                            md: 16,
                        },

                        fontWeight: 700,

                        textTransform: "none",

                        boxShadow: "none",

                        "&:hover": {
                            background: "#b08d47",
                            boxShadow: "none",
                        },
                    }}
                >
                    + Add Address
                </Button>
            </Box>

            {/* ================= ADDRESSES ================= */}

            {isLoading ? (
                <Grid
                    container
                    spacing={{
                        xs: 2,
                        sm: 2.5,
                        md: 3,
                    }}
                >
                    {[1, 2, 3].map((item) => (
                        <Grid
                            key={item}
                            size={{
                                xs: 12,
                                md: 6,
                            }}
                        >
                            <Box
                                sx={{
                                    height: 300,
                                    borderRadius: "20px",
                                    background: "#f5f5f5",
                                    animation:
                                        "pulse 1.5s ease-in-out infinite",

                                    "@keyframes pulse": {
                                        "0%": {
                                            opacity: 0.6,
                                        },
                                        "50%": {
                                            opacity: 1,
                                        },
                                        "100%": {
                                            opacity: 0.6,
                                        },
                                    },
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            ) : addresses.length === 0 ? (
                <EmptyAddresses />
            ) : (
                <Grid
                    container
                    spacing={{
                        xs: 2,
                        sm: 2.5,
                        md: 3,
                    }}
                >
                    {addresses.map((address) => (
                        <Grid
                            key={address._id}
                            size={{
                                xs: 12,
                                md: 6,
                            }}
                        >
                            <AddressCard
                                address={address}
                                onEdit={handleEditAddress}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* ================= FORM ================= */}

            <AddressForm
                open={openForm}
                onClose={handleCloseForm}
                editingAddress={editingAddress}
            />
        </Box>
    );
}

export default Addresses;