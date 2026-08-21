import React from "react";
import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";
import AnimatedBackground from "@/background/AnimatedBackground";

export default function AppLayout({ bgImages, slides, children }) {
     return (
          <AnimatedBackground images={bgImages} slides={slides}>
               <Header />
               <main className="flex-1 min-h-0 w-[95%] mx-auto rounded-md flex flex-col overflow-hidden">
                    {children}
               </main>
               <Footer />
          </AnimatedBackground>
     );
}
