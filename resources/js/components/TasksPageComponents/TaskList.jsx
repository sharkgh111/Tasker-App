import React, { useEffect, useState, useMemo } from "react";

import PlannedTaskList from "./PlannedTaskComponents/PlannedTaskList";
import CurrentTaskList from "./CurrentTaskComponents/CurrentTaskList";
import { useTaskListView } from "./Hooks/useTaskListView";

import ProgressBar from "./UI/TaskProgressBar";
import { getTaskStatusMeta } from "./Utils/taskStatusUtils";

export default function TaskList({
     tasks = [],
     openModal,
     activeFilters,
     handleApplyFilters,
     handleClearFilters,
}) {
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

     const [animatedPercentage, setAnimatedPercentage] = useState(() => {
          const visibleTasks = currentTasks.filter((task) => {
               const taskStatus = getTaskStatusMeta(task.is_completed, task.task_date);
               return (
                    !task.is_archived && !task.is_deferred && taskStatus.text !== "Протерміновано"
               );
          });
          const initialTotal = visibleTasks.length;
          const initialCompleted = visibleTasks.filter((task) => task.is_completed).length;
          return initialTotal > 0 ? Math.round((initialCompleted / initialTotal) * 100) : 0;
     });

     const [isReverseList, setReverseList] = useState(false);

     const visibleCurrentTasks = useMemo(() => {
          return currentTasks.filter((task) => {
               const taskStatus = getTaskStatusMeta(task.is_completed, task.task_date);
               return (
                    !task.is_archived && !task.is_deferred && taskStatus.text !== "Протерміновано"
               );
          });
     }, [currentTasks]);

     const completedTasksCount = useMemo(() => {
          return visibleCurrentTasks.filter((task) => task.is_completed).length;
     }, [visibleCurrentTasks]);

     const totalTasksCount = visibleCurrentTasks.length;
     const percentage =
          totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

     useEffect(() => {
          let start = animatedPercentage;
          const end = percentage;
          if (start === end) return;

          const duration = 1000;
          const stepTime = Math.abs(Math.floor(duration / (end - start || 1)));

          const timer = setInterval(
               () => {
                    if (start < end) {
                         start++;
                    } else {
                         start--;
                    }
                    setAnimatedPercentage(start);

                    if (start === end) {
                         clearInterval(timer);
                    }
               },
               Math.max(stepTime, 10),
          );

          return () => clearInterval(timer);
     }, [percentage]);

     return (
          <div className="text-main_lightly flex flex-col lg:flex-row flex-1 min-h-0 gap-6 w-full justify-between items-stretch p-6 overflow-hidden">
               <PlannedTaskList
                    plannedTasks={plannedTasks}
                    openPlanned={openPlanned}
                    setOpenPlanned={setOpenPlanned}
                    openModal={openModal}
               />
               {currentTasks.length !== 0 && (
                    <ProgressBar percentage={percentage} animatedPercentage={animatedPercentage} />
               )}
               <CurrentTaskList
                    currentTasks={currentTasks}
                    activeTasks={activeTasks}
                    activeSearchMode={activeSearchMode}
                    openPlanned={openPlanned}
                    isReverseList={isReverseList}
                    setReverseList={setReverseList}
                    visibleCurrentTasks={visibleCurrentTasks}
                    completedTasksCount={completedTasksCount}
                    totalTasksCount={totalTasksCount}
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
