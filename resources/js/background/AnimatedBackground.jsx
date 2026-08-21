import React, { useState, useEffect, useRef, createContext } from "react";

export const TRANSITION_DURATION = 1000;

export const BackgroundSlideContext = createContext({
     currentSlide: null,
     nextSlide: null,
     isTransitioning: false,
     currentIndex: 0,
});

export default function AnimatedBackground({
     images = [],
     slides = [],
     intervalTime = 10000,
     children,
}) {
     const [currentIndex, setCurrentIndex] = useState(0);
     const [nextIndex, setNextIndex] = useState(null);
     const [isTransitioning, setIsTransitioning] = useState(false);

     const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

     const intervalRef = useRef(null);
     const transitionTimeoutRef = useRef(null);
     const currentIndexRef = useRef(0);

     const hasSlides = Array.isArray(slides) && slides.length > 0;
     const backgroundItems = hasSlides
          ? slides.map((slide) => slide.image || slide.src || slide)
          : images;

     useEffect(() => {
          if (!Array.isArray(backgroundItems) || backgroundItems.length === 0) {
               document.dispatchEvent(new Event("background:ready"));
               return undefined;
          }

          let remaining = backgroundItems.length;
          let resolved = false;
          const images = [];

          const handleImageLoad = () => {
               remaining -= 1;
               if (remaining <= 0 && !resolved) {
                    resolved = true;
                    document.dispatchEvent(new Event("background:ready"));
               }
          };

          backgroundItems.forEach((src) => {
               const img = new Image();
               img.onload = handleImageLoad;
               img.onerror = handleImageLoad;
               img.src = src;
               images.push(img);
          });

          return () => {
               resolved = true;
               images.forEach((img) => {
                    img.onload = null;
                    img.onerror = null;
               });
          };
     }, [backgroundItems]);

     useEffect(() => {
          currentIndexRef.current = currentIndex;
     }, [currentIndex]);

     useEffect(() => {
          if (!Array.isArray(backgroundItems) || backgroundItems.length <= 1) return undefined;

          const startTransition = () => {
               const next =
                    currentIndexRef.current === backgroundItems.length - 1
                         ? 0
                         : currentIndexRef.current + 1;

               setNextIndex(next);
               setIsTransitioning(true);

               const nextImage = new Image();
               nextImage.src = backgroundItems[next];

               if (transitionTimeoutRef.current) {
                    clearTimeout(transitionTimeoutRef.current);
               }

               transitionTimeoutRef.current = setTimeout(() => {
                    setCurrentIndex(next);
                    setNextIndex(null);
                    setIsTransitioning(false);
               }, TRANSITION_DURATION);
          };

          intervalRef.current = setInterval(startTransition, intervalTime);
          return () => {
               clearInterval(intervalRef.current);
               if (transitionTimeoutRef.current) {
                    clearTimeout(transitionTimeoutRef.current);
               }
          };
     }, [backgroundItems.length, intervalTime]);

     const handleMouseMove = (e) => {
          const { innerWidth, innerHeight } = window;
          const x = (e.clientX - innerWidth / 2) / 25;
          const y = (e.clientY - innerHeight / 2) / 25;
          setMouseOffset({ x, y });
     };

     const getBgStyle = (img) => ({
          backgroundImage: `
               radial-gradient(circle, rgba(0, 0, 0, 0.2) 80%, rgba(0, 0, 0) 120%),
               url('${img}')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          // Зсув картинки за мишею + масштаб для запобігання появі країв
          transform: `translate(${mouseOffset.x}px, ${mouseOffset.y}px) scale(1.08)`,
     });

     const currentSlide = hasSlides ? slides[currentIndex] : null;
     const nextSlide = hasSlides && nextIndex !== null ? slides[nextIndex] : null;

     return (
          <BackgroundSlideContext.Provider
               value={{ currentSlide, nextSlide, isTransitioning, currentIndex }}
          >
               <div
                    onMouseMove={handleMouseMove}
                    className="flex flex-col h-screen relative overflow-hidden bg-main_green_dark w-full"
               >
                    {backgroundItems.map((image, index) => {
                         const isCurrent = index === currentIndex;
                         const isNext = index === nextIndex;
                         const opacityClass =
                              isCurrent && !isTransitioning
                                   ? "opacity-100"
                                   : isNext && isTransitioning
                                     ? "opacity-100"
                                     : "opacity-0";

                         return (
                              <div
                                   key={image || index}
                                   style={{
                                        ...getBgStyle(image),
                                        // Плавний крос-фейд + інертний плавний рух transform
                                        transition: `opacity ${TRANSITION_DURATION}ms ease-in-out, transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)`,
                                   }}
                                   className={`absolute inset-[-30px] z-0 ${opacityClass}`}
                              />
                         );
                    })}

                    {backgroundItems.length === 0 && (
                         <div className="absolute inset-0 z-0 bg-main_green_primary" />
                    )}

                    <div className="relative z-10 flex flex-col flex-1 w-full min-h-0">
                         <div className="relative z-20 flex flex-col flex-1 w-full min-h-0">
                              {children}
                         </div>
                    </div>
               </div>
          </BackgroundSlideContext.Provider>
     );
}
