import React from 'react'
import { useState, useEffect } from 'react'
// import Image from 'next/image'
import { LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { RxAvatar } from "react-icons/rx";
import { UserPen } from 'lucide-react';
import { useNavigate } from 'react-router-dom'

const UserMenu = ({ onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const storedUserName = localStorage.getItem("name");
        setUserName(storedUserName || "");
        const storedUserEmail = localStorage.getItem("email");
        setUserEmail(storedUserEmail || "");
    }, []);


    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        {/* <AvatarImage src={<RxAvatar />} alt={username} /> */}
                        <AvatarFallback><RxAvatar /> </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mt-2" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{userName}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {userEmail}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className=" cursor-pointer" onClick={() => navigate("/edit-profile")}>
                    <UserPen className="mr-2 h-4 w-4" />
                    <span>Edit Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className=" cursor-pointer" onClick={onLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );

}

export default UserMenu