import {
    AppBar,
    Toolbar,
    Box,
    Typography,
    IconButton,
    Avatar,
    Badge,
    Menu,
    MenuItem,
    Divider,
} from "@mui/material";

import {
    NotificationsNone,
    DarkMode,
    LightMode,
    ExpandMore,
    Logout,
    Storefront,
} from "@mui/icons-material";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../../context/ThemeContext";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery } from "@mui/material";

function Topbar({ setMobileOpen, }) {
    const { user } = useSelector((state) => state.auth);

    const { darkMode, toggleTheme } = useThemeContext();
    const isMobile = useMediaQuery("(max-width:900px)");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const logoutHandler = () => {
        dispatch(logout());
        dispatch(reset());
        navigate("/");
    };

    const sidebarWidth = 220;
    return (
        <AppBar
            elevation={0}
            sx={{
                position: "fixed",
                left: isMobile ? 0 : `${sidebarWidth}px`,
                width: isMobile ? "100%" : `calc(100% - 220px)`,
                bgcolor: darkMode
                    ? "rgba(20,20,20,.85)"
                    : "rgba(255,255,255,.85)",
                backdropFilter: "blur(18px)",
                borderBottom: darkMode
                    ? "1px solid rgba(255,255,255,.08)"
                    : "1px solid rgba(0,0,0,.05)",
                color: darkMode ? "#fff" : "#222",
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
            }}
        >
            <Toolbar
                sx={{
                    minHeight: 72,
                    px: { xs: .5, sm: 3 },
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: { xs: 0.3, sm: 2 },
                        height: "100%",
                        minWidth: 0,
                        flexShrink: 0
                    }}
                >
                    {isMobile && (
                        <IconButton
                            onClick={() => setMobileOpen(true)}
                            sx={{
                                mr: 1,
                                color: "var(--text)",
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}

                    <Typography
                        variant="h6"
                        fontWeight={700}
                        sx={{
                            fontSize: { xs: 18, sm: 29 },
                        }}
                    >
                        Dashboard
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        height: "100%",
                    }}
                >
                    {/* Theme */}

                    <IconButton
                        onClick={toggleTheme}
                        sx={{
                            "&:hover": {
                                color: "#C6A769",
                            },

                            "&:hover .themeIcon": {
                                transform: "rotate(18deg)",
                            },
                        }}
                    >
                        {darkMode ? (
                            <LightMode
                                className="themeIcon"
                                sx={{
                                    width: 18,
                                    transition: ".3s",
                                }}
                            />
                        ) : (
                            <DarkMode
                                className="themeIcon"
                                sx={{
                                    width: 18,
                                    transition: ".3s",
                                }}
                            />
                        )}
                    </IconButton>

                    {/* Notifications */}

                    <IconButton
                        sx={{
                            transition: ".3s",
                            "&:hover": {
                                color: "#C6A769",
                                transform: "scale(1.08)",
                            },
                        }}
                    >
                        <Badge
                            badgeContent={0}
                            color="error"
                        >
                            <NotificationsNone sx={{ width: "18px", }} />
                        </Badge>
                    </IconButton>

                    {/* Profile */}

                    <Box
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: { xs: 0, sm: 1.5 },
                            cursor: "pointer",
                            px: { xs: 0.5, sm: 1.5 },
                            py: { xs: 0.5, sm: 0.8 },
                            borderRadius: "14px",
                            transition: ".3s",

                            "&:hover": {
                                background: darkMode
                                    ? "rgba(255,255,255,.06)"
                                    : "#f5f5f5",
                            },
                        }}
                    >
                        <Avatar
                            sx={{
                                m: 1,
                                width: 38,
                                height: 38,
                                bgcolor: "#C6A769",
                                fontWeight: 700,
                                boxShadow: "0 6px 18px rgba(198,167,105,.25)"
                            }}
                        >
                            {user?.name?.charAt(0).toUpperCase()}
                        </Avatar>

                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: 15,
                                whiteSpace: "nowrap",
                            }}
                        >
                            {user?.name}
                        </Typography>

                        <ExpandMore
                            sx={{
                                fontSize: 20,
                                color: "#888",
                                transition: ".3s",
                                transform: open ? "rotate(180deg)" : "rotate(0deg)"
                            }}
                        />
                    </Box>

                    {/* Menu */}

                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={() => setAnchorEl(null)}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        PaperProps={{
                            sx: {
                                mt: 1.8,
                                minWidth: 250,
                                borderRadius: "18px",
                                p: 1,
                                boxShadow:
                                    "0 18px 40px rgba(0,0,0,.12)",
                                overflow: "hidden",
                            },
                        }}
                    >
                        <Box
                            sx={{
                                px: 2,
                                py: 1.5,
                            }}
                        >

                            <Typography
                                sx={{
                                    display: "inline-flex",
                                    px: 1.8,
                                    py: .4,
                                    borderRadius: "999px",
                                    bgcolor: "#FFF4DD",
                                    color: "#C6A769",
                                    fontWeight: 700,
                                    fontSize: 12,
                                }}
                            >
                                {user?.role}
                            </Typography>
                        </Box>

                        <Divider sx={{ my: 1 }} />

                        <MenuItem
                            onClick={() => navigate("/")}
                            sx={{
                                fontSize: "14px",
                                py: 1.4,
                                px: 2,
                                borderRadius: "12px",
                                mx: .5,
                                transition: ".7s",

                                "&:hover": {
                                    bgcolor: "#faf8f2",
                                    color: "black",
                                    transform: "translateX(1px)"
                                },
                            }}
                        >
                            <Storefront
                                sx={{
                                    fontSize: "16px",
                                    mr: 1.5,
                                    color: "#C6A769",
                                }}
                            />

                            Go To Store
                        </MenuItem>

                        <MenuItem
                            onClick={logoutHandler}
                            sx={{
                                py: 1.4,
                                px: 2,
                                borderRadius: "12px",
                                mx: .5,
                                mt: .5,
                                color: "error.main",
                                transition: ".7s",
                                fontSize: "14px",
                                "&:hover": {
                                    bgcolor: "#FFF4F4",
                                    transform: "translateX(1px)"
                                },
                            }}
                        >
                            <Logout sx={{
                                mr: 1.5,
                                fontSize: "16px",
                            }} />

                            Logout
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar >
        </AppBar >
    );
}

export default Topbar;