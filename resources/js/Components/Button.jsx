import React from 'react';

export default function Button({ 
    text = '',              
    Icon = null,
    showText = true,           
    showIcon = true,       
    iconSize = 'w-5 h-5',   
    onClick,           
    className = ''          
}) {
    return (
        <button 
            onClick={onClick}
            className={`flex items-center justify-center gap-2 px-4 py-0.5 rounded-lg 
            transition-all duration-300 ease-in-out hover:translate-y-0.5 hover:bg-main_green_dark/70 active:scale-95
            bg-main_green_dark shadow-[0px_2px_10px_0px_rgba(0,0,0,0.8)] text-main_lightly ${className}`}
        >
            {showIcon && Icon && <Icon className={iconSize} />}
            {showText && text && <span className="font-medium">{text}</span>}
        </button>
    );
}