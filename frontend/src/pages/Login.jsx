import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cities from "../components/assets/cities.jpg";
import LoginImage from "../components/assets/adminPanel.jpg";
import { FcGoogle } from "react-icons/fc";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ForgotPassword from "../components/ForgotPassword";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // console.log(data)
      const response = await axios.post("https://way2save.onrender.com/auth/login", data);
      if (response.data.success) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        localStorage.setItem("token", response.data.jwtToken);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("email", response.data.email);
        navigate("/admin/products");
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Side: Sign-In Form */}
      <div className="flex flex-col justify-center text-center h-screen w-full md:w-1/2 bg-gray-100 px-8 md:px-20 lg:px-40">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#E31244] font-jost">Way2Save Admin Panel</h1>
        </div>

        {/* Sign-in Form */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-600 mt-2 mb-10">Login into your account</p>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <Input
                id="email"
                type="email"
                placeholder="Email"
                className={`bg-white ${errors.password ? "border-red-500" : ""}`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-1">
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={`bg-white ${errors.password ? "border-red-500" : ""}`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                />
                <span 
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <IoEyeSharp />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-end mb-6">
              {/* <ForgotPassword  /> */}
            </div>

            <Button type="submit" className="w-full">
              Log In
            </Button>
          </form>

          {/* Sign Up Link */}
          {/* <p className="text-center text-gray-600 text-sm mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-green-500 font-medium hover:underline">
              Sign up!
            </Link>
          </p> */}
        </div>
      </div>

      {/* Right Side: Image and Text */}
      <div className="hidden md:flex w-full md:w-1/2">
        <img
          src={LoginImage}
          alt="Background"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default Login;

