import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { getTheme } from "./theme";
import { useThemeContext } from "../context/ThemeContext";

function AppTheme({ children }) {
    const { darkMode } = useThemeContext();

    return (
        <ThemeProvider theme={getTheme(darkMode)}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}

export default AppTheme;