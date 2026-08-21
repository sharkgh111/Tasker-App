import React from "react";
import AppLayout from "@/layouts/AppLayout";
import { Head, router } from "@inertiajs/react";
import { TRANSITION_DURATION } from "@/background/AnimatedBackground";

import slides from "@/constants/homeSlides";
import useBackgroundSlider from "@/hooks/useBackgroundSlider";
import Button from "@/ui/Button";

const INTERVAL_TIME = 10000;

export default function Home() {
     const { activeSlide, fade } = useBackgroundSlider(slides, INTERVAL_TIME, TRANSITION_DURATION);

     const handleStart = () => router.visit("/tasks");

     return (
          <AppLayout slides={slides}>
               <Head title="Головна" />

               <div className="rounded-md text-main_lightily flex flex-col justify-evenly flex-1 h-full w-full overflow-hidden">
                    <div className="relative h-[70%] p-8 flex text-main_lightily">
                         <div
                              className="flex flex-col justify-center text-main_lightly"
                              style={{
                                   opacity: fade ? 1 : 0,
                                   transform: fade ? "translateY(0)" : "translateY(8px)",
                                   transition: `opacity ${TRANSITION_DURATION / 2}ms ease-in-out, transform ${TRANSITION_DURATION / 2}ms ease-in-out`,
                              }}
                         >
                              <h1 className="text-6xl mb-8 font-montserrat-bold">
                                   {activeSlide?.title}
                              </h1>
                              <p className="pr-64 text-main_lightily/80 font-montserrat-medium text-2xl leading-relaxed text-justify">
                                   {activeSlide?.description}
                              </p>
                         </div>
                         <Button
                              text="Розпочати"
                              onClick={handleStart}
                              className="absolute bottom-8 left-1/2 -translate-x-1/2 border-1 w-fit text-center px-20 py-5 tracking-widest !rounded-full text-3xl font-montserrat-bold bg-main_green_dark/50 backdrop-blur-sm"
                         />
                    </div>

                    <div className="h-auto max-w-5xl flex flex-col justify-start p-6">
                         <ul className="flex flex-col gap-[5px] text-main_lightly text-2xl text-main_lightily font-montserrat-regular">
                              <li className="flex items-center pb-2 gap-3">
                                   <span>📩</span> Додавай миттєво — записуй ідеї, робочі таски та
                                   плани.
                              </li>
                              <li className="flex items-center pb-2 gap-3">
                                   <span>✏️</span> Редагуй на льоту — зміни план, коли щось іде не
                                   за графіком.
                              </li>
                              <li className="flex items-center pb-2 gap-3">
                                   <span>✅</span> Відзначай виконане та отримуй задоволення від
                                   прогресу.
                              </li>
                         </ul>
                    </div>
               </div>
          </AppLayout>
     );
}
