import { validateLogin } from "./validation";
import {
    Box,
    Typography,
    TextField,
    Button,
    Divider,
    InputAdornment,
    IconButton,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../../features/auth/authSlice";
import { useEffect, useState } from "react";
import { showSnackbar } from "../../features/snackbar/snackbarSlice";

import {
    Email,
    Lock,
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";

import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

function LoginForm() {

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        user,
        isLoading,
        isSuccess,
        isError,
        message,
    } = useSelector((state) => state.auth);
    const [errors, setErrors] = useState({});
    // 
    const location = useLocation();
    const from = location.state?.from || "/";
    // 
    useEffect(() => {

        if (isError) {
            dispatch(
                showSnackbar({
                    severity: "error",
                    message,
                })
            )
            dispatch(reset());
        }
        if (isSuccess || user) {
            dispatch(
                showSnackbar({
                    severity: "success",
                    message: `Welcome back ${user?.name}!`,
                })
            );
            navigate(from, { replace: true });
            dispatch(reset());
        }
    }, [
        user,
        isSuccess,
        isError,
        message,
        navigate,
        dispatch,
        from,
    ]);

    const onChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

    };
    const onSubmit = (e) => {
        e.preventDefault();
        if (!validateLogin(formData, setErrors)) {
            return;
        }
        dispatch(
            login({
                email,
                password,
            })
        );
    };

    const inputStyle = {
        "& .MuiOutlinedInput-root": {
            height: 48,
            borderRadius: "14px",
            background: "#fafafa",

            "& input": {
                fontSize: "15px",
                padding: "0 14px",
            },

            "& fieldset": {
                borderColor: "#ddd",
            },

            "&:hover fieldset": {
                borderColor: "#C6A769",
            },

            "&.Mui-focused fieldset": {
                borderColor: "#C6A769",
                borderWidth: "2px",
            },
        },

        "& .MuiInputLabel-root": {
            fontSize: "15px",
            top: "-1px",
        },

        "& .MuiInputLabel-shrink": {
            fontSize: "14px",
        },
    };

    return (
        <Box
            component="form"
            onSubmit={onSubmit}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 460,
                    background: "#fff",
                    borderRadius: "20px",
                    p: {
                        xs: 3,
                        sm: 4,
                        md: 4.5
                    },
                    boxShadow: "0 20px 60px rgba(0,0,0,.12)",
                }}
            >
                <Typography
                    sx={{
                        textAlign: "center",
                        fontSize: {
                            xs: 26,
                            md: 32
                        },
                        fontWeight: 700,
                        color: "#222",
                    }}
                >
                    Welcome Back <Lock sx={{ fontSize: 28 }} />
                </Typography>

                <Typography
                    sx={{
                        mt: 1,
                        mb: 3.5,
                        fontSize: 15,
                        lineHeight: 1.7,
                        textAlign: "center",
                        color: "#777",
                    }}
                >
                    Sign in to{" "}
                    <Box
                        component="span"
                        sx={{
                            color: "#C6A769",
                            fontWeight: 700,
                            fontSize: 18,
                        }}
                    >
                        Thapt Store
                    </Box>{" "}
                    and continue shopping.
                </Typography>

                <TextField
                    fullWidth
                    label="Email Address"
                    margin="normal"
                    name="email"
                    error={!!errors.email}
                    helperText={errors.email}
                    value={email}
                    onChange={onChange}
                    sx={inputStyle}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Email />
                            </InputAdornment>
                        ),
                    }}
                />

                <TextField
                    fullWidth
                    name="password"
                    value={password}
                    onChange={onChange}
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    error={!!errors.password}
                    helperText={errors.password}
                    margin="normal"
                    sx={inputStyle}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock sx={{ fontSize: 22 }} />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        edge="end"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />

                <Box
                    sx={{
                        textAlign: "right",
                        mt: 1,
                    }}
                >
                    <Link
                        to="/forgot-password"
                        style={{
                            color: "#C6A769",
                            textDecoration: "none",
                            fontWeight: 600,
                        }}
                    >
                        Forgot Password?
                    </Link>
                </Box>

                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    sx={{
                        mt: 4,
                        height: 50,
                        fontSize: 15,
                        borderRadius: "14px",
                        fontWeight: 700,
                        background: "#C6A769",

                        "&:hover": {
                            background: "#b08d52",
                        },
                    }}
                >
                    {isLoading ? "Loading..." : "Sign In"}
                </Button>

                <Divider
                    sx={{
                        my: 3,
                        fontSize: 13,
                    }}>
                    OR
                </Divider>

                <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<FcGoogle />}
                    sx={{
                        borderRadius: "16px",
                        textTransform: "none",
                        fontWeight: 600,
                        borderColor: "#ddd",
                        color: "#222",
                        height: 50,
                        borderRadius: "14px",
                        fontSize: 15,

                        "&:hover": {
                            borderColor: "#C6A769",
                            background: "#fafafa",
                        },
                    }}
                >
                    Continue with Google
                </Button>

                <Typography
                    sx={{
                        mt: 2,
                        textAlign: "center",
                        color: "#777",
                        fontSize: "14px",
                    }}
                >
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        style={{
                            color: "#C6A769",
                            textDecoration: "none",
                            fontWeight: 700,
                        }}
                    >
                        Create Account
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
}

export default LoginForm;