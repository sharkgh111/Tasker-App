import React, { useState } from "react";

export default function ParallaxImage({ src, alt = "", className = "" }) {
     const [offset, setOffset] = useState({ x: 0, y: 0 });
     const [isHovered, setIsHovered] = useState(false);

     const handleMouseMove = (e) => {
          const { clientX, clientY, currentTarget } = e;
          const rect = currentTarget.getBoundingClientRect();

          const x = clientX - rect.left - rect.width / 2;
          const y = clientY - rect.top - rect.height / 2;

          const sensitivity = 20;

          setOffset({
               x: x / sensitivity,
               y: y / sensitivity,
          });
     };

     const handleMouseEnter = () => {
          setIsHovered(true);
     };

     const handleMouseLeave = () => {
          setIsHovered(false);
          setOffset({ x: 0, y: 0 });
     };

     return (
          <div
               className={`overflow-hidden relative rounded-md cursor-pointer ${className}`}
               onMouseMove={handleMouseMove}
               onMouseEnter={handleMouseEnter}
               onMouseLeave={handleMouseLeave}
          >
               <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover transition-transform duration-200 ease-out scale-105"
                    style={{
                         transform: `translate(${offset.x}px, ${offset.y}px) ${
                              isHovered ? "scale(1.1)" : "scale(1)"
                         }`,
                    }}
               />
          </div>
     );
}
