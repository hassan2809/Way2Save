import React, { useState, useEffect } from "react";
import { Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from './Navbar';
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import AdminNavbar from "./AdminNavbar";

const EditProfile = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm();
    // let initials;
    const [initials, setInitials] = useState("");
    const currentPassword=watch("currentPassword")

    const fetchUserDetails = async () => {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://way2save.onrender.com/auth/fetchUserDetails", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setValue("name", response.data.name);
        setValue("email", response.data.email);
        setInitials(response.data.name.slice(0, 2))
        // console.log(initials)
    }

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const onSubmit = async (data) => {
        try {

            const token = localStorage.getItem("token");
            const response = await axios.post("https://way2save.onrender.com/auth/updateUserDetails", data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log(response)
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
                localStorage.removeItem('name')
                localStorage.setItem('name',data.name)
            }
            else {
                // console.log("eroorororo")
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
        // console.log(data)
    }
    return (
        <div>
            <div className='bg-blue-900'>
                <AdminNavbar />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="max-w-2xl mx-auto p-6">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-2xl font-semibold">Edit profile</h1>
                        <Avatar className="h-12 w-12">
                            <AvatarImage src="/placeholder-user.jpg" alt="Profile" />
                            <AvatarFallback className="uppercase">{initials}</AvatarFallback>
                        </Avatar>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-1">
                            <div className="space-y-2">
                                <label className="text-sm font-medium" htmlFor="firstName">
                                    Name
                                </label>
                                <Input id="firstName" {...register("name", {
                                    required: "Name is required",
                                    minLength: {
                                        value: 3,
                                        message: "Name must be at least 3 characters long",
                                    },
                                })} />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="email">
                                Email
                            </label>
                            <div className="relative">
                                <Input id="email" type="email" disabled
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Enter a valid email address",
                                        },
                                    })} />
                                {/* <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" /> */}
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="currentPassword">
                                Current Password
                            </label>
                            <div className="relative">
                                <Input id="currentPassword" type={showPassword ? "text" : "password"}
                                    {...register("currentPassword", {
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters long",
                                        },
                                    })} />
                                <span className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                    onClick={() => setShowPassword((prev) => !prev)}>
                                    {showPassword ? <FaEyeSlash /> : <IoEyeSharp />}
                                </span>
                                {/* <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" /> */}
                            </div>
                            {errors.currentPassword && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.currentPassword.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="confirmPassword">
                                New Password
                            </label>
                            <div className="relative">
                                <Input
                                    id="newPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    {...register("newPassword", {
                                        required: currentPassword ? "New Password is required." : false,
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters long",
                                        },
                                    })}
                                />
                                <span
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <IoEyeSharp />}
                                </span>
                            </div>
                            {errors.newPassword && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.newPassword.message}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-start gap-4 pt-4">
                            {/* <Button variant="outline" type="button">
                            Cancel
                        </Button> */}
                            <Button className="bg-[#E31244] text-white">
                                Update
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;