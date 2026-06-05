import React, { useState } from 'react';
import { Head } from '@inertiajs/react';

import AppLayout from '@/Components/Layouts/AppLayout';

import TaskModal from '@/Components/TaskComponents/task_modal/TaskModal';
import TaskList from '@/Components/TaskComponents/TaskCardList';

export default function TasksPage({tasks}) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null); 

    const openModal = (task = null) => {
        setEditingTask(task); 
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false); 
    }

    return (
        <AppLayout>
            <Head title="Мій кабінет" />

            <div className="text-main_lightly flex flex-col lg:flex-row flex-1 min-h-0 gap-6 w-full justify-between items-stretch p-6 overflow-hidden">
                <TaskList
                   openModal={openModal}
                   tasks={tasks} 
                />
            </div>

            <TaskModal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                task={editingTask}
                afterLeave={() => setEditingTask(null)}
            />
        </AppLayout>
    );
}