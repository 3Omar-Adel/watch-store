import {
    Box,
    Typography,
    TextField,
    InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

function OrdersToolbar({
    search,
    setSearch,
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
                Orders
            </Typography>

            <TextField
                placeholder="Search by Order ID or Customer..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                size="small"
                sx={{
                    width: {
                        xs: "100%",
                        sm: 300,
                        md: 380,
                    },
                }}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    },
                }}
            />

        </Box>

    );
}

export default OrdersToolbar;