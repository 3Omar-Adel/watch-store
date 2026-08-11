import {
    Box,
    Typography,
    Button,
    TextField,
    InputAdornment,
} from "@mui/material";

import {
    Add,
    Search,
} from "@mui/icons-material";

function ProductsToolbar({
    search,
    setSearch,
    onAdd,
}) {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
                mt: 3,
                gap: 2,
                flexWrap: "wrap",
            }}
        >
            <Typography
                variant="h4"
                fontWeight={700}
            >
                Products
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    flexWrap: "wrap",
                    width: {
                        xs: "100%",
                        md: "auto",
                    },
                    justifyContent: {
                        xs: "space-between",
                        md: "flex-start",
                    },
                }}
            >
                <TextField
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products..."
                    size="small"
                    sx={{
                        width: {
                            xs: "100%",
                            sm: 300,
                            md: 380,
                        },
                        flex: 1,
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search fontSize="small" />
                                </InputAdornment>
                            ),
                        },
                    }}
                />

                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={onAdd}
                    sx={{
                        bgcolor: "#C6A769",
                        px: 3,
                        borderRadius: 3,
                        "&:hover": {
                            bgcolor: "#B89556",
                        },
                    }}
                >
                    Add Product
                </Button>
            </Box>
        </Box>
    );
}

export default ProductsToolbar;