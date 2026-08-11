export const validateLogin = (formData, setErrors) => {

    const errors = {};

    if (!formData.email.trim()) {
        errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "Enter a valid email";
    }

    if (!formData.password) {
        errors.password = "Password is required";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
};