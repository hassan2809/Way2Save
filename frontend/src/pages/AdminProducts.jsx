import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ToastContainer, toast } from 'react-toastify';
import AdminNavbar from "../components/AdminNavbar";

const API_URL = "https://way2save.onrender.com/auth/admin/products";

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState(["chicken", "Baby Lamb", "mutton", "beef", "frozen fish", "fresh fishes"]);
    const [newProduct, setNewProduct] = useState({ title: "", price: "", category: "" });
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            // console.log(data)
            const response = await axios.get(API_URL);
            setProducts(response.data);
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

    const handleAddProduct = async () => {
        try {
            const response = await axios.post(`${API_URL}/addProduct`, newProduct);
            setProducts([...products, response.data]);
            setNewProduct({ title: "", price: "", category: "" });
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
                fetchProducts();
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

    const handleUpdateProduct = async () => {
        try {
            const response = await axios.put(`${API_URL}/${editingProduct._id}`, editingProduct);
            setProducts(products.map((p) => (p._id === response.data._id ? response.data : p)));
            setEditingProduct(null);
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
                fetchProducts();
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

    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setProducts(products.filter((p) => p._id !== id));
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
        <div>
            <AdminNavbar/>
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Panel - Products</h1>

            {/* Add Product Dialog */}
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="mb-4">
                        <Plus className="mr-2 h-4 w-4" /> Add Product
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Product</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <Input
                            placeholder="Product Name"
                            value={newProduct.title}
                            onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                        />
                        <select
                            className="border rounded px-3 py-2"
                            value={newProduct.category}
                            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        >
                            <option value="">Select Category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category} className="capitalize">
                                    {category}
                                </option>
                            ))}
                        </select>
                        <Input
                            type="number"
                            placeholder="Price"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        />
                        <Button onClick={handleAddProduct}>Add Product</Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Products Table */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product._id}>
                            <TableCell className='capitalize'>{product.title}</TableCell>
                            <TableCell className='capitalize'>{product.category}</TableCell>
                            <TableCell>£{product.price}</TableCell>
                            <TableCell>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="mr-2"
                                            onClick={() => setEditingProduct(product)}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Edit Product</DialogTitle>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <Input
                                                placeholder="Product Name"
                                                value={editingProduct?.title || ""}
                                                onChange={(e) =>
                                                    setEditingProduct({ ...editingProduct, title: e.target.value })
                                                }
                                            />
                                            <select
                                                className="border rounded px-3 py-2"
                                                value={editingProduct?.category || ""}
                                                onChange={(e) =>
                                                    setEditingProduct({ ...editingProduct, category: e.target.value })
                                                }
                                            >
                                                <option value="">Select Category</option>
                                                {categories.map((category, index) => (
                                                    <option key={index} value={category}>
                                                        {category}
                                                    </option>
                                                ))}
                                            </select>
                                            <Input
                                                type="number"
                                                placeholder="Price"
                                                value={editingProduct?.price || ""}
                                                onChange={(e) =>
                                                    setEditingProduct({ ...editingProduct, price: e.target.value })
                                                }
                                            />
                                            <Button onClick={handleUpdateProduct}>Update Product</Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                                <Button variant="outline" size="icon" onClick={() => handleDeleteProduct(product._id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
        </div>
    );
}

export default AdminProducts