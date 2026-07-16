import React from "react";
import { Switch } from "@headlessui/react";

import { TbTargetArrow } from "react-icons/tb";
import { GoClock } from "react-icons/go";

export default function Toggle({ enabled, setEnabled, classNameSwitch, classNameSlider }) {
     return (
          <div className="flex items-center justify-center gap-4 select-none font-montserrat-medium text-xl border-b-4 pb-3 border-main_lightly/30 w-full">
               <span
                    className={`transition-colors flex itesm-center justify-center gap-1 duration-200 ${!enabled ? "text-main_lightly" : "text-main_lightly/40"}`}
               >
                    <TbTargetArrow className="w-6 h-6" />
                    <p>Поточна</p>
               </span>

               <Switch
                    checked={enabled}
                    onChange={setEnabled}
                    className={`${classNameSwitch} ${enabled ? "justify-end" : "justify-start"}  relative inline-flex items-center shrink-0 cursor-pointer rounded-full border-2 p-1 transition-all duration-200 ease-in-out focus:outline-none`}
               >
                    <span
                         className={`
                        pointer-events-none inline-block rounded-full shadow-lg ${classNameSlider}
                    `}
                    />
               </Switch>
               <span
                    className={`transition-colors flex itesm-center justify-center gap-2 duration-200 ${enabled ? "text-main_lightly" : "text-main_lightly/40"}`}
               >
                    <GoClock className="w-6 h-6" />
                    <p>Запланована</p>
               </span>
          </div>
     );
}
