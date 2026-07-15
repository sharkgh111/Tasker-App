import React from "react";

export default function IconButton({ Icon, onClick, iconSize = "w-5 h-5", color = "text-main_lightly", className = "", type = "button", disabled = false }) {
     return (
          <button
               type={type}
               onClick={onClick}
               disabled={disabled}
               className={`
                flex items-center justify-center cursor-pointer
                rounded-lg p-2 transition-all duration-200 
                active:scale-95 disabled:opacity-50 disabled:pointer-events-none
                ${color} 
                ${className}
            `}
          >
               {Icon && <Icon className={iconSize} />}
          </button>
     );
}
