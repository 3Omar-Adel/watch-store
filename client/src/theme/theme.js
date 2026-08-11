import { createTheme } from "@mui/material/styles";

export const getTheme = (darkMode) =>
    createTheme({
        palette: {
            mode: darkMode ? "dark" : "light",

            primary: {
                main: "#C6A769",
            },

            secondary: {
                main: "#8B6A35",
            },

            background: {
                default: darkMode
                    ? "#121212"
                    : "#F7F7F7",

                paper: darkMode
                    ? "#1E1E1E"
                    : "#FFFFFF",
            },

            text: {
                primary: darkMode
                    ? "#FFFFFF"
                    : "#222222",

                secondary: darkMode
                    ? "#B0B0B0"
                    : "#666666",
            },
        },

        shape: {
            borderRadius: 18,
        },

        typography: {
            fontFamily: "Inter, sans-serif",

            h4: {
                fontWeight: 700,
            },

            h5: {
                fontWeight: 700,
            },

            button: {
                textTransform: "none",
                fontWeight: 600,
            },
        },

        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 14,
                    },
                },
            },

            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: 20,
                    },
                },
            },

            MuiPaper: {
                styleOverrides: {
                    root: {
                        borderRadius: 20,
                    },
                },
            },
        },
    });