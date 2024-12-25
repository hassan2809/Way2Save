import React from "react";
import { Button } from "@/components/ui/button";
// import Image from './assets/home.jpg';
import Image from './assets/2.jpg';
import { Link } from 'react-scroll';

const HeroSection = () => {
  return (
    <div className="flex flex-col-reverse items-center justify-between px-4 py-16 bg-[#FFE3E5] md:px-16 lg:flex-row">
      {/* Text Content */}
      <div className="lg:w-1/2">
        <p className="text-md font-medium text-gray-600 mb-4 font-jost mt-5 md:mt-0">FRESH MEAT SINCE 1997</p>
        <h1 className="text-7xl font-bold text-navy-900 font-jost mb-4">
          Get fresh meat at your doorstep
        </h1>
        <p className="text-gray-600 mb-8 font-jost">
          Discover premium, hand-picked halal meat from trusted sources. We bring fresh cuts directly to you, ensuring quality, taste, and ethical sourcing.
          Order now and enjoy the convenience of doorstep delivery, with meat you can trust.
        </p>
        <Link
          to="target-section"
          smooth={true}
          duration={500}
        >
          <Button
            size="lg"
            className='rounded-3xl bg-[#E31244] hover:bg-[#E31244]'
          >
            See Our Collection
            <span className="ml-2">→</span>
          </Button>
        </Link>
      </div>

      {/* Image */}
      <div className="h-96 w-full lg:w-1/2 lg:pl-8">
        <img
          src={Image}
          alt="Fresh meat display"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default HeroSection;
