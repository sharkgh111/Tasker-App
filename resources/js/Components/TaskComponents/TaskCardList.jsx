import React from 'react';

import { PiSmileySad } from "react-icons/pi";
import { LuPlus } from "react-icons/lu";

import Task from '@/Components/TaskComponents/TaskCard';
import Button from '@/Components/UI/Button';

export default function TaskList({ tasks = [], openModal }) {

    const now = new Date();

    const plannedTasks = tasks
        .filter(task => {
            const date = task.upload_date ? new Date(task.upload_date) : NaN;
            return task.is_planned === true && date > now;
        })
        .sort((a, b) => {
            const ad = a.upload_date ? new Date(a.upload_date).getTime() : Infinity;
            const bd = b.upload_date ? new Date(b.upload_date).getTime() : Infinity;
            return ad - bd;
        });

    const currentRaw = tasks.filter(task => {
        const date = task.upload_date ? new Date(task.upload_date) : NaN;
        return !task.is_planned || date <= now || isNaN(date);
    });

    const currentFuture = currentRaw
        .filter(t => {
            const td = t.task_date ? new Date(t.task_date) : NaN;
            return isNaN(td) || td.getTime() >= now.getTime();
        })
        .sort((a, b) => {
            const ad = a.task_date ? new Date(a.task_date).getTime() : Infinity;
            const bd = b.task_date ? new Date(b.task_date).getTime() : Infinity;
            return ad - bd;
        });

    const currentOverdue = currentRaw
        .filter(t => {
            const td = t.task_date ? new Date(t.task_date) : NaN;
            return !isNaN(td) && td.getTime() < now.getTime();
        })
        .sort((a, b) => {
            const ad = new Date(a.task_date).getTime();
            const bd = new Date(b.task_date).getTime();
            return ad - bd;
        });

    const currentTasks = [...currentFuture, ...currentOverdue];

    return (
        <>
            <section className="w-full lg:w-[35%] p-5 gap-5 h-full flex flex-col items-center bg-main_green_light rounded-lg min-h-0">
                    <div className="bg-main_green_primary rounded-lg px-10 w-full text-center py-2 flex-shrink-0">
                        <h2 className="text-2xl text-main_lightly font-montserrat-medium">Заплановані завдання</h2>
                    </div>
                    <div className="flex-1 w-full min-h-0 overflow-y-auto flex flex-col items-center justify-start gap-4 p-4 bg-main_green_primary rounded-lg">
                        {plannedTasks.length === 0 ? (
                            <div className="flex flex-col items-center justify-center my-auto">
                                <PiSmileySad className="w-10 h-10 text-main_lightly" />
                                <p className="text-lg font-montserrat-regular">Тут поки нічого немає</p>
                            </div>
                        ) : (
                            <Task tasks={plannedTasks} openModal={openModal} isPlanned={true} />
                        )}
                    </div>
                </section>

                <section className="w-full lg:w-[65%] p-5 gap-5 h-full flex flex-col items-center bg-main_green_light rounded-lg min-h-0">
                    <div className="bg-main_green_primary rounded-lg px-10 w-full text-center py-2 flex-shrink-0">
                        <h2 className="text-2xl text-main_lightly font-montserrat-medium">Поточні завдання</h2>
                    </div>
                    
                    <div className="flex-1 w-full min-h-0 overflow-y-auto flex flex-col items-center justify-start gap-4 p-4 bg-main_green_primary rounded-lg">
                        {currentTasks.length === 0 ? (
                            <div className="flex flex-col items-center justify-center my-auto gap-3">
                                <p className="text-lg font-montserrat-regular">У вас немає поточних задач</p>
                                <Button 
                                    type="button"
                                    text="Додати задачу" 
                                    Icon={LuPlus}
                                    iconSize="w-5 h-5"
                                    onClick={() => openModal(null)}
                                    className="font-montserrat-bold text-sm py-1.5 px-4 bg-main_green_dark  border-2 text-main_lightly"
                                />
                            </div>
                        ) : (
                            <Task tasks={currentTasks}  openModal={openModal} isPlanned={false} />
                        )}
                    </div>
            </section>
        </>
    );
}