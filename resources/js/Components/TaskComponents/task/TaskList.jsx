import React from "react";

import PlannedTaskList from "./PlannedTaskList";
import CurrentTaskList from "./CurrentTaskList";
import { useTaskListView } from "@/Hooks/useTaskListView";

export default function TaskList({ tasks = [], openModal, activeFilters, handleApplyFilters, handleClearFilters }) {
   const {
      openPlanned,
      setOpenPlanned,
      searchQuery,
      setSearchQuery,
      activeSearchMode,
      handleSearchModeChange,
      searchPlaceholder,
      currentTasks,
      activeTasks,
      plannedTasks,
   } = useTaskListView(tasks, activeFilters);

   return (
      <>
         <PlannedTaskList plannedTasks={plannedTasks} openPlanned={openPlanned} setOpenPlanned={setOpenPlanned} openModal={openModal} />
         <CurrentTaskList
            currentTasks={currentTasks}
            activeTasks={activeTasks}
            activeSearchMode={activeSearchMode}
            handleSearchModeChange={handleSearchModeChange}
            tasks={tasks}
            activeFilters={activeFilters}
            handleApplyFilters={handleApplyFilters}
            handleClearFilters={handleClearFilters}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchPlaceholder={searchPlaceholder}
            openModal={openModal}
         />
      </>
   );
}
