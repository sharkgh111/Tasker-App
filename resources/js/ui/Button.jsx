import React from "react";

export default function Button({
     text,
     Icon,
     showText = true,
     showIcon = true,
     iconSize = "w-5 h-5",
     onClick,
     className,
     type = "button",
     ...props
}) {
     return (
          <button
               type={type}
               onClick={onClick}
               className={`flex items-center justify-center gap-2 px-4 py-0.5 rounded-lg 
            transition-all duration-300 ease-in-out hover:translate-y-0.5 active:scale-95 border-2 border-main_lightly shadow-[3px_3px_10px_0px_rgba(0,0,0,0.8)] text-main_lightly ${className}`}
               {...props}
          >
               {showIcon && Icon && <Icon className={iconSize} />}
               {showText && text && <span className="font-medium">{text}</span>}
          </button>
     );
}
