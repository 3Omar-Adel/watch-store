export const validateRegister = (
    formData,
    setErrors
) => {

    const {
        name,
        email,
        password,
        confirmPassword,
    } = formData;

    const errors = {};

    if (!name.trim()) {
        errors.name = "Name is required";
    }

    if (!email.trim()) {
        errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = "Enter a valid email";
    }

    if (!password) {
        errors.password = "Password is required";
    } else if (password.length < 6) {
        errors.password =
            "Password must be at least 6 characters";
    }

    if (confirmPassword !== password) {
        errors.confirmPassword =
            "Passwords do not match";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
};