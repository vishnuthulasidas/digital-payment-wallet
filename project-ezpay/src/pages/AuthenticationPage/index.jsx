import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import   from "../../hooks/ "
import FullLogoWithCaption from "../../assets/full-logo-color-caption.svg";
import LogoBlack from "../../assets/logo-icon-black.svg"
import RegisterCard from "./RegisterCard";
import LoginCard from "./LoginCard";

const AuthPage = () => {
  // check if no token exist else redirect to dashboard
  const token = localStorage.getItem("token");
  if (token) {
    window.location.href = "/dashboard";
  }

  const [searchParams] = useSearchParams();

  const [isSignIn, setIsSignIn] = useState(searchParams.get("q") === "lg");

  const handleToggle = () => {
    setIsSignIn((prev) => !prev);
  };

   ("EzPay | Authentication");

  return (
    <div className={`bg-[#0D1117] ${isSignIn?"min-h-screen":"min-h-[120vh]"} font-aleo relative overflow-hidden`}>
        <img src={FullLogoWithCaption} alt="ezpay-logo" className="m-auto py-10"/>
        <div className="relative m-auto w-[400px]">
        <RegisterCard isSignIn={isSignIn} toggleFn={setIsSignIn} />
        <LoginCard isSignIn={isSignIn} toggleFn={setIsSignIn} />
        </div>
        
        
        <img src={LogoBlack} className="absolute -top-96 -left-96 z-1 opacity-10 w-[1000px]" />
        
        <img src={LogoBlack} className="absolute top-52 -right-72 z-1 opacity-10 w-[800px]" />
    </div>
  );
};

export default AuthPage;
