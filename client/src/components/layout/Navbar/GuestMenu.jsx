import { useState } from "react";
import { Link } from "react-router-dom";
import {
    Menu,
    MenuItem,
    Divider,
    Typography,
    Box,
} from "@mui/material";
import { FaRegUser } from "react-icons/fa6";

function GuestMenu() {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <button
                className="iconBtn"
                onClick={handleOpen}
            >
                <FaRegUser />
            </button>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                slotProps={{
                    paper: {
                        sx: {
                            px: 1,
                            py: 1,
                            mt: 1,
                            width: 250,
                            borderRadius: "20px",
                            overflow: "hidden",
                            boxShadow:
                                "0 20px 45px rgba(0,0,0,.18)",
                            border: "1px solid #eee",
                            backgroundColor: "#333333",
                            color: "white",

                            "& .MuiMenuItem-root": {
                                py: 1,
                                px: 2,
                                fontSize: 14,
                                fontWeight: 600,
                            },
                        },
                    },
                }}
            >
                <Box
                    sx={{
                        textAlign: "center",
                        py: 1,
                        backgroundColor: "#302f2f",
                        color: "white",
                    }}
                >
                    <FaRegUser size={20} />

                    <Typography
                        fontWeight={600}
                        mt={1}
                    >
                        Welcome
                    </Typography>

                    <Typography
                        fontSize={11}
                        sx={{ opacity: 0.85 }}
                    >
                        Sign in to your account
                    </Typography>
                </Box>

                <MenuItem
                    component={Link}
                    to="/login"
                    onClick={handleClose}
                >
                    Login
                </MenuItem>

                <Divider />

                <MenuItem
                    component={Link}
                    to="/register"
                    onClick={handleClose}
                >
                    Register
                </MenuItem>
            </Menu>
        </>
    );
}

export default GuestMenu;