import React from 'react';
import { Switch } from '@headlessui/react';

export default function Toggle({ enabled, setEnabled, classNameSwitch, classNameSlider }) {
    return (
        <div className="flex items-center justify-center gap-4 select-none font-montserrat-medium text-xl border-b-2 pb-3 border-main_lightly/40 w-full">
            <span className={`transition-colors duration-200 ${!enabled ? 'text-main_lightly' : 'text-main_lightly/40'}`}>
                Поточна
            </span>
            
            <Switch
                checked={enabled}
                onChange={setEnabled}
                className={`${classNameSwitch } relative inline-flex shrink-0 cursor-pointer rounded-full border-2  transition-colors duration-200 ease-in-out focus:outline-none"`}
            >
                <span
                    className={` ${
                        enabled ? 'translate-x-7' : 'translate-x-0.5'
                    }  will-change-transform backface-hidden absolute top-[2px] pointer-events-none inline-block transform-gpu rounded-full shadow-lg transition-all duration-300 ease-in-out ${classNameSlider}`}
                />
            </Switch>
            <span className={`transition-colors duration-200 ${enabled ? 'text-main_lightly' : 'text-main_lightly/40'}`}>
                Запланована
            </span>
        </div>
    );
}