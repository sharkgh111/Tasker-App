import React, { useState } from "react";
import { Head } from "@inertiajs/react";

import AppLayout from "@/layouts/AppLayout";

import TaskModal from "@/components/TasksPageComponents/task/task_modal/TaskModal";
import TaskList from "@/components/TasksPageComponents/task/TaskList";
import { useTaskModal } from "@/components/TasksPageComponents/task/task_modal/useTaskModal";

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

               <TaskList openModal={openModal} tasks={tasks} activeFilters={activeFilters} handleApplyFilters={handleApplyFilters} handleClearFilters={handleClearFilters} />

               <TaskModal isOpen={isModalOpen} onClose={closeModal} task={editingTask} tasks={tasks} afterLeave={reset} />
          </AppLayout>
     );
}
