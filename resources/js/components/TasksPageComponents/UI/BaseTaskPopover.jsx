import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

const POPOVER_PANEL_CLASSES =
     "absolute right-0 top-full z-50 flex flex-col bg-main_green_dark/40 backdrop-blur-sm border border-main_lightily/30 rounded-xl shadow-xl mt-3 pointer-events-auto";

export default function BaseTaskPopover({
     icon: Icon,
     iconSize = "w-8 h-8",
     popoverClass = "",
     children,
}) {
     const hasPositionClass = /\b(absolute|fixed|sticky|relative)\b/.test(popoverClass);
     const wrapperClass = hasPositionClass ? popoverClass : `relative ${popoverClass}`;

     return (
          <Popover className={wrapperClass}>
               <PopoverButton type="button" className="outline-none">
                    <Icon
                         className={`text-main_lightily transition-all duration-300 hover:text-main_lightily/80 hover:scale-95 cursor-pointer ${iconSize}`}
                    />
               </PopoverButton>
               <PopoverPanel as="div" className={POPOVER_PANEL_CLASSES}>
                    {({ close }) => (
                         <div onClick={(event) => event.stopPropagation()} className="w-full">
                              {children({ close })}
                         </div>
                    )}
               </PopoverPanel>
          </Popover>
     );
}
