import React, { useState } from 'react';
import Button from "../../components/Button/Button";
import { useNavigate } from 'react-router-dom';
import { authService } from '../../api';

import { validateRegisterForm } from '../../utils/validations';

const RegisterCard = ({ isSignIn, toggleFn }) => {

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const formData = Object.fromEntries(data.entries());

        const validationErrors = validateRegisterForm(formData);
        setErrors(validationErrors);
        // If there are validation errors, do not proceed
        if (Object.keys(validationErrors).length > 0) return;

        try {
            // Send form data to the backend using registerUser from services
            const response = await authService.registerUser(formData);
            if (response) {
                window.location.href = "/auth?q=lg";
            }
        } catch (err) {
            setErrors({ ...errors, server: err.response.data.msg });
        }

        // Clear the form
        e.target.reset();
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <div className={`bg-white m-auto w-[400px] p-10 flex flex-col items-center rounded-lg gap-5 mb-20
            absolute transition-all duration-1000 ease-in-out ${!isSignIn
                    ? "translate-x-0 opacity-100"
                    : "translate-x-full opacity-0"
                }
        `}>
                <div className='self-start text-gray-500 cursor-pointer' onClick={() => navigate("/")}>🔙 Go back</div>
                <div className="text-3xl font-bold self-start">Sign Up</div>
                <div className="flex flex-col text-lg w-full gap-2">
                    {errors.server && <span className="text-red-500">{errors.server}</span>}
                    <label htmlFor="name" className="flex flex-col">
                        Name:
                        <input
                            id="name"
                            name="name"
                            type="text"
                            className="border border-[#0D1117] px-2 py-1"
                            placeholder="vishnu"
                        />
                        {errors.name && <span className="text-red-500">{errors.name}</span>}
                    </label>
                    <label htmlFor="email" className="flex flex-col">
                        Email:
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="border border-[#0D1117] px-2 py-1"
                            placeholder="vishnu@me.com"
                        />
                        {errors.email && <span className="text-red-500">{errors.email}</span>}
                    </label>
                    <label htmlFor="phone" className="flex flex-col">
                        Phone:
                        <input
                            id="phone"
                            name="phone"
                            type="text"
                            className="border border-[#0D1117] px-2 py-1"
                            placeholder="1234567890"
                        />
                        {errors.phone && <span className="text-red-500">{errors.phone}</span>}
                    </label>
                    <label htmlFor="password" className="flex flex-col">
                        Password:
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="border border-[#0D1117] px-2 py-1"
                            placeholder="#$%^&*"
                        />
                        {errors.password && <span className="text-red-500">{errors.password}</span>}
                    </label>
                    <label htmlFor="confirm-password" className="flex flex-col">
                        Confirm Password:
                        <input
                            id="confirm-password"
                            name="confirmPassword"
                            type="password"
                            className="border border-[#0D1117] px-2 py-1"
                            placeholder="#$%^&*"
                        />
                        {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword}</span>}
                    </label>
                    <Button type="submit" text="Register" />
                </div>
                <div className="text-lg cursor-pointer" onClick={() => { toggleFn(true) }}>Already have an account? Sign In</div>
            </div>
        </form>
    );
}

export default RegisterCard;
