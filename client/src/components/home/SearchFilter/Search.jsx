import { useState } from "react";

import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

import {
    Box,
    IconButton,
    TextField,
} from "@mui/material";


function Search({ value, onChange }) {

    return (
        <Box
            sx={{
                width: {
                    xs: "100%",
                    sm: "auto",
                    md: "500px",
                },

                flex: {
                    xs: "1 1 100%",
                    sm: "1 1 auto",
                    md: "0 1 500px",
                },

                minWidth: {
                    xs: "100%",
                    sm: "260px",
                    md: "400px",
                },

                display: "flex",

                justifyContent: "center",
            }}
        >

            <TextField
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search products..."
                variant="outlined"
                size="small"
                fullWidth

                sx={{
                    backgroundColor: "#fff",

                    "& .MuiOutlinedInput-root": {
                        borderRadius: "999px",

                        height: {
                            xs: 40,
                            sm: 44,
                            md: 48,
                        },

                        paddingRight: "6px",

                        transition: "0.25s",

                        "& fieldset": {
                            borderColor: "#d4d2ce",
                        },

                        "&:hover fieldset": {
                            borderColor: "#9b9995",
                        },

                        "&.Mui-focused fieldset": {
                            borderColor: "#C6A769",
                            borderWidth: "1.5px",
                        },

                        "&.Mui-focused": {
                            boxShadow:
                                "0 0 0 3px rgba(198, 167, 105, 0.12)",
                        },
                    },

                    "& .MuiInputBase-input": {
                        fontSize: {
                            xs: 13,
                            sm: 14,
                            md: 15,
                        },

                        padding: {
                            xs: "8px 4px",
                            sm: "10px 6px",
                            md: "10px 8px",
                        },
                    },

                    "& .MuiInputBase-input::placeholder": {
                        color: "#999",
                        opacity: 1,
                    },
                }}

                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon
                                    sx={{
                                        color: "#777",

                                        fontSize: {
                                            xs: 19,
                                            sm: 21,
                                            md: 22,
                                        },
                                    }}
                                />
                            </InputAdornment>
                        ),

                        endAdornment: value && (
                            <InputAdornment position="end">
                                <IconButton
                                    size="small"
                                    onClick={() => onChange("")}
                                    sx={{
                                        color: "#999",

                                        "&:hover": {
                                            color: "#C6A769",
                                            background: "transparent",
                                        },
                                    }}
                                >
                                    <ClearIcon fontSize="small" />
                                </IconButton>
                            </InputAdornment>
                        ),
                    },
                }}
            />

        </Box>
    );
}


export default Search;