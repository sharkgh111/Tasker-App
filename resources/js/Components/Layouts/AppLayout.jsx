import React from 'react';
import Header from '@/Components/Layouts/Header';
import Footer from '@/Components/Layouts/Footer';

export default function AppLayout({ children }) {
    return (
        <div className="flex flex-col flex-1 items-center justify-center h-screen overflow-hidden bg-main_green_dark py-5 px-10">
                <Header/>
                    <main className="flex-1 w-[95%] mx-auto bg-main_green_primary border-[3px] border-main_lightly rounded-md flex flex-col">
                        {children}
                    </main> 
                <Footer />
        </div>
    );
}