import React from 'react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function AppLayout({ children }) {
    return (
        <div className="flex items-center justify-center h-screen w-screen overflow-hidden bg-main_green_dark py-5 px-10">
            <div className="h-full w-full flex items-center justify-between flex-col">
                <Header/>
                    <main className="flex-1 w-[95%] mx-auto bg-main_green_primary border-[3px] border-main_lightly rounded-md flex flex-col">
                        {children}
                    </main> 
                <Footer />
            </div>
        </div>
    );
}