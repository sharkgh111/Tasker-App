import React from 'react';

export default function CustomRadio({ 
    label, 
    name, 
    value, 
    checked, 
    onChange,
    defaultColor = 'bg-main_green_light'
}) {

    return (
        <label className="flex items-center flex-col justify-center gap-3 cursor-pointer select-none group font-montserrat-medium text-xl text-main_lightly">
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                className="sr-only" 
            />

            <div
                className={`
                    w-7 h-7 flex rounded-full items-center justify-center border-2 transition-all duration-200 border-main_lightly bg-${defaultColor}
                    ${checked 
                        ? 'scale-110 shadow-xl ring-2 ring-main_lightly/30'
                        : 'group-hover:border-main_lightly/60 shadow-lg group-hover:scale-95'
                    }
                `}
            >
                {checked && (
                    <div className="w-4 h-4 rounded-full bg-main_lightly" />
                )}
            </div>

            {label && (
                <span 
                    className={`
                        text-sm text-center font-montserrat-regular
                        transition-all duration-300 ease-in-out
                        ${checked 
                            ? 'opacity-100 max-h-10 mt-1 translate-y-0 text-main_lightly' 
                            : 'opacity-0 max-h-0 mt-0 -translate-y-1 pointer-events-none text-transparent'
                        }
                    `}
                    style={{ overflow: 'hidden' }}
                >
                    {label}
                </span>
            )}
            
        </label>
    );
}