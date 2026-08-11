import {
    Box,
    Typography,
} from "@mui/material";

import {
    Settings,
    ShoppingBag,
    ShoppingCart,
    Logout,
    LocationOn,
    ChevronRight,
    Dashboard,
} from "@mui/icons-material";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";

function ProfileMenu() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(
        (state) => state.auth
    );
    const logoutHandler = () => {
        dispatch(logout());
        dispatch(reset());
        navigate("/");
    };

    const menuItems = [
        ...(user?.role === "admin"
            ? [
                {
                    title: "Dashboard",
                    icon: <Dashboard />,
                    path: "/admin",
                },
            ]
            : []),

        {
            title: "Account Settings",
            icon: <Settings />,
            path: "/settings",
        },
        {
            title: "My Orders",
            icon: <ShoppingBag />,
            path: "/orders",
        },
        {
            title: "My Addresses",
            icon: <LocationOn />,
            path: "/Addresses",
        },
        {
            title: "Wishlist",
            icon: <FavoriteRoundedIcon />,
            path: "/wishlist",
        },
        {
            title: "Cart",
            icon: <ShoppingCart />,
            path: "/cart",
        },
    ];

    return (
        <Box
            sx={{
                backgroundColor: "#fff",
                borderRadius: "20px",
                overflow: "hidden",
                border: "1px solid #ECECEC",
                boxShadow: "0 8px 25px rgba(0,0,0,.06)",
            }}
        >
            {menuItems.map((item) => (
                <Link
                    key={item.title}
                    to={item.path}
                    style={{
                        background:
                            item.title === "Dashboard"
                                ? "#FFF8EC"
                                : "transparent",
                        textDecoration: "none",
                        color: "inherit",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            px: 2.5,
                            py: 1.9,
                            borderBottom: "1px solid #F3F3F3",
                            transition: ".25s ease",
                            cursor: "pointer",

                            "&:hover": {
                                backgroundColor: "#FAF8F3",
                            },

                            "&:hover .menuArrow": {
                                color: "#C6A769",
                                transform: "translateX(3px)",
                            },

                            "&:hover .menuIcon": {
                                color: "#C6A769",
                            },

                            "&:hover .menuText": {
                                color: "#C6A769",
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            <Box
                                className="menuIcon"
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    color: "#3f3e3e",
                                    transition: ".25s",
                                    "& svg": {
                                        fontSize: 23,
                                    },
                                }}
                            >

                                {item.icon}
                            </Box>
                            <Typography
                                className="menuText"
                                sx={{
                                    fontSize: 15,
                                    fontWeight: 600,
                                    color: "#333",
                                    transition: ".25s",
                                }}
                            >
                                {item.title}
                            </Typography>
                        </Box>
                        <ChevronRight
                            className="menuArrow"
                            sx={{
                                fontSize: 22,
                                color: "#B5B5B5",
                                transition: ".25s",
                            }}
                        />
                    </Box>
                </Link>
            ))}
            <Box
                onClick={logoutHandler}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: 2.5,
                    py: 1.9,
                    cursor: "pointer",
                    transition: ".25s",

                    "&:hover": {
                        backgroundColor: "#FFF5F5",
                    },

                    "&:hover .logoutArrow": {
                        transform: "translateX(3px)",
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                    }}
                >
                    <Logout color="error" />
                    <Typography
                        color="error"
                        fontWeight={700}
                    >
                        Logout
                    </Typography>
                </Box>
                <ChevronRight
                    className="logoutArrow"
                    color="error"
                    sx={{
                        transition: ".3s",
                    }}
                />
            </Box>
        </Box>
    );
}

export default ProfileMenu;