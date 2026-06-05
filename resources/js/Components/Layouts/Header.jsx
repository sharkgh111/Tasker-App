import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { BsHouse } from "react-icons/bs";
import { BsArchive } from "react-icons/bs";
import { PiCheckSquareOffset } from "react-icons/pi";
import { IoPersonOutline } from "react-icons/io5";
import { GoQuestion } from "react-icons/go";

export default function Header() {
    const { url } = usePage();

    const navItems = [
        { id: 'home', Icon: BsHouse, href: '/home' },
        { id: 'archive', Icon: BsArchive, href: '/archive' }, 
        { id: 'cabinet', Icon: PiCheckSquareOffset, href: '/tasks' }, 
        { id: 'help', Icon: GoQuestion, href: '#' },
        { id: 'user', Icon: IoPersonOutline, href: '#' },
    ];

    return (
        <header className="w-full flex-shrink-0 flex justify-center h-[80px] shadow-xl bg-main_green_dark/10 backdrop-blur-xl rounded-md px-5 mb-4">
            <nav className="group flex flex-1 justify-between items-center">
                <Link href="/home">
                    <img src="images/tasker-2.png" alt="Tasker" className="w-40 cursor-pointer" />
                </Link>

                <section className="w-auto h-full gap-6 flex items-center justify-around">
                    {navItems.map(({ id, Icon, href }) => {
                        const isActive = url === href;

                        return (
                            <Link 
                                key={id}
                                href={href} 
                                className={`transition-all pb-2 relative duration-300 ease-in-out hover:scale-110
                                    ${isActive 
                                        ? 'drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]' 
                                        : 'shadow-none'
                                    }`}
                            >
                                <Icon 
                                    className={`w-8 h-8 cursor-pointer transition-colors duration-300 
                                        ${isActive ? 'text-white' : 'text-main_lightly'}`} 
                                />
                            </Link>
                        );
                    })}
                </section>
            </nav>
        </header>
    );
}