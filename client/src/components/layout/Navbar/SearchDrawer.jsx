import { useSelector } from "react-redux";
import { useState } from "react";

import {
    Drawer,
    Box,
    Typography,
    IconButton,
    TextField,
    InputAdornment,
    Divider,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { Link } from "react-router-dom";

function SearchDrawer({ open, onClose }) {
    const { products = [] } = useSelector(
        (state) => state.products
    );

    const [searchTerm, setSearchTerm] = useState("");
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const filteredProducts = products.filter((product) => {
        if (!normalizedSearch) return false;

        const name = product.name?.toLowerCase() || "";
        const brand = product.brand?.toLowerCase() || "";
        const category = product.category?.toLowerCase() || "";
        const description =
            product.description?.toLowerCase() || "";

        return (
            name.includes(normalizedSearch) ||
            brand.includes(normalizedSearch) ||
            category.includes(normalizedSearch) ||
            description.includes(normalizedSearch)
        );
    });

    const recommendedWatches = normalizedSearch
        ? filteredProducts
        : products.slice(0, 5);

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            slotProps={{
                paper: {
                    sx: {
                        width: {
                            xs: 300,
                            sm: 400,
                            md: 460,
                            lg: 500,
                        },
                        overflow: "hidden",
                        boxSizing: "border-box",
                        backgroundColor: "#fff",
                        overflow: "hidden",
                        boxShadow:
                            "-8px 0 35px rgba(0, 0, 0, 0.12)",
                    },
                },
            }}
        >
            <Box
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",

                    p: {
                        xs: 2.5,
                        sm: 3,
                        md: 3.5,
                    },

                    boxSizing: "border-box",
                    minHeight: 0,
                }}
            >
                {/* Header */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 3,
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: {
                                xs: "22px",
                                sm: "24px",
                            },
                            fontWeight: 700,
                            color: "#222",
                            letterSpacing: "0.3px",
                        }}
                    >
                        Find Your Watch
                    </Typography>
                    <IconButton
                        onClick={onClose}
                        aria-label="Close search"
                        sx={{
                            width: 40,
                            height: 40,
                            color: "#333",
                            border: "1px solid #eee",
                            transition: "0.25s",
                            "&:hover": {
                                backgroundColor: "#F5F1E8",
                                color: "#C6A769",
                                borderColor: "#C6A769",
                            },
                        }}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Box>
                {/* Search Input */}
                <TextField
                    fullWidth
                    placeholder="Search for a watch..."
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoComplete="off"
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon
                                        sx={{
                                            color: "#C6A769",
                                        }}
                                    />
                                </InputAdornment>
                            ),
                        },
                    }}

                    sx={{
                        mb: 4,
                        "& .MuiOutlinedInput-root": {
                            height: 42,
                            borderRadius: "10px",
                            backgroundColor: "#FAFAFA",
                            transition: "0.25s",
                            "& fieldset": {
                                borderColor: "#E5E5E5",
                            },
                            "&:hover fieldset": {
                                borderColor: "#C6A769",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#C6A769",
                                borderWidth: "1px",
                            },
                        },
                        "& input": {
                            fontSize: "14px",
                        },
                        "& input::placeholder": {
                            color: "#999",
                            opacity: 1,
                        },
                    }}
                />

                {/* Help Section */}
                <Box sx={{ mb: 2 }}>
                    <Typography
                        sx={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#222",
                            mb: 0.5,
                        }}
                    >
                        {searchTerm
                            ? `Search Results (${filteredProducts.length})`
                            : "Need some help?"}
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: "13px",
                            color: "#888",
                            lineHeight: 1.6,
                        }}
                    >
                        {searchTerm
                            ? "Watches matching your search"
                            : "Explore some of our recommended watches."}
                    </Typography>
                </Box>
                <Divider
                    sx={{
                        mb: 2,
                        borderColor: "#EEEEEE",
                    }}
                />
                {/* Recommended Products */}
                <Box
                    sx={{
                        flex: 1,
                        minHeight: 0,
                        overflowY: "auto",

                        pr: 0.5,

                        "&::-webkit-scrollbar": {
                            width: "5px",
                        },

                        "&::-webkit-scrollbar-track": {
                            background: "transparent",
                        },

                        "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "#C6A769",
                            borderRadius: "10px",
                        },

                        "&::-webkit-scrollbar-thumb:hover": {
                            backgroundColor: "#A98D52",
                        },
                    }}
                >
                    {recommendedWatches.map((watch) => {
                        const image =
                            watch.images?.[0]?.url ||
                            watch.image;

                        return (
                            <Link
                                key={watch._id}
                                to={`/product/${watch._id}`}
                                onClick={onClose}
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 2,
                                        p: 1.2,
                                        mb: 1,
                                        borderRadius: "10px",
                                        transition:
                                            "all 0.25s ease",
                                        "&:hover": {
                                            backgroundColor:
                                                "#F8F6F1",
                                            transform:
                                                "translateX(-3px)",
                                        },
                                    }}
                                >
                                    {/* Product Image */}
                                    <Box
                                        sx={{
                                            width: 65,
                                            height: 65,
                                            flexShrink: 0,
                                            borderRadius: "8px",
                                            overflow: "hidden",
                                            backgroundColor:
                                                "#F5F1E8",
                                        }}
                                    >
                                        {image && (
                                            <Box
                                                component="img"
                                                src={image}
                                                alt={
                                                    watch.name
                                                }
                                                sx={{
                                                    width: "100%",
                                                    height: "100%",

                                                    objectFit:
                                                        "cover",

                                                    display:
                                                        "block",

                                                    transition:
                                                        "0.3s",

                                                    "&:hover": {
                                                        transform:
                                                            "scale(1.05)",
                                                    },
                                                }}
                                            />
                                        )}
                                    </Box>

                                    {/* Product Info */}
                                    <Box
                                        sx={{
                                            flex: 1,
                                            minWidth: 0,
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: "14px",
                                                fontWeight: 600,
                                                color: "#222",
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                mb: 0.5,
                                                maxWidth: {
                                                    xs: "135px",
                                                    sm: "120px",
                                                    md: "200px",
                                                },
                                            }}
                                        >
                                            {watch.name}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontSize: "13px",
                                                fontWeight: 600,

                                                color: "#C6A769",
                                            }}
                                        >
                                            {Number(
                                                watch.price
                                            ).toLocaleString()}{" "}
                                            EGP
                                        </Typography>
                                    </Box>
                                    {/* Arrow */}
                                    <ArrowForwardIosIcon
                                        sx={{
                                            fontSize: 13,
                                            color: "#aaa",
                                        }}
                                    />
                                </Box>
                            </Link>
                        );
                    })}
                </Box>
                {/* Empty State */}
                {recommendedWatches.length === 0 && (
                    <Box
                        sx={{
                            textAlign: "center",
                            py: 5,
                        }}
                    >
                        <Typography
                            sx={{
                                color: "#888",
                                fontSize: "14px",
                            }}
                        >
                            No watches available.
                        </Typography>
                    </Box>
                )}
            </Box>
        </Drawer>
    );
}

export default SearchDrawer;