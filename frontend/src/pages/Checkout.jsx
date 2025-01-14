import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Navbar from '../components/Navbar'
import { useCart } from "../context/CartContext";
import { Minus, Plus } from 'lucide-react'
import { MdDeleteForever } from "react-icons/md";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'

const Checkout = () => {
    const { cart, dispatch } = useCart();
    const [selectedProducts, setSelectedProducts] = useState([]);

    const updateQuantity = (id, quantity) => {
        dispatch({ type: "UPDATE_QUANTITY", payload: { _id: id, quantity } });
        if (selectedProducts.includes(id)) {
            setSelectedProducts(prevSelected =>
                prevSelected.map(productId =>
                    productId === id ? id : productId
                )
            );
        }
    };

    const removeFromCart = (id) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: id });
        setSelectedProducts(prevSelected => prevSelected.filter(productId => productId !== id));
    };

    const calculateTotal = () => {
        const totalProduct = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
        const shippingCost = parseFloat(totalProduct) < 20 && cart.length !== 0 ? 2.99 : 0;
        const totalCost = (parseFloat(totalProduct) + shippingCost).toFixed(2);

        return {
            totalProduct: parseFloat(totalProduct),
            shippingCost,
            totalCost: parseFloat(totalCost)
        };
    };

    const { totalProduct, shippingCost, totalCost } = calculateTotal();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const orderData = {
                ...data,
                cart,
                totalCost,
            };
            // console.log(orderData);
            const response = await axios.post("https://way2save.onrender.com/auth/order", orderData);
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

                reset();

                dispatch({ type: "CLEAR_CART" });
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
        <div>
            <Navbar />
            <div className='container mx-auto'>
                <div className="flex flex-col-reverse md:flex-row gap-8 p-5">
                    <div className="flex-1">
                        <h2 className="text-2xl font-semibold mb-6 font-jost">Checkout</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" name="name"
                                    {...register("name", {
                                        required: "Name is required",
                                    })} />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email"
                                    {...register("email", {
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Enter a valid email address",
                                        },
                                    })} />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="number">Contact Number</Label>
                                <Input id="number" name="number"
                                    {...register("number", {
                                        required: "Contact Number is required",
                                    })} />
                                {errors.number && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.number.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="address">Delivery Address</Label>
                                <Input id="address" name="address"
                                    {...register("address", {
                                        required: "Address is required",
                                    })} />
                                {errors.address && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.address.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <Label>Payment Method</Label>
                                <div className="space-y-2 mt-2">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            id="cash"
                                            value="cash"
                                            {...register("paymentMethod", { required: "Please select a payment method" })}
                                            className="appearance-none rounded-full w-5 h-5 border border-gray-400 checked:bg-black checked:border-black"
                                        />
                                        <Label htmlFor="cash">Cash on Delivery</Label>
                                    </div>
                                    <div className="flex items-center space-x-2 space-y-2">
                                        <input
                                            type="radio"
                                            id="card"
                                            value="card"
                                            {...register("paymentMethod", { required: "Please select a payment method" })}
                                            className="appearance-none rounded-full w-5 h-5 border border-gray-400 checked:bg-black checked:border-black"
                                        />
                                        <Label htmlFor="card">Payment By Card</Label>
                                    </div>
                                    <div className="flex items-center space-x-2 space-y-2">
                                        <input
                                            type="radio"
                                            id="bank_transfer"
                                            value="bank_transfer"
                                            {...register("paymentMethod", { required: "Please select a payment method" })}
                                            className="appearance-none rounded-full w-5 h-5 border border-gray-400 checked:bg-black checked:border-white"
                                        />
                                        <Label htmlFor="bank_transfer">Payment Through Bank Transfer</Label>
                                    </div>
                                </div>
                                {errors.paymentMethod && (
                                    <p className="text-red-500 text-sm mt-1">{errors.paymentMethod.message}</p>
                                )}
                            </div>

                            <div className="relative group">
                                <Button
                                    type="submit"
                                    className={`w-full bg-red-500 hover:bg-red-600 text-white font-jost ${cart.length === 0 ? "cursor-not-allowed" : ""
                                        }`}
                                    disabled={cart.length === 0 || isSubmitting}
                                >
                                    {isSubmitting ? "Placing Order..." : "Place Order"}
                                </Button>
                                {cart.length === 0 && (
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black text-white text-sm rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                        Please select products first
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                    <div className="flex-1 flex-col h-full overflow-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold font-jost">Your basket</h2>
                        </div>

                        <div className="space-y-4 mb-8">
                            {cart.map((item, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <div className="w-20 h-20 bg-gray-100 rounded" >
                                        <img src={`https://way2save.onrender.com/uploads/${item.image_url}.jpg`} alt={item.title} className="h-full w-full" />
                                    </div>
                                    <div className="flex-1">
                                        <div className='flex justify-between'>
                                            <h3 className="font-medium font-jost capitalize">{item.title}</h3>
                                            <button onClick={() => removeFromCart(item._id)}>
                                                <MdDeleteForever className="w-6 h-6 text-red-500" />
                                            </button>
                                        </div>
                                        <p className="text-gray-900 font-jost my-2">£ {item.price * item.quantity}</p>
                                        <div className="flex items-center gap-1">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-6 w-6 rounded-full border-gray-300"
                                                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                            >
                                                <Minus className="h-5 w-5" />
                                            </Button>
                                            <span className="mx-2 text-center font-medium font-jost">
                                                {item.quantity} Kg
                                            </span>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-6 w-6 rounded-full border-gray-300"
                                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                            >
                                                <Plus className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-auto">
                            <h3 className="text-lg font-semibold mb-4 font-jost">Order Summary</h3>
                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between">
                                    <span className="font-jost">Total Product ({cart.length})</span>
                                    <span className="font-jost">£{totalProduct}</span>
                                </div>
                                <div>
                                    <div className="flex justify-between">
                                        <span className="font-jost">Delivery Charges</span>
                                        <span className="font-jost">£{shippingCost}</span>
                                    </div>
                                    {totalProduct < 20 && (
                                        <div className='text-xs text-red-600'>
                                            <span className=''>* </span>
                                            <span>
                                                Delivery fees of £2.99 apply for orders under £20. Orders £20 and above enjoy free delivery.
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-between font-semibold text-lg">
                                    <span className="font-jost">Total Cost</span>
                                    <span className="font-jost">£{totalCost}</span>
                                </div>
                            </div>
                            <p className="text-center text-sm text-gray-500 mt-2 font-jost">Payment Processed Securely</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Checkout