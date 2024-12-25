import React, { useState } from 'react'
import { Link,NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { CiShoppingCart } from "react-icons/ci"
import Cart from './Cart' // Assuming you have a Cart component
import { useCart } from '../context/CartContext'

const navItems = [
  { name: 'Home', to: '/' },
  { name: 'Beef', to: '/beef' },
  { name: 'Chicken', to: '/chicken' },
  { name: 'Lamb', to: '/lamb' },
  { name: 'Mutton', to: '/mutton' },
  { name: 'Sea Food', to: '/seaFood' },
  // { name: 'About Us', to: '/room-listing' },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLargeCartOpen, setIsLargeCartOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { cart } = useCart()

  return (
    <nav className="">
      <div className="px-4 sm:px-6 lg:px-16">
        <div className="flex justify-between h-16">
          <div className="hidden md:flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold">
                Way2<span className='text-red-500'>Save</span>
              </span>
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8 md:flex justify-center items-center">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                className="text-black inline-flex items-center px-1 pt-1 text-sm font-jost h-10"
                style={({ isActive }) => ({
                  borderBottom: isActive ? '3px solid black' : 'none',
                })}
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Cart Button */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="flex space-x-4">
              <Sheet open={isLargeCartOpen} onOpenChange={setIsLargeCartOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    {/* <CiShoppingCart className="" /> */}
                    <CiShoppingCart style={{ width: '24px', height: '24px' }} />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cart.length}
                    </span>
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[400px] p-0">
                  <Cart />
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="-mr-2 flex items-center sm:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
                >
                  <span className="sr-only">Open main menu</span>
                  {isOpen ? (
                    <X className="block h-6 w-6 focus:outline-none" aria-hidden="true" />
                  ) : (
                    <Menu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:hidden">
                <div className="pt-5 pb-6 px-5">
                  <div className="mt-6">
                    <nav className="grid gap-y-8">
                      {navItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.to}
                          className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                          onClick={() => setIsOpen(false)}
                        >
                          <span className="ml-3 text-base font-medium text-gray-900">
                            {item.name}
                          </span>
                        </Link>
                      ))}
                    </nav>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex md:hidden items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold">
                Way2<span className='text-red-500'>Save</span>
              </span>
            </Link>
          </div>

          <div className="ml-6 flex items-center md:hidden">
            <div className="flex space-x-4">
              <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    {/* <CiShoppingCart className="" /> */}
                    <CiShoppingCart style={{ width: '24px', height: '24px' }} />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cart.length}
                    </span>
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[300px] p-0">
                  <Cart />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
