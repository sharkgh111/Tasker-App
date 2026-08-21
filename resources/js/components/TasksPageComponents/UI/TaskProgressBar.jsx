import React, { useState, useEffect } from "react";

export default function TaskProgressBar({ percentage }) {
     const safePercentage = Number.isFinite(percentage)
          ? Math.max(0, Math.min(100, percentage))
          : 0;

     const [animatedPercentage, setAnimatedPercentage] = useState(safePercentage);

     useEffect(() => {
          let start = animatedPercentage;
          const end = safePercentage;
          if (start === end) return;

          const duration = 800;
          const stepTime = Math.abs(Math.floor(duration / (end - start || 1)));

          const timer = setInterval(
               () => {
                    if (start < end) {
                         start += 1;
                    } else {
                         start -= 1;
                    }

                    const currentSafe = Math.max(0, Math.min(100, start));
                    setAnimatedPercentage(currentSafe);

                    if (start === end) {
                         clearInterval(timer);
                    }
               },
               Math.max(stepTime, 10),
          );

          return () => clearInterval(timer);
     }, [safePercentage]);

     return (
          <section className="flex flex-col w-fit items-center gap-3 justify-center">
               <div className="bg-transparent relative border-2 border-main_lightly rounded-full w-4 h-[80%] p-[2px] flex items-end">
                    <div
                         className={`${safePercentage === 100 ? "bg-succes_light" : "bg-main_green_light"} transition-all duration-1000 ease-out w-full rounded-full`}
                         style={{ height: `${safePercentage}%` }}
                    />

                    <span
                         className={`font-montserrat-medium absolute -top-8 -left-3 ${safePercentage === 100 ? "text-succes_light" : "text-main_lightly"} text-lg`}
                    >
                         {`${animatedPercentage.toFixed(1)}%`}
                    </span>
               </div>
          </section>
     );
}
