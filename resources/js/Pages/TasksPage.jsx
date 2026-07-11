import React, { useState } from "react";
import { Head } from "@inertiajs/react";

import AppLayout from "@/Components/Layouts/AppLayout";

import TaskModal from "@/Components/TaskComponents/task_modal/TaskModal";
import TaskList from "@/Components/TaskComponents/task/TaskList";
import { useTaskModal } from "@/Hooks/useTaskModal";

export default function TasksPage({ tasks }) {
   const { isOpen: isModalOpen, editingTask, open, close, reset } = useTaskModal();

   const [activeFilters, setActiveFilters] = useState(["all"]);

   const handleApplyFilters = (newFiltersArray) => {
      const normalizedFilters = Array.isArray(newFiltersArray) && newFiltersArray.length > 0 ? newFiltersArray : ["all"];

      setActiveFilters(normalizedFilters);
   };

   const handleClearFilters = () => {
      setActiveFilters(["all"]);
   };

   const openModal = (task = null) => {
      open(task);
   };

   const closeModal = () => {
      close();
      reset();
   };

   return (
      <AppLayout>
         <Head title="Мій кабінет" />

         <div className="text-main_lightly flex flex-col lg:flex-row flex-1 min-h-0 gap-6 w-full justify-between items-stretch p-6 overflow-hidden">
            <TaskList
               openModal={openModal}
               tasks={tasks}
               activeFilters={activeFilters}
               handleApplyFilters={handleApplyFilters}
               handleClearFilters={handleClearFilters}
            />
         </div>

         <TaskModal isOpen={isModalOpen} onClose={closeModal} task={editingTask} tasks={tasks} afterLeave={reset} />
      </AppLayout>
   );
}
