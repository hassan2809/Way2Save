import React,{useEffect} from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Beef from './assets/beef.png';
import Chicken from './assets/chicken.png';
import SeaFood from './assets/fishes.png';
import Goat from './assets/goat.png';
import Lamb from './assets/lamb.png';
import axios from "axios";

const Categories = () => {
    const categories = [
        {
            title: "Beef",
            image: Beef,
            url : '/beef'
        },
        {
            title: "Chicken",
            image: Chicken,
            url : '/chicken'
        },
        {
            title: "Lamb",
            image: Lamb,
            url : '/lamb'
        },
        {
            title: "Mutton",
            image: Goat,
            url : '/mutton'
        },
        {
            title: "Sea Food",
            image: SeaFood,
            url : '/seaFood'
        },
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://way2save.onrender.com/auth/products/fresh fishes');
                console.log('response')                
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <section id="target-section" className="pt-16 px-4 md:px-16">
            <h4 className="text-xl text-center text-yellow-500 font-jost">Categories</h4>
            <h2 className="text-3xl font-bold text-center mb-2 font-jost">Popular Categories</h2>
            <p className="text-gray-600 text-center mb-12 font-jost">
                Browse our most popular halal meat categories and find your favorite cuts.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-20 mb-8">
                {categories.map((category, index) => (
                    <Link to={category.url} key={index} className="relative group cursor-pointer w-20 lg:w-32 h-20 lg:h-32 mx-auto">
                        <div className="rounded-lg aspect-square overflow-hidden">
                            <img
                                src={category.image}
                                alt={category.title}
                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                        </div>
                        <h3 className="text-center font-medium mt-4 font-jost">{category.title}</h3>
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default Categories