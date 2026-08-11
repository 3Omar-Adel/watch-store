import Search from "./Search";
import Filter from "./Filter";

import { Box } from "@mui/material";


function SearchFilter({
    products = [],
    onApplyFilters,
    search = "",
    onSearchChange,
}) {
    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: {
                    xs: 1,
                    sm: 2,
                    md: 3,
                },

                my: {
                    xs: 4,
                    md: 6,
                },

                px: {
                    xs: 1.5,
                    sm: 2,
                    md: 3,
                },

                flexWrap: "nowrap",
            }}
        >
            <Box
                sx={{
                    flexShrink: 0,
                    ml: {
                        xs: 1,
                        sm: 0,
                        md: 4,
                    },
                }}
            >
                <Filter
                    products={products}
                    onApply={onApplyFilters}
                />
            </Box>

            <Box
                sx={{
                    width: {
                        xs: "auto",
                        sm: 300,
                        md: 400,
                        lg: 500,
                    },

                    flex: {
                        xs: 1,
                        sm: "0 1 300px",
                        md: "0 1 400px",
                        lg: "0 1 500px",
                    },

                    minWidth: 0,
                }}
            >
                <Search
                    value={search}
                    onChange={onSearchChange}
                />
            </Box>

        </Box>
    );
}


export default SearchFilter;