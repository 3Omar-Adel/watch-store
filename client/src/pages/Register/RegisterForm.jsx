import { validateRegister } from "./validation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { showSnackbar } from "../../features/snackbar/snackbarSlice";

import {
    Box,
    Typography,
    TextField,
    Button,
    Divider,
    InputAdornment,
    IconButton,
} from "@mui/material";

import {
    Visibility,
    VisibilityOff,
    Person,
    Email,
    Lock,
} from "@mui/icons-material";

import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const {
        name,
        email,
        password,
        confirmPassword,
    } = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        user,
        isLoading,
        isSuccess,
        isError,
        message,
    } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            dispatch(
                showSnackbar({
                    severity: "error",
                    message,
                })
            );
        }

        if (isSuccess || user) {
            navigate("/");

            dispatch(
                showSnackbar({
                    severity: "success",
                    message: "Account created successfully",
                })
            );
        }

        dispatch(reset());
    }, [
        user,
        isSuccess,
        isError,
        message,
        navigate,
        dispatch,
    ]);

    const onChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (!validateRegister(formData, setErrors)) {
            return;
        }

        dispatch(
            register({
                name,
                email,
                password,
            })
        );
    };

    const inputStyle = {
        "& .MuiOutlinedInput-root": {
            height: 50,
            borderRadius: "14px",
            background: "#FAFAFA",

            "& input": {
                fontSize: "15px",
                padding: "0 14px",
            },

            "& fieldset": {
                borderColor: "#DDD",
            },

            "&:hover fieldset": {
                borderColor: "#C6A769",
            },

            "&.Mui-focused fieldset": {
                borderColor: "#C6A769",
                borderWidth: "2px",
            },

            "& .MuiSvgIcon-root": {
                fontSize: 20,
                color: "#777",
            },
        },

        "& .MuiInputLabel-root": {
            fontSize: "15px",
        },

        "& .MuiInputLabel-shrink": {
            fontSize: "14px",
        },
    };

    return (
        <Box
            component="form"
            onSubmit={onSubmit}
            sx={{
                width: "100%",
                maxWidth: 440,
                background: "#FFF",
                borderRadius: "20px",

                p: {
                    xs: 2.5,
                    sm: 3.5,
                    md: 4,
                },

                boxShadow:
                    "0 10px 35px rgba(0,0,0,.08)",

                border: "1px solid #EFEFEF",
            }}
        >
            {/* Title */}

            <Typography
                sx={{
                    textAlign: "center",
                    fontSize: {
                        xs: 27,
                        sm: 30,
                        md: 32,
                    },
                    fontWeight: 700,
                    color: "#222",
                    lineHeight: 1.3,
                }}
            >
                Create Account
            </Typography>

            {/* Description */}

            <Typography
                sx={{
                    mt: 1,
                    mb: 3.5,
                    textAlign: "center",
                    color: "#777",
                    fontSize: 14,
                    lineHeight: 1.7,
                }}
            >
                Join{" "}
                <Box
                    component="span"
                    sx={{
                        color: "#C6A769",
                        fontWeight: 700,
                        fontSize: 17,
                    }}
                >
                    Thapt Store
                </Box>{" "}
                and discover premium watches crafted for every style.
            </Typography>

            {/* Full Name */}

            <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={name}
                onChange={onChange}
                error={!!errors.name}
                helperText={errors.name}
                margin="normal"
                sx={inputStyle}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <Person />
                            </InputAdornment>
                        ),
                    },
                }}
            />

            {/* Email */}

            <TextField
                fullWidth
                label="Email Address"
                name="email"
                value={email}
                onChange={onChange}
                error={!!errors.email}
                helperText={errors.email}
                margin="normal"
                sx={inputStyle}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <Email />
                            </InputAdornment>
                        ),
                    },
                }}
            />

            {/* Password */}

            <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={onChange}
                label="Password"
                error={!!errors.password}
                helperText={errors.password}
                margin="normal"
                sx={inputStyle}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <Lock />
                            </InputAdornment>
                        ),

                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                    onClick={() =>
                                        setShowPassword(
                                            (prev) => !prev
                                        )
                                    }
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

            {/* Confirm Password */}

            <TextField
                fullWidth
                type={
                    showConfirmPassword
                        ? "text"
                        : "password"
                }
                name="confirmPassword"
                value={confirmPassword}
                onChange={onChange}
                label="Confirm Password"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                margin="normal"
                sx={inputStyle}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <Lock />
                            </InputAdornment>
                        ),

                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            (prev) => !prev
                                        )
                                    }
                                >
                                    {showConfirmPassword ? (
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

            {/* Register Button */}

            <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
                sx={{
                    mt: 3,
                    height: 50,
                    borderRadius: "14px",
                    fontWeight: 700,
                    fontSize: 15,
                    letterSpacing: ".3px",

                    background:
                        "linear-gradient(135deg,#C6A769,#B38B45)",

                    boxShadow:
                        "0 6px 18px rgba(198,167,105,.25)",

                    "&:hover": {
                        background:
                            "linear-gradient(135deg,#B38B45,#9D7435)",
                    },

                    "&:disabled": {
                        background: "#D8CBAE",
                        color: "#FFF",
                    },
                }}
            >
                {isLoading
                    ? "Creating Account..."
                    : "Create Account"}
            </Button>

            {/* Divider */}

            <Divider
                sx={{
                    my: 3,
                    color: "#999",
                    fontSize: 13,
                }}
            >
                OR
            </Divider>

            {/* Google */}

            <Button
                fullWidth
                variant="outlined"
                startIcon={<FcGoogle />}
                sx={{
                    height: 50,
                    borderRadius: "14px",
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: 15,
                    borderColor: "#DDD",
                    color: "#333",

                    "&:hover": {
                        borderColor: "#C6A769",
                        background: "#FAFAFA",
                    },
                }}
            >
                Continue with Google
            </Button>

            {/* Login */}

            <Typography
                sx={{
                    mt: 3,
                    textAlign: "center",
                    color: "#777",
                    fontSize: 14,
                }}
            >
                Already have an account?{" "}

                <Link
                    to="/login"
                    style={{
                        color: "#C6A769",
                        textDecoration: "none",
                        fontWeight: 700,
                    }}
                >
                    Sign In
                </Link>
            </Typography>
        </Box>
    );
}

export default RegisterForm;