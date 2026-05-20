import React from 'react';
import AppLayout from '@/Layouts/AppLayout';

import { PiSmileySad } from "react-icons/pi";
import { LuPlus } from "react-icons/lu";

import Button from '@/Components/Button';


export default function Tasks() {
    return (
        <AppLayout>
            <div className="rounded-md text-main_lightly flex flex-row flex-1 h-full gap-10 w-full justify-between items-center overflow-hidden p-6">
                <section className="w-[35%] p-5 gap-5 h-full flex flex-col items-center bg-main_green_light rounded-lg min-h-0">
                    <div className="bg-main_green_primary rounded-lg px-10 w-full text-center py-2 flex-shrink-0">
                        <h2 className="text-2xl text-main_lightly font-montserrat-medium">Заплановані задачі</h2>
                    </div>
                    <div className="flex-1 w-full min-h-0 overflow-y-auto flex flex-col items-center justify-start gap-4 p-4 bg-main_green_primary rounded-lg">
                        <div className="flex flex-col items-center justify-center my-auto">
                            <PiSmileySad className="w-10 h-10 text-main_lightly" />
                            <p className="text-lg font-montserrat-regular">Тут поки нічого немає</p>
                        </div>
                    </div>
                </section>
                <section className="w-[65%] p-5 gap-5 h-full flex flex-col items-center bg-main_green_light rounded-lg min-h-0">
                    <div className="bg-main_green_primary rounded-lg px-10 w-full text-center py-2 flex-shrink-0">
                        <h2 className="text-2xl text-main_lightly font-montserrat-medium">Поточні задачі</h2>
                    </div>
                    <div className="flex-1 w-full min-h-0 overflow-y-auto flex flex-col items-center justify-start gap-4 p-4 bg-main_green_primary rounded-lg">
                        <div className="flex flex-col items-center gap-2 justify-center my-auto">
                            <p className="font-montserrat-medium text-lg text-main_lightly">У вас зараз немає задач</p>
                            <Button 
                                text="Додати задачу" 
                                Icon={LuPlus}
                                iconSize="w-7 h-7"
                                className="font-montserrat-bold"
                            />
                        </div>
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}