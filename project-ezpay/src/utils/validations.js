//register form validation
export const validateRegisterForm = (formData) => {
    const errors = {};

    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.phone) errors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(formData.phone)) errors.phone = "Phone must be a 10-digit number";
    if (!formData.password) errors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
    }

    return errors;
};

//login form validation
export const validateLoginForm = (formData) => {
    const errors = {};

    if (!formData.email) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";

    return errors;
};