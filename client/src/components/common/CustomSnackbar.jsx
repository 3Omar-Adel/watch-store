import { Snackbar, Alert } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { hideSnackbar } from "../../features/snackbar/snackbarSlice";

function CustomSnackbar() {
    const dispatch = useDispatch();

    const colors = {
        success: "#C6A769",
        error: "#d32f2f",
        warning: "#f57c00",
        info: "#333333",
    };

    const {
        open,
        severity,
        message,
    } = useSelector(
        (state) => state.snackbar
    );
    
    const handleClose = () => {
        dispatch(hideSnackbar());
    };
    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{
                vertical: "top",
                horizontal: "center",
            }}
            sx={{
                mt: "80px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Alert
                onClose={handleClose}
                variant="filled"
                severity={severity}
                sx={{
                    width: {
                        xs: "92%",
                        sm: 450,
                        md: 520,
                    },
                    borderRadius: "18px",
                    fontSize: "16px",
                    fontWeight: 600,
                    py: 1,
                    backgroundColor: colors[severity],
                    color: "#fff",
                    boxShadow:
                        "0 12px 35px rgba(0,0,0,.18)",
                }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}

export default CustomSnackbar;