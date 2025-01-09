import { useState, useEffect } from "react";
import axios from "axios";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ToastContainer, toast } from 'react-toastify';

const API_URL = "https://way2save.onrender.com/auth/admin/orders";
// const API_URL = "http://localhost:8000/auth/admin/orders";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            // console.log(data)
            const response = await axios.get(API_URL);
            setOrders(response.data);
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
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Panel - Orders</h1>

            {/* Orders Table */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Cart Items</TableHead>
                        <TableHead>Payment Method</TableHead>
                        <TableHead>Total Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order._id}>
                            <TableCell className='capitalize'>{order.name}</TableCell>
                            <TableCell>{order.email}</TableCell>
                            <TableCell>{order.address}</TableCell>
                            <TableCell>
                                <ul>
                                    {order.cart.map((item, index) => (
                                        <li key={index} className="capitalize">
                                            {item.title} ({item.quantity} Kg) - £{item.price * item.quantity}
                                        </li>
                                    ))}
                                </ul>
                            </TableCell>
                            <TableCell className='capitalize'>{order.paymentMethod}</TableCell>
                            <TableCell>£{order.totalCost}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default AdminOrders