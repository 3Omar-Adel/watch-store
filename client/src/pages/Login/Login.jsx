import { Box } from "@mui/material";
import LoginForm from "./LoginForm";

function Login() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                px: 2,

                mt: {
                    xs: 9,
                    md: 9,
                },
                pb: 6,
            }}
        >
            <LoginForm />
        </Box>
    );
}

export default Login;