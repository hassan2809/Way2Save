import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom';
import { useCart } from "../context/CartContext";
import { Minus, Plus } from 'lucide-react'
import { MdDeleteForever } from "react-icons/md";

const Cart = () => {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();
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


  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="flex flex-col h-full overflow-auto p-5">
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
              <p className="text-gray-900 font-jost my-2">£{item.price * item.quantity}</p>
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
            {totalCost < 20 && (
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
        <Button className="w-full bg-red-500 hover:bg-red-600 text-white font-jost" onClick={handleCheckout}>Checkout</Button>
        <p className="text-center text-sm text-gray-500 mt-2 font-jost">Payment Processed Securely</p>
      </div>
    </div>
  )
}

export default Cart