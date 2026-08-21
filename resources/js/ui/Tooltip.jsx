import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export default function Tooltip({ text, delay = 400, align = "right", children }) {
     const [isVisible, setIsVisible] = useState(false);
     const [coords, setCoords] = useState({ top: 0, left: 0 });
     const targetRef = useRef(null);
     const timeoutRef = useRef(null);

     const updatePosition = () => {
          if (targetRef.current) {
               const rect = targetRef.current.getBoundingClientRect();

               // Якщо align === "left", рахуємо координату від лівого краю елемента
               const leftPos =
                    align === "left" ? rect.left + window.scrollX : rect.right + window.scrollX;

               setCoords({
                    top: rect.bottom + window.scrollY + 8,
                    left: leftPos,
               });
          }
     };

     const showTooltip = () => {
          updatePosition();
          timeoutRef.current = setTimeout(() => {
               setIsVisible(true);
          }, delay);
     };

     const hideTooltip = () => {
          if (timeoutRef.current) {
               clearTimeout(timeoutRef.current);
          }
          setIsVisible(false);
     };

     useEffect(() => {
          if (isVisible) {
               window.addEventListener("scroll", updatePosition, true);
               window.addEventListener("resize", updatePosition);
               return () => {
                    window.removeEventListener("scroll", updatePosition, true);
                    window.removeEventListener("resize", updatePosition);
               };
          }
     }, [isVisible]);

     // Динамічний transform залежно від вирівнювання
     const transformStyle = align === "left" ? "translateX(0)" : "translateX(-100%)";

     return (
          <>
               <div
                    ref={targetRef}
                    className="inline-block"
                    onMouseEnter={showTooltip}
                    onMouseLeave={hideTooltip}
               >
                    {children}
               </div>
               {isVisible &&
                    createPortal(
                         <div
                              style={{
                                   position: "fixed",
                                   top: `${coords.top}px`,
                                   left: `${coords.left}px`,
                                   transform: transformStyle,
                              }}
                              className="z-[9999] whitespace-nowrap rounded bg-main_green_dark px-2.5 py-1.5 text-base font-medium text-main_lightly shadow-xl pointer-events-none transition-opacity duration-200"
                         >
                              {text}
                              {/* Змінюємо положення маленького трикутника в залежності від вирівнювання */}
                              <div
                                   className={`absolute -top-1 h-2 w-2 rotate-45 bg-main_green_dark ${align === "left" ? "left-3" : "right-3"}`}
                              />
                         </div>,
                         document.body,
                    )}
          </>
     );
}
