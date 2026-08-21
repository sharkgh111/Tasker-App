import { useEffect, useRef, useState } from "react";

const MIN_DISPLAY_MS = 500;

export default function GlobalLoadingOverlay() {
     const [isVisible, setIsVisible] = useState(true);
     const startTimeRef = useRef(Date.now());
     const hideTimeoutRef = useRef(null);
     const pageLoadedRef = useRef(document.readyState === "complete");
     const backgroundReadyRef = useRef(false);

     useEffect(() => {
          const clearHideTimer = () => {
               if (hideTimeoutRef.current !== null) {
                    window.clearTimeout(hideTimeoutRef.current);
                    hideTimeoutRef.current = null;
               }
          };

          const shouldHide = () => pageLoadedRef.current && backgroundReadyRef.current;

          const hideOverlay = () => {
               if (!shouldHide()) {
                    return;
               }

               const elapsed = Date.now() - startTimeRef.current;
               const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);

               clearHideTimer();

               if (remaining > 0) {
                    hideTimeoutRef.current = window.setTimeout(() => {
                         setIsVisible(false);
                         hideTimeoutRef.current = null;
                    }, remaining);
               } else {
                    setIsVisible(false);
               }
          };

          const showOverlay = () => {
               clearHideTimer();
               startTimeRef.current = Date.now();
               setIsVisible(true);
          };

          const handleWindowLoad = () => {
               pageLoadedRef.current = true;
               hideOverlay();
          };

          const handleBackgroundReady = () => {
               backgroundReadyRef.current = true;
               hideOverlay();
          };

          const handleInertiaStart = (event) => {
               const method = event?.detail?.visit?.method;
               if (method !== "get") {
                    return;
               }

               showOverlay();
          };

          const handleInertiaFinish = () => {
               hideOverlay();
          };

          const handleInertiaCancel = () => {
               hideOverlay();
          };

          const handleInertiaError = () => {
               hideOverlay();
          };

          if (!pageLoadedRef.current) {
               window.addEventListener("load", handleWindowLoad, { once: true });
          }

          document.addEventListener("background:ready", handleBackgroundReady, { once: true });
          document.addEventListener("inertia:start", handleInertiaStart);
          document.addEventListener("inertia:finish", handleInertiaFinish);
          document.addEventListener("inertia:cancel", handleInertiaCancel);
          document.addEventListener("inertia:error", handleInertiaError);

          return () => {
               window.removeEventListener("load", handleWindowLoad);
               document.removeEventListener("background:ready", handleBackgroundReady);
               document.removeEventListener("inertia:start", handleInertiaStart);
               document.removeEventListener("inertia:finish", handleInertiaFinish);
               document.removeEventListener("inertia:cancel", handleInertiaCancel);
               document.removeEventListener("inertia:error", handleInertiaError);
               clearHideTimer();
          };
     }, []);

     if (!isVisible) {
          return null;
     }

     return (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-md bg-main_green_dark/30">
               <div className="flex flex-col items-center gap-4 rounded-3xl bg-main_green_light/10 px-8 py-8 shadow-2xl">
                    <div className="w-16 h-16 border-4 border-main_lightly/30 border-t-main_lightly rounded-full animate-spin" />
                    <p className="text-xl text-main_lightly font-montserrat-medium">
                         Завантаження...
                    </p>
               </div>
          </div>
     );
}
