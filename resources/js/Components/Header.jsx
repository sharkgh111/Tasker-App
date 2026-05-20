import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { House, Archive, CircleUser, CircleQuestionMark, User } from 'lucide-react';

export default function Header() {
    const { url } = usePage();

    const navItems = [
        { id: 'home', Icon: House, href: '/home' },
        { id: 'archive', Icon: Archive, href: '/archive' }, 
        { id: 'cabinet', Icon: CircleUser, href: '/tasks' }, 
        { id: 'help', Icon: CircleQuestionMark, href: '#' },
        { id: 'user', Icon: User, href: '#' },
    ];

    return (
        <header className="w-full flex justify-center h-[80px] border-[3px] border-main_lightly bg-main_green_primary rounded-md px-5 mb-4">
            <nav className="group flex flex-1 justify-between items-center">
                <Link href="/home">
                    <img src="images/tasker-2.png" alt="Tasker" className="w-40 cursor-pointer" />
                </Link>

                <section className="w-auto h-full gap-5 flex items-center justify-around">
                    {navItems.map(({ id, Icon, href }) => {
                        const isActive = url === href;

                        return (
                            <Link 
                                key={id}
                                href={href} 
                                className={`transition-all duration-300 ease-in-out hover:scale-110
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