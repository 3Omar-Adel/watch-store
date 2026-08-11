import {
    Box,
    Button,
    Typography,
    Divider,
    Drawer,
    useMediaQuery,
} from "@mui/material";

import {
    Dashboard,
    Storefront,
    Inventory2,
    Star,
    ShoppingCart,
    People,
} from "@mui/icons-material";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";

import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useThemeContext } from "../../context/ThemeContext";

function Sidebar({ mobileOpen, setMobileOpen }) {
    const { darkMode } = useThemeContext();
    const isMobile = useMediaQuery("(max-width:900px)");

    const [activeSection, setActiveSection] =
        useState("dashboard");

    const sidebarItems = [
        {
            label: "Dashboard",
            icon: <Dashboard />,
            id: "dashboard",
        },
        {
            label: "Best Seller",
            icon: <Star />,
            id: "bestSeller",
        },
        {
            label: "Overview",
            icon: <DonutLargeIcon />,
            id: "overview",
        },
        {
            label: "Products",
            icon: <Inventory2 />,
            id: "products",
        },
        {
            label: "Orders",
            icon: <ShoppingCart />,
            id: "orders",
        },
        {
            label: "Users",
            icon: <People />,
            id: "users",
        },
    ];

    const scrollToSection = (id) => {
        const element = document.getElementById(id);

        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });

            setActiveSection(id);
        }
    };

    useEffect(() => {
        const sections =
            document.querySelectorAll("section[id]");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                threshold: 0.45,
            }
        );

        sections.forEach((section) =>
            observer.observe(section)
        );

        return () => observer.disconnect();
    }, []);

    const sidebarButtonStyle = {
        justifyContent: "flex-start",
        py: 1.7,
        px: 2.2,
        borderRadius: "10px",
        textTransform: "none",
        fontSize: 13,
        fontWeight: 600,
        transition: ".3s",
    };

    const sidebarContent = (
        <Box
            sx={{
                width: 220,
                height: "100%",
                bgcolor: darkMode ? "#171717" : "#fff",
                borderRight: darkMode
                    ? "1px solid rgba(255,255,255,.08)"
                    : "1px solid #eee",
                display: "flex",
                flexDirection: "column",
                p: 1,
            }}
        >

            {/* Logo */}

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 2,
                }}
            >
                <Storefront
                    sx={{
                        color: "#C6A769",
                        fontSize: 28,
                        mt: 1,
                    }}
                />

                <Box>
                    <Typography
                        sx={{
                            color: "#C6A769",
                            fontSize: 21,
                            mt: 1,
                            fontWeight: 800,
                        }}
                    >
                        WATCH
                    </Typography>


                </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Go Store */}

            <NavLink
                to="/"
                style={{
                    textDecoration: "none",
                }}
            >
                <Button
                    fullWidth
                    startIcon={<Storefront />}
                    sx={{
                        ...sidebarButtonStyle,
                        color: darkMode
                            ? "#ddd"
                            : "#555",

                        "&:hover": {
                            bgcolor: darkMode
                                ? "rgba(255,255,255,.05)"
                                : "#f8f8f8",

                            transform:
                                "translateX(6px)",
                        },
                    }}
                >
                    Go To Store
                </Button>
            </NavLink>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    mt: 2,
                }}
            >
                {sidebarItems.map((item) => {
                    const active =
                        activeSection === item.id;

                    return (
                        <Button
                            key={item.id}
                            fullWidth
                            startIcon={item.icon}
                            onClick={() => {
                                scrollToSection(item.id);

                                if (isMobile) {
                                    setMobileOpen(false);
                                }
                            }}
                            sx={{
                                ...sidebarButtonStyle,

                                color: active
                                    ? "#fff"
                                    : darkMode
                                        ? "#ddd"
                                        : "#555",

                                bgcolor: active
                                    ? "#C6A769"
                                    : "transparent",

                                "& .MuiButton-startIcon":
                                {
                                    transition:
                                        ".3s",
                                },

                                "&:hover": {
                                    bgcolor: active
                                        ? "#B89452"
                                        : darkMode
                                            ? "rgba(255,255,255,.05)"
                                            : "#f8f8f8",

                                    transform:
                                        "translateX(4px)",

                                    "& .MuiButton-startIcon":
                                    {
                                        color: "#C6A769",
                                        transform:
                                            "scale(1.1)",
                                    },
                                },
                            }}
                        >
                            {item.label}
                        </Button>
                    );
                })}
            </Box>
        </Box>
    );

    if (isMobile) {
        return (
            <Drawer
                anchor="left"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                {sidebarContent}
            </Drawer>
        );
    }

    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                bottom: 0,
                width: 220,
                zIndex: 1100,
            }}
        >
            {sidebarContent}
        </Box>
    );
}

export default Sidebar;