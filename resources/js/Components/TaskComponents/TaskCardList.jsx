import React, { useState, useEffect } from 'react';

import { PiSmileySad } from "react-icons/pi";
import { LuPlus, LuChevronRight, LuChevronLeft } from "react-icons/lu";

import Task from '@/Components/TaskComponents/TaskCard';
import Button from '@/Components/UI/Button';

export default function TaskList({ tasks = [], openModal }) {

    const now = new Date();

    const [openPlanned, setOpenPlanned] = useState(false);
    const [plannedChecked, setPlannedChecked] = useState(false);
    const [lastSeenPlannedCount, setLastSeenPlannedCount] = useState(0);
    const [unreadPlannedCount, setUnreadPlannedCount] = useState(0);
    const storageKey = 'tasker-planned-last-seen-count';

    const parseUploadDate = (uploadDate) => {
        if (!uploadDate) return NaN;
        const timestamp = Date.parse(uploadDate);
        return Number.isNaN(timestamp) ? NaN : timestamp;
    };

    const isPlannedValue = (value) => (
        value === true || value === 'true' || value === 1 || value === '1'
    );

    const plannedTasks = tasks
        .filter(task => {
            const uploadDateMs = parseUploadDate(task.upload_date);
            return isPlannedValue(task.is_planned) && uploadDateMs > now.getTime();
        })
        .sort((a, b) => {
            const ad = parseUploadDate(a.upload_date) || Infinity;
            const bd = parseUploadDate(b.upload_date) || Infinity;
            return ad - bd;
        });

    const currentRaw = tasks.filter(task => {
        const uploadDateMs = parseUploadDate(task.upload_date);
        return !isPlannedValue(task.is_planned) || uploadDateMs <= now.getTime() || isNaN(uploadDateMs);
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

    useEffect(() => {
        const storedCount = window.localStorage.getItem(storageKey);
        if (storedCount !== null) {
            setLastSeenPlannedCount(Number(storedCount));
        } else {
            window.localStorage.setItem(storageKey, String(plannedTasks.length));
            setLastSeenPlannedCount(plannedTasks.length);
        }
    }, []);

    useEffect(() => {
        if (openPlanned) {
            window.localStorage.setItem(storageKey, String(plannedTasks.length));
            setLastSeenPlannedCount(plannedTasks.length);
            setUnreadPlannedCount(0);
            return;
        }

        if (plannedTasks.length < lastSeenPlannedCount) {
            window.localStorage.setItem(storageKey, String(plannedTasks.length));
            setLastSeenPlannedCount(plannedTasks.length);
            setUnreadPlannedCount(0);
            return;
        }

        const newUnread = plannedTasks.length - lastSeenPlannedCount;
        if (newUnread !== unreadPlannedCount) {
            setUnreadPlannedCount(newUnread);
        }
    }, [plannedTasks.length, openPlanned, lastSeenPlannedCount, unreadPlannedCount]);

    return (
        <>
            <section className={`w-full ${openPlanned ? 'lg:w-[30%]' : 'lg:w-20'} shadow-xl relative p-5 gap-5 h-full flex flex-col items-center bg-main_green_dark/10 rounded-lg min-h-0 transition-all duration-300`}>
                    <div className={`border-b-4 border-main_lightly/20 w-full ${openPlanned ? 'px-10 py-2' : 'p-0 border-none'} transition-all duration-300`}>
                        {openPlanned && (
                            <div className="flex flex-col items-center transition-all duration-100">
                                <h2 className={`text-2xl text-main_lightly font-montserrat-medium ${openPlanned ? 'opacity-100' : 'opacity-0'}`}>Заплановані завдання</h2>
                            </div>
                        )}
                    </div>

                    <div className={`flex-1 w-full min-h-0 overflow-y-auto flex flex-col ${openPlanned ? 'items-start gap-4 p-4 justify-start' : 'items-center justify-center p-0'}`}>
                        {!openPlanned ? (
                            <div className="flex flex-col items-center justify-center w-full gap-3">
                                {unreadPlannedCount > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => setOpenPlanned(true)}
                                        className="inline-flex cursor-pointer absolute -top-2 -right-2 items-center justify-center h-8 w-8 rounded-full bg-danger_light text-main_lightly text-sm font-semibold"
                                    >
                                        {unreadPlannedCount}
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={() => setOpenPlanned(true)}
                                    className="flex items-center justify-center w-10 h-10 rounded-full bg-main_green_dark border-2 border-main_lightly text-main_lightly hover:bg-main_green_dark transition-colors duration-200"
                                >
                                    <LuChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="w-full absolute top-[50%] -right-2 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setOpenPlanned(false)}
                                        className="flex items-center justify-center w-10 h-10 rounded-full bg-main_green_dark border-2 border-main_lightly text-main_lightly hover:bg-main_green_dark transition-colors duration-200"
                                    >
                                        <LuChevronLeft className="w-5 h-5" />
                                    </button>
                                </div>
                                {plannedTasks.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center my-auto w-full">
                                        <PiSmileySad className="w-10 h-10 text-main_lightly" />
                                        <p className="text-lg font-montserrat-regular">Тут поки нічого немає</p>
                                    </div>
                                ) : (
                                    <Task tasks={plannedTasks} openModal={openModal} isPlanned={true} />
                                )}
                            </>
                        )}
                    </div>
                </section>

                <section className="w-full flex-1 p-5 gap-5 h-full flex flex-col items-center rounded-lg min-h-0">
                    <div className="px-10 w-full text-center py-2 flex-shrink-0 border-b-4 border-main_lightly/20">
                        <h2 className="text-2xl text-main_lightly font-montserrat-medium">Поточні завдання</h2>
                    </div>
                    
                    <div className="flex-1 w-full min-h-0 overflow-y-auto flex flex-col items-center justify-start gap-4 p-4 rounded-lg">
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