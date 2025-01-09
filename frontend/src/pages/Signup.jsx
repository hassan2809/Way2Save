import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cities from '../components/assets/cities.jpg';
import SignupImage from '../components/assets/adminPanel.jpg';
import { FcGoogle } from "react-icons/fc";
import { FaFacebookSquare } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";


const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // console.log(data)
      const response = await axios.post("https://way2save.onrender.com/auth/signup", data);
      // console.log("Response:", response.data);
      // alert("Signup successful!");

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

        navigate("/login");
      }
    } catch (error) {
      // console.error("Error:", error.response?.data || error.message);
      // alert("Signup failed.");
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
      {/* Left Side: Image Section */}
      <div className="hidden md:flex w-full md:w-1/2">
        <img
          src={SignupImage}
          alt="Background"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right Side: Sign-Up Form */}
      <div className="flex flex-col justify-center text-center h-screen w-full md:w-1/2 bg-gray-100 px-8 md:px-20">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-green-600">TripMate</h1>
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Get Started With MAKER</h2>
        <p className="text-gray-600 mt-2 mb-5">Getting started is easy</p>

        {/* Social Buttons */}
        {/* <div className="mt-6 flex gap-4">
          <button className="flex items-center justify-center border border-gray-300 px-4 py-2 rounded-lg w-1/2 hover:bg-gray-200 transition">
            <FcGoogle className="h-5 w-5 mr-2" />
            Google
          </button>
          <button className="flex items-center justify-center border border-gray-300 px-4 py-2 rounded-lg w-1/2 hover:bg-gray-200 transition">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
              alt="Facebook"
              className="h-5 w-5 mr-2"
            />
            Facebook
          </button>
        </div> */}

        {/* Divider */}
        {/* <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-500">Or continue with</span>
          <hr className="flex-grow border-gray-300" />
        </div> */}


        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              {...register("fullName", { required: "Full name is required" })}
              type="text"
              placeholder="Full Name"
              className={`w-full px-4 py-2 border ${errors.fullName ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 ${errors.fullName ? "focus:ring-red-500" : "focus:ring-green-500"
                }`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
            )}
          </div>

          <div className="mb-4">
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              type="email"
              placeholder="Enter Email"
              className={`w-full px-4 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 ${errors.email ? "focus:ring-red-500" : "focus:ring-green-500"
                }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <div className="relative">
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`w-full px-4 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 ${errors.password ? "focus:ring-red-500" : "focus:ring-green-500"
                  }`}
              />
              <span className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <FaEyeSlash /> : <IoEyeSharp />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="mb-6">
            <div className="relative">
            <input
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className={`w-full px-4 py-2 border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 ${errors.confirmPassword ? "focus:ring-red-500" : "focus:ring-green-500"
                }`}
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              onClick={() => setShowConfirmPassword((prev) => !prev)}>
              {showConfirmPassword ? <FaEyeSlash /> : <IoEyeSharp />}
            </span>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
          >
            Create Account
          </button>
        </form>
        {/* Terms & Sign In Link */}
        {/* <p className="text-center text-gray-600 text-sm mt-6">
          By continuing you indicate that you read and agreed to the{" "}
          <a href="#" className="text-green-500 font-medium hover:underline">
            Terms of Use
          </a>
        </p> */}
        <p className="text-center text-gray-600 text-sm mt-5">
          Have an account?{" "}
          <Link to="/login" className="text-green-500 font-medium hover:underline">
            Sign in!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
