import { useState, useEffect, useRef } from "react";

export default function useBackgroundSlider(
     slides = [],
     interval = 10000,
     transitionDuration = 1000,
) {
     const [index, setIndex] = useState(0);
     const [fade, setFade] = useState(true);
     const timeoutRef = useRef(null);

     useEffect(() => {
          if (!Array.isArray(slides) || slides.length === 0) return;

          const intervalId = setInterval(
               () => {
                    setFade(false);

                    timeoutRef.current = setTimeout(
                         () => {
                              setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
                              setFade(true);
                         },
                         Math.max(1, Math.floor(transitionDuration / 2)),
                    );
               },
               Math.max(1000, interval),
          );

          return () => {
               clearInterval(intervalId);
               if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
               }
          };
     }, [slides, interval, transitionDuration]);

     return { index, fade, activeSlide: slides[index] };
}
