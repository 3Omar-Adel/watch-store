import {
    Card,
    CardContent,
    Typography,
    Button,
    Box,
    Stack,
} from "@mui/material";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch } from "react-redux";

import {
    deleteAddress,
    setDefaultAddress,
} from "../../features/address/addressSlice";

import { showSnackbar } from "../../features/snackbar/snackbarSlice";

function AddressCard({
    address,
    onEdit,
    checkout = false,
}) {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteAddress(address._id));

        dispatch(
            showSnackbar({
                severity: "success",
                message: "Address deleted successfully",
            })
        );
    };

    const infoStyle = {
        display: "flex",
        alignItems: "flex-start",
        gap: 1,
        fontSize: {
            xs: 13,
            sm: 14,
            md: 15,
        },
        mt: {
            xs: 1,
            md: 1.5,
        },
        px: {
            xs: 1.2,
            sm: 1.5,
            md: 2,
        },
        py: {
            xs: 1,
            md: 1.3,
        },
        borderRadius: "12px",
        bgcolor: "#fafafa",
        border: "1px solid #ececec",
        lineHeight: 1.6,
        wordBreak: "break-word",
    };

    return (
        <Card
            sx={{
                height: "100%",
                borderRadius: {
                    xs: "16px",
                    sm: "18px",
                    md: "22px",
                },
                border: "1px solid #eeeeee",
                boxShadow:
                    "0 10px 30px rgba(0,0,0,.06)",
                transition: ".3s",
                overflow: "hidden",
                "&:hover": {
                    transform: checkout
                        ? "none"
                        : {
                            xs: "none",
                            md: "translateY(-5px)",
                        },
                    boxShadow:
                        "0 16px 35px rgba(0,0,0,.10)",
                },
            }}
        >
           {/* DEFAULT  */}

            {!checkout && (
                <Box
                    sx={{
                        px: {
                            xs: 2,
                            sm: 2.5,
                            md: 3,
                        },
                        pt: {
                            xs: 2,
                            md: 2.5,
                        },
                    }}
                >
                    {address.isDefault ? (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                minHeight: 40,
                                borderRadius: "12px",
                                background:
                                    "#8b7549",
                                color: "#fff",
                                fontSize: {
                                    xs: 12,
                                    sm: 13,
                                    md: 14,
                                },
                                fontWeight: 700,
                            }}
                        >
                            ✓ Default Address
                        </Box>
                    ) : (
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() =>
                                dispatch(
                                    setDefaultAddress(
                                        address._id
                                    )
                                )
                            }
                            sx={{
                                minHeight: 40,
                                borderRadius: "12px",
                                color: "#C6A769",
                                borderColor:
                                    "#C6A769",
                                fontSize: {
                                    xs: 12,
                                    sm: 13,
                                    md: 14,
                                },
                                fontWeight: 700,
                                textTransform: "none",
                                "&:hover": {
                                    borderColor:
                                        "#b08d47",
                                    background:
                                        "#faf6ed",
                                },
                            }}
                        >
                            Set as Default
                        </Button>
                    )}
                </Box>
            )}
            {/* CONTENT */}
            <CardContent
                sx={{
                    p: {
                        xs: 1.8,
                        sm: 2.5,
                        md: 3,
                    },

                    pt: {
                        xs: 2,
                        sm: 2.5,
                        md: 3,
                    },
                }}
            >
                {/* Name */}
                <Typography
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.8,

                        fontSize: {
                            xs: 16,
                            sm: 17,
                            md: 19,
                        },
                        fontWeight: 800,
                        color: "var(--text)",
                        mb: 1,
                    }}
                >
                    <PersonIcon
                        sx={{
                            fontSize: {
                                xs: 19,
                                md: 21,
                            },

                            color: "#C6A769",
                        }}
                    />

                    {address.firstName}{" "}
                    {address.lastName}
                </Typography>

                {/* Phone */}

                <Box
                    sx={{
                        ...infoStyle,
                    }}
                >
                    <PhoneOutlinedIcon
                        sx={{
                            fontSize: 18,
                            color: "#C6A769",
                            mt: "2px",
                            flexShrink: 0,
                        }}
                    />

                    <Typography
                        component="span"
                        sx={{
                            fontSize: "inherit",
                            color: "#555",
                        }}
                    >
                        {address.phone}
                    </Typography>
                </Box>

                {/* Location */}

                <Box
                    sx={{
                        ...infoStyle,
                    }}
                >
                    <LocationOnOutlinedIcon
                        sx={{
                            fontSize: 19,
                            color: "#C6A769",
                            mt: "1px",
                            flexShrink: 0,
                        }}
                    />

                    <Typography
                        component="span"
                        sx={{
                            fontSize: "inherit",
                            color: "#555",
                        }}
                    >
                        {address.governorate} -{" "}
                        {address.city}
                    </Typography>
                </Box>

                {/* Address */}
                <Box
                    sx={{
                        ...infoStyle,

                        minHeight: {
                            xs: 75,
                            sm: 85,
                        },

                        alignItems: "flex-start",
                    }}
                >
                    <LocationOnOutlinedIcon
                        sx={{
                            fontSize: 19,
                            color: "#C6A769",
                            mt: "2px",
                            flexShrink: 0,
                        }}
                    />

                    <Typography
                        component="span"
                        sx={{
                            fontSize: "inherit",
                            color: "#666",
                            lineHeight: 1.7,
                        }}
                    >
                        {address.address}
                    </Typography>
                </Box>

                {/* ================= ACTIONS ================= */}

                {!checkout && (
                    <Stack
                        direction="row"
                        spacing={{
                            xs: 1,
                            sm: 1.5,
                        }}
                        sx={{
                            mt: {
                                xs: 2,
                                md: 2.5,
                            },
                        }}
                    >
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={() =>
                                onEdit(address)
                            }
                            sx={{
                                height: {
                                    xs: 40,
                                    sm: 44,
                                },
                                borderRadius: "12px",
                                borderColor:
                                    "#C6A769",
                                color: "#C6A769",
                                fontSize: {
                                    xs: 12,
                                    sm: 13,
                                    md: 14,
                                },
                                fontWeight: 700,
                                textTransform: "none",
                                "&:hover": {
                                    background:
                                        "#faf6ed",

                                    borderColor:
                                        "#b08d47",
                                },
                            }}
                        >
                            Edit
                        </Button>
                        <Button
                            fullWidth
                            color="error"
                            variant="contained"
                            onClick={handleDelete}
                            sx={{
                                height: {
                                    xs: 40,
                                    sm: 44,
                                },
                                borderRadius: "12px",
                                fontSize: {
                                    xs: 12,
                                    sm: 13,
                                    md: 14,
                                },
                                fontWeight: 700,
                                textTransform: "none",
                                boxShadow: "none",
                                "&:hover": {
                                    boxShadow: "none",
                                },
                            }}
                        >
                            Delete
                        </Button>
                    </Stack>
                )}
            </CardContent>
        </Card>
    );
}

export default AddressCard;