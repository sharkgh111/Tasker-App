import React, { useState, useEffect } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { useForm } from '@inertiajs/react';

import Button from '@/Components/UI/Button';
import TaskManager from './TaskManager';
import SubTaskManager from './SubTaskManager';
import OtherOptions from './OtherOptions';
import LoadingOverlay from '../../Overlays/LoadingOverlayModal';

import { LuPlus, LuTrash2 } from "react-icons/lu";

export default function TaskModal({ isOpen, onClose, task = null, afterLeave }) {

    const { data, setData, post, patch, reset, errors, setError, clearErrors } = useForm({
        title: '',
        description: '',
        task_date: '',
        is_planned: false,
        upload_date: '',
        priority: null,
        categories: [],
        can_edit: true,
        can_archive: true,
        has_reminder: true,
        subtasks: []
    });

    useEffect(() => {
        if (isOpen) {
            if (task) {
                setData({
                    title: task.title || '',
                    description: task.description || '',
                    task_date: task.task_date ? task.task_date.substring(0, 16) : '', 
                    is_planned: !!task.is_planned,
                    upload_date: task.upload_date ? task.upload_date.substring(0, 16) : '',
                    priority: task.priority || null,
                    categories: task.categories || [],
                    can_edit: task.can_edit ?? true,
                    can_archive: !!task.can_archive,
                    has_reminder: task.has_reminder ?? true,
                    subtasks: task.subtasks || []
                });
            } else {
                reset();
                setNewSubtaskTitle('');
                setIsAddingSubtask(false);
                clearErrors();
            }
        }
    }, [task, isOpen]);

    const isActionForbidden = task && (data.is_planned !== !!task.is_planned);
    const isTaskLocked = task && (data.is_planned !== !!task.is_planned);

    const [isAddingSubtask, setIsAddingSubtask] = useState(false);
    const [newSubtaskTitle, setNewSubtaskTitle] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const overallWidth = "450px";

    const handleSubmit = (e) => {

        if (e && e.preventDefault) e.preventDefault();
        clearErrors();

        let validationErrors = {};

        if (!data.title.trim()) validationErrors.title = "Назва задачі обов'язкова!";

        if (!data.description.trim()) validationErrors.description = "Опис не може бути пустим!";

        if (!data.task_date) validationErrors.taskDate = "Відсутній термін виконання!";

        if (data.is_planned && !data.upload_date) validationErrors.uploadDate = "Відсутній час застосування!";

        if (data.is_planned && data.task_date && data.upload_date) {
            if (new Date(data.task_date).getTime() < new Date(data.upload_date).getTime()) {
                validationErrors.taskDate = "Термін виконання не може бути раніше за дату активації!";
            }
        }

        if (Object.keys(validationErrors).length > 0) {
            Object.keys(validationErrors).forEach(key => setError(key, validationErrors[key]));
            return; 
        }   

        if (task && task.id) {
        patch(`/tasks/${task.id}`, {
            onSuccess: () => {
                onClose();
            }
        });
        } else {
                post('/tasks', {
                    onSuccess: () => {
                        reset(); 
                        onClose(); 
                    }
                });
        }
    };

    const handleReset = (e) => {
            e.preventDefault();
            setIsLoading(true);
                
            reset(); 

            setNewSubtaskTitle('');
            setIsAddingSubtask(false);
            clearErrors();

        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    };

    return (
        <Transition show={isOpen} as={React.Fragment} afterLeave={() => {if (afterLeave) afterLeave(); reset();}}>
            <Dialog as="div" className="relative z-50" onClose={() => {
                    reset(); 
                    onClose();
            }}>
                <TransitionChild
                    as={React.Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/70 " />
                </TransitionChild>
                <div className="fixed inset-0 overflow-y-auto flex items-center justify-center p-4">
                    <TransitionChild
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                        afterLeave={() => {
                            reset(); 
                        }}
                    >
                        <DialogPanel 
                            style={{ '--overall-w': overallWidth }} 
                            className="w-full relative max-w-7xl h-3/4 transform rounded-2xl rounded-tl-none bg-main_green_primary border-[3px] border-main_lightly text-left align-middle shadow-2xl transition-all"
                        >
                            <LoadingOverlay
                                isLoading={isLoading}
                            />
                            <DialogTitle as="h2" className="text-3xl flex items-center justify-center absolute h-[70px] w-[var(--overall-w)] -top-[70px] -left-[calc((var(--overall-w)/200))] rounded-t-xl border-[3px] border-main_lightly font-montserrat-regular leading-6 text-main_lightly bg-main_green_primary mb-4">
                                {task ? 'Редагування завдання' : 'Створення завдання'}
                            </DialogTitle>
                            <div className="flex w-full h-full flex-col justify-between">
                                <form 
                                    id="task-create-form" 
                                    onSubmit={handleSubmit} 
                                    className="flex flex-row w-full h-[85%] items-stretch justify-between border-b-[3px] border-main_lightly"
                                >
                                    <TaskManager
                                        data={data}
                                        setData={setData}
                                        errors={errors} 
                                        clearErrors={clearErrors} 
                                        task={task}
                                    />

                                    <SubTaskManager
                                        subtasks={data.subtasks}
                                        isAddingSubtask={isAddingSubtask}
                                        setIsAddingSubtask={setIsAddingSubtask}
                                        setNewSubtaskTitle={setNewSubtaskTitle}
                                        newSubtaskTitle={newSubtaskTitle}
                                        setData={setData}
                                    />
                                    
                                    <OtherOptions
                                        data={data}
                                        setData={setData}
                                    />
                                    
                                </form>

                                <footer className="flex h-auto p-5 items-center justify-between">
                                    <Button
                                        type="button" 
                                        text="Очистити"
                                        className="border-2 bg-danger_light hover:bg-danger_light/80 font-montserrat-medium px-[50px] py-[5px] text-2xl"
                                        onClick={handleReset}
                                    />
                                    <div className="flex items-center justify-center gap-5">
                                        <Button
                                            type="button" 
                                            text="Скасувати"
                                            className="border-2 bg-main_green_light hover:bg-main_green_light/70 font-montserrat-medium px-[50px] py-[5px] text-2xl"
                                            onClick={onClose}
                                        />
                                        <Button 
                                            type="submit"
                                            form="task-create-form"
                                            onClick={handleSubmit} 
                                            disabled={isActionForbidden}
                                            text={task ? "Зберегти" : "Створити"}
                                            className={`${isTaskLocked ? 'bg-gray-500 cursor-not-allowed' : 'bg-main_green_dark'} border-2 bg-main_green_dark hover:bg-main_green_dark/80 font-montserrat-medium px-[50px] py-[5px] text-2xl`}
                                        />
                                    </div>
                                </footer>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    );
}