import React from "react";
import SelectMeal from './assets/selectMeal.jpg';
import PlaceOrder from './assets/placeOrder.jpg';
import Delivery from './assets/delivery.jpg';

const ProcessSection = () => {
    const steps = [
        {
            number: "1",
            title: "Select Your Meat",
            description: "Browse our range of fresh, high-quality halal meats, including lamb, beef, and chicken, ethically sourced and carefully prepared.",
            image: SelectMeal
        },
        {
            number: "2",
            title: "Place Your Order",
            description: "Choose your preferred cuts and quantities, and place your order online quickly and easily from the comfort of your home.",
            image: PlaceOrder
        },
        {
            number: "3",
            title: "Delivered to Your Door",
            description: "Enjoy fresh, hygienically packed halal meat delivered straight to your doorstep at your convenience.",
            image: Delivery
        }
    ];

    return (
        <div className="pt-16 px-4 md:px-16">
            <h4 className="text-xl text-center text-yellow-500 font-jost">Process</h4>
            <h2 className="text-3xl font-bold text-center mb-4 font-jost">How It Works</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto font-jost">
                From our shop to your kitchen, we ensure the highest standards of halal quality and customer satisfaction.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
                {steps.map((step) => (
                    <div key={step.number} className="text-center">
                        <div className="w-44 h-44 mx-auto mb-6 rounded-lg overflow-hidden bg-gray-200">
                            <img
                                src={step.image}
                                alt={step.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="font-bold mb-3 font-jost">
                            {step.number}. {step.title}
                        </h3>
                        <p className="text-gray-400 font-jost">{step.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProcessSection;
