import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-[#FFE3E5] pt-16 pb-8 px-4 md:px-16">
            <div className="container mx-auto px-4">
                {/* Changed the grid layout to be more symmetric */}
                <div className="grid grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
                    {/* Shop Column - 2 columns wide */}
                    <div className="lg:col-span-2">
                        <h3 className="text-gray-800 font-medium mb-4 font-jost">Shop</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/beef" className="text-gray-400 hover:text-gray-500 text-sm font-jost">
                                    Beef
                                </Link>
                            </li>
                            <li>
                                <Link to="/chicken" className="text-gray-400 hover:text-gray-500 text-sm font-jost">
                                    Chicken
                                </Link>
                            </li>
                            <li>
                                <Link to="/lamb" className="text-gray-400 hover:text-gray-500 text-sm font-jost">
                                    Lamb
                                </Link>
                            </li>
                            <li>
                                <Link to="/mutton" className="text-gray-400 hover:text-gray-500 text-sm font-jost">
                                    Mutton
                                </Link>
                            </li>
                            <li>
                                <Link to="/seaFood" className="text-gray-400 hover:text-gray-500 text-sm font-jost">
                                    Sea Food
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* About Us Column - 2 columns wide */}
                    <div className="lg:col-span-2">
                        <h3 className="text-gray-800 font-medium mb-4 font-jost">About Us</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-400 hover:text-gray-500 text-sm font-jost">Who We Are</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-gray-500 text-sm font-jost">Our Achievement</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-gray-500 text-sm font-jost">Our Service</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-gray-500 text-sm font-jost">Testimonials</a></li>
                        </ul>
                    </div>

                    {/* Logo and Subscribe Column - 4 columns wide for better centering */}
                    <div className="col-span-2 lg:col-span-4">
                        <div className="text-center mb-6">
                            <h2 className="text-xl font-bold">Way2<span className="text-red-500">Save</span></h2>
                            <p className="text-sm text-gray-400">A Trusted Meat Shop</p>
                        </div>
                        <div className="max-w-xs mx-auto">
                            <input
                                type="email"
                                placeholder="Your Email Adress"
                                className="w-full px-4 py-2 mb-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                            <button className="w-full px-4 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-800 transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>

                    {/* Contact Column - 2 columns wide */}
                    <div className="lg:col-span-2">
                        <h3 className="text-gray-800 font-medium mb-4 font-jost">Contact</h3>
                        <ul className="space-y-3">
                            <li><a href="mailto:waysavebutchers@gmail.com" className="text-gray-400 hover:text-gray-500 text-sm font-jost">waysavebutchers@gmail.com</a></li>
                            {/* <li><a href="#" className="text-gray-400 hover:text-gray-500 text-sm font-jost">Opening Hour</a></li> */}
                            <li className="text-gray-400 hover:text-gray-500 text-sm font-jost">149 Far Gosford St, Coventry CV1 5DU, United Kingdom.</li>
                            <li><a href="tel:097 56568 77" className="text-gray-400 hover:text-gray-500 text-sm font-jost">07572356843</a></li>
                        </ul>
                    </div>

                    {/* Social Links Column - 2 columns wide */}
                    <div className="lg:col-span-2">
                        <h3 className="text-gray-800 font-medium mb-4 font-jost">Social Links</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-400 hover:text-gray-500 text-sm font-jost">Facebook Page</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-gray-500 text-sm font-jost">Instagram</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-gray-500 text-sm font-jost">Twitter</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-gray-500 text-sm font-jost">Pinterest</a></li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center text-gray-500 text-sm border-gray-200 pt-8 font-jost">
                    CopyRight 2021 Alright reserved by Way2Save Halal Butchers
                </div>
            </div>
        </footer>
    )
}

export default Footer

