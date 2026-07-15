import React from "react";

import PlannedTaskList from "./PlannedTaskList";
import CurrentTaskList from "./CurrentTaskList";
import { useTaskListView } from "./hooks/useTaskListView";

export default function TaskList({ tasks = [], openModal, activeFilters, handleApplyFilters, handleClearFilters }) {
     const { openPlanned, setOpenPlanned, searchQuery, setSearchQuery, activeSearchMode, handleSearchModeChange, searchPlaceholder, currentTasks, activeTasks, plannedTasks } = useTaskListView(
          tasks,
          activeFilters,
     );

     return (
          <div className="text-main_lightly flex flex-col lg:flex-row flex-1 min-h-0 gap-6 w-full justify-between items-stretch p-6 overflow-hidden">
               <PlannedTaskList plannedTasks={plannedTasks} openPlanned={openPlanned} setOpenPlanned={setOpenPlanned} openModal={openModal} />
               <CurrentTaskList
                    currentTasks={currentTasks}
                    activeTasks={activeTasks}
                    activeSearchMode={activeSearchMode}
                    openPlanned={openPlanned}
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
          </div>
     );
}
