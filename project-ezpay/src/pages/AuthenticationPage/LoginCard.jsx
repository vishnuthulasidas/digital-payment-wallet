import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from "../../components/Button/Button";

import { validateLoginForm } from '../../utils/validations';
import { authService } from '../../api';


const LoginCard = ({ isSignIn, toggleFn }) => {

    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const formData = Object.fromEntries(data.entries());
        
        const validationErrors = validateLoginForm(formData);
        setError(validationErrors.email || validationErrors.password);

        if (Object.keys(validationErrors).length > 0) return;
        
        // Call the login API
        try{
            const response = await authService.loginUser(formData);
            if(response.token){
                navigate('/dashboard');
            }
        }
        catch(err){
            setError(err.response.data.msg);
        }
        //clear form
        e.target.reset();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={`bg-white m-auto w-[400px] p-10 flex flex-col items-center rounded-lg gap-5 
                absolute transition-all duration-1000 ease-in-out 
                ${isSignIn ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}
            `}>
                <div className="self-start text-gray-500 cursor-pointer" onClick={() => navigate("/")}>🔙 Go back</div>
                <div className="text-3xl font-bold self-start">Sign In</div>

                <div className="flex flex-col text-lg w-full gap-2">
                    <label htmlFor="email" className="flex flex-col">
                        Email:
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="border border-[#0D1117] px-2 py-1"
                            placeholder="vishnu@me.com"
                        />
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
                    </label>
                </div>

                {/* Error Message */}
                {error && <div className="text-red-500 text-sm">{error}</div>}

                <span>
                    <Button type="submit" text="Login" />
                </span>

                <a href="" className="text-lg">Forgot Password?</a>
                <div className="text-lg cursor-pointer" onClick={() => { toggleFn(false) }}>
                    Create an Account? Sign Up
                </div>
            </div>
        </form>
    );
}

export default LoginCard;
