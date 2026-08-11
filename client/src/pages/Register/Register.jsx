import { Box } from "@mui/material";
import RegisterForm from "./RegisterForm";

function Register() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                px: {
                    xs: 2,
                    sm: 3,
                },
                py: {
                    xs: 4,
                    md: 5,
                },
                mt: {
                    xs: 10,
                    sm: 8,
                    md: 6,
                },
            }}

        >
            <RegisterForm />
        </Box>
    );
}

export default Register;