import React from "react";

export default function FieldInput({
     label,
     type = "text",
     placeholder,
     Icon,
     className = "",
     ...props
}) {
     const baseStyles =
          "w-full bg-main_green_dark/50 border-2 border-main_lightly rounded-xl px-4 py-1 text-xl text-main_lightly font-montserrat-regular placeholder-main_lightly/30 transition-all duration-200 focus:border-main_lightly focus:bg-main_green_dark/80 focus:outline-none";

     return (
          <div className={`flex flex-col gap-2 w-full ${type === "textarea" ? "h-full" : ""}`}>
               {label && (
                    <div className="flex items-center gap-2 text-2xl text-main_lightly font-montserrat-bold select-none">
                         {Icon && <Icon className="w-7 h-7 text-main_lightly" />}
                         <span>{label}</span>
                    </div>
               )}
               {type === "textarea" ? (
                    <textarea
                         placeholder={placeholder}
                         className={`${baseStyles} resize-none flex-1 ${className}`}
                         {...props}
                    />
               ) : (
                    <input
                         type={type}
                         placeholder={placeholder}
                         className={`${baseStyles} ${className}`}
                         {...props}
                    />
               )}
          </div>
     );
}
