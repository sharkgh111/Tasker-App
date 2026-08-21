import PlannedTaskList from "./PlannedTaskComponents/PlannedTaskList";
import CurrentTaskList from "./CurrentTaskComponents/CurrentTaskList";
import ProgressBar from "./UI/TaskProgressBar";

import { useTaskListView } from "./Hooks/useTaskListView";
import { useTaskProgress } from "./Hooks/useTaskProgress";
import { useAutoArchiveExpiredTasks } from "./Hooks/useAutoArchiveExpiredTasks";

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

     useAutoArchiveExpiredTasks(currentTasks);

     const { percentage, visibleCurrentTasks, completedTasksCount, totalTasksCount } =
          useTaskProgress(currentTasks, getTaskStatusMeta);

     return (
          <div className="text-main_lightly flex flex-col lg:flex-row flex-1 min-h-0 gap-6 w-full justify-between items-stretch p-6">
               <PlannedTaskList
                    plannedTasks={plannedTasks}
                    openPlanned={openPlanned}
                    setOpenPlanned={setOpenPlanned}
                    openModal={openModal}
               />

               {currentTasks.length !== 0 && <ProgressBar percentage={percentage} />}

               <CurrentTaskList
                    currentTasks={currentTasks}
                    activeTasks={activeTasks}
                    activeSearchMode={activeSearchMode}
                    openPlanned={openPlanned}
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
