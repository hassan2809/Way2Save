import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Minus, Plus } from 'lucide-react'
import axios from "axios";
import Footer from '../components/Footer'
import { useCart } from "../context/CartContext";
import Beef1 from '../components/assets/beef_1.jpg';
import Beef2 from '../components/assets/beef_2.jpg';
import { animateScroll as scroll } from 'react-scroll';

const Beef = () => {
    const [products, setProducts] = useState([]);
    const { cart, dispatch } = useCart();
    const [selectedProducts, setSelectedProducts] = useState(cart.map(item => item._id));

    useEffect(() => {
        scroll.scrollToTop();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://way2save.onrender.com/auth/products/beef');
                const productsWithQuantity = response.data.map(product => ({
                    ...product,
                    quantity: 1
                }));

                const updatedProducts = productsWithQuantity.map(product => {
                    const cartItem = cart.find(item => item._id === product._id);
                    return cartItem ? { ...product, quantity: cartItem.quantity } : product;
                });

                setProducts(updatedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [cart]);


    const toggleSelection = (product) => {
        if (selectedProducts.includes(product._id)) {
            setSelectedProducts((prevSelected) =>
                prevSelected.filter((id) => id !== product._id)
            );
            dispatch({ type: "REMOVE_FROM_CART", payload: product._id });
        } else {
            setSelectedProducts((prevSelected) => [...prevSelected, product._id]);
            dispatch({
                type: "ADD_TO_CART",
                payload: { ...product, quantity: product.quantity, image_url: product.image_url },
            });
        }
    };


    const incrementQuantity = (id) => {
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product._id === id
                    ? { ...product, quantity: product.quantity + 1 }
                    : product
            )
        );

        if (selectedProducts.includes(id)) {
            const updatedProduct = products.find(product => product._id === id);
            dispatch({
                type: "UPDATE_QUANTITY",
                payload: { _id: id, quantity: updatedProduct.quantity + 1 }
            });
        }
    };

    const decrementQuantity = (id) => {
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product._id === id && product.quantity > 1
                    ? { ...product, quantity: product.quantity - 1 }
                    : product
            )
        );

        if (selectedProducts.includes(id)) {
            const updatedProduct = products.find(product => product._id === id);
            if (updatedProduct.quantity > 1) {
                dispatch({
                    type: "UPDATE_QUANTITY",
                    payload: { _id: id, quantity: updatedProduct.quantity - 1 }
                });
            }
        }
    };

    useEffect(() => {
        setSelectedProducts(cart.map(item => item._id));
    }, [cart]);


    return (
        <div>
            <Navbar />
            <div className="relative w-full min-h-[500px] bg-[#FFE3E5]">
                <div className="container mx-auto px-4 py-16 flex flex-col lg:flex-row items-center gap-8">
                    <div className="relative w-full lg:w-1/2 h-[300px] lg:h-[400px] ml-8 md:ml-14 xl:ml-0">
                        <div className="absolute top-0 left-0 w-[80%] h-full rounded-3xl transform -rotate-6">
                            <img src={Beef2} className="h-full w-full object-cover rounded-3xl" alt="" />
                        </div>
                        <div className="absolute top-0 left-[10%] w-[80%] h-full rounded-3xl transform rotate-6">
                            <img src={Beef1} className="h-full w-full object-cover rounded-3xl" alt="" />
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
                        <h1 className="text-4xl lg:text-5xl font-bold text-navy-900 leading-tight font-jost">
                            Premium Halal Beef Cuts
                        </h1>
                        <p className="text-lg text-gray-600 max-w-lg font-jost">
                            Our beef is sourced from trusted halal-certified farms, ensuring the highest standards of quality and ethical practices. From tender steaks to flavorful roasts, every cut is carefully selected and prepared to bring you the best halal beef for your table.
                        </p>
                    </div>
                </div>
            </div>

            <div className='container mx-auto px-6 xl:p-0 my-10'>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>
                    {products.map((product) => (
                        <Card key={product._id} className="max-w-[300px] overflow-hidden border-0 border-white shadow-none">
                            <div className='h-[200px] bg-gray-100 rounded-t-lg'>
                                <img src={`https://way2save.onrender.com/uploads/${product.image_url}.jpg`} className="h-full w-full object-cover" alt="" />
                            </div>
                            <CardContent className="p-4 shadow-none">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-semibold font-jost capitalize h-20 md:h-20 lg:h-14 xl:h-0">{product.title}</h3>
                                    <span className="text-xl font-semibold font-jost">
                                        £{product.price * (cart.find(item => item._id === product._id)?.quantity || product.quantity)}
                                    </span>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-1">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-6 w-6 rounded-full border-gray-300"
                                            onClick={() => decrementQuantity(product._id)}
                                        >
                                            <Minus className="h-5 w-5" />
                                        </Button>
                                        <span className="mx-2 text-center font-medium font-jost">
                                            {cart.find(item => item._id === product._id)?.quantity || product.quantity} Kg
                                        </span>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-6 w-6 rounded-full border-gray-300"
                                            onClick={() => incrementQuantity(product._id)}
                                        >
                                            <Plus className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="p-4 pt-0 flex gap-2">
                                <Button
                                    className={`flex-1 ${selectedProducts.includes(product._id)
                                        ? "bg-black"
                                        : "bg-[#E31244] hover:bg-[#E31244]"
                                        } font-jost`}
                                    onClick={() => toggleSelection(product)}
                                >
                                    {selectedProducts.includes(product._id) ? "Remove from Cart" : "Add to Cart"}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Beef;
