import React from 'react';
import Header from '@/Components/Layouts/Header';
import Footer from '@/Components/Layouts/Footer';

export default function AppLayout({ children }) {
    return (
        <div className="flex flex-col flex-1 items-center justify-center h-screen overflow-hidden bg-tasker-radial py-5 px-10">
                <Header/>
                    <main className="flex-1 min-h-0 w-[95%] mx-auto bg-main_green_dark/15 backdrop-blur-xl rounded-md flex flex-col">
                        {children}
                    </main> 
                <Footer />
        </div>
    );
}