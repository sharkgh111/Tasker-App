import React, { useState, useMemo, useEffect } from "react";

import TaskToolbar from "../filter_task/TaskToolbar";
import Button from "@/ui/Button";
import Task from "@/components/TasksPageComponents/task/TaskCard";
import TaskPopover from "./ui/BaseTaskPopover";
import EmptyState from "../../../feedback/EmptyState";
import ProgressBar from "./ui/TaskProgressBar";

import { TbTargetArrow } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { LuPlus } from "react-icons/lu";

import { SEARCH_QUERY_SETTING } from "@/constants/searchQuerySetting";
import { getTaskStatusMeta } from "./utils/taskStatusUtils";

export default function CurrentTaskList({
     tasks,
     currentTasks = [],
     activeSearchMode,
     handleSearchModeChange,
     handleApplyFilters,
     handleClearFilters,
     openPlanned,
     searchQuery,
     setSearchQuery,
     searchPlaceholder,
     openModal,
     activeFilters,
}) {
     const [isReverseList, setReverseList] = useState(false);

     const [animatedPercentage, setAnimatedPercentage] = useState(() => {
          const visibleTasks = currentTasks.filter((task) => {
               const taskStatus = getTaskStatusMeta(task.is_completed, task.task_date);
               return !task.is_archived && !task.is_deferred && taskStatus.text !== "Протерміновано";
          });
          const initialTotal = visibleTasks.length;
          const initialCompleted = visibleTasks.filter((task) => task.is_completed).length;
          return initialTotal > 0 ? Math.round((initialCompleted / initialTotal) * 100) : 0;
     });

     const visibleCurrentTasks = useMemo(() => {
          return currentTasks.filter((task) => {
               const taskStatus = getTaskStatusMeta(task.is_completed, task.task_date);
               return !task.is_archived && !task.is_deferred && taskStatus.text !== "Протерміновано";
          });
     }, [currentTasks]);

     const completedTasksCount = useMemo(() => {
          return visibleCurrentTasks.filter((task) => task.is_completed).length;
     }, [visibleCurrentTasks]);

     const totalTasksCount = visibleCurrentTasks.length;
     const percentage = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

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
          <section className="w-full flex-1 gap-2 h-full flex flex-col items-center rounded-lg min-h-0">
               {currentTasks.length !== 0 && <ProgressBar percentage={percentage} animatedPercentage={animatedPercentage}/>}
               <header className="px-10 w-full flex items-center justify-between gap-2 py-2 flex-shrink-0 border-b-4 border-main_lightly/20">
                    <div className="flex items-center justify-center gap-2">
                         <TbTargetArrow className="text-main_lightly w-7 h-7" />
                         <h2 className="text-2xl text-main_lightly font-montserrat-medium mr-3">Поточні завдання</h2>
                         <span className="text-2xl text-main_lightly font-montserrat-medium">
                              {completedTasksCount}/{totalTasksCount}
                         </span>
                    </div>

                    <div className="flex-1 mx-10 relative">
                         <input
                              type="text"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="
                            w-full appearance-none transition-all duration-300 bg-main_green_light/30 
                            rounded-xl border-2 border-main_lightly px-3 text-main_lightily font-montserrat-medium 
                            text-lg cursor-text focus:border-main_green_primary placeholder:text-main_lightly/50 placeholder:italic
                        "
                              placeholder={searchPlaceholder}
                         />
                         <TaskPopover
                              icon={IoSettingsOutline}
                              type="search"
                              popoverClass="absolute top-[8px] right-2"
                              array={SEARCH_QUERY_SETTING}
                              activeSearchMode={activeSearchMode}
                              handleSearchModeChange={handleSearchModeChange}
                         />
                    </div>
                    <TaskToolbar tasks={tasks} setReverseList={setReverseList} activeFilters={activeFilters} handleApplyFilters={handleApplyFilters} handleClearFilters={handleClearFilters} />
               </header>

               <div className="flex-1 w-full min-h-0 overflow-y-auto flex flex-col items-center justify-start gap-4 p-4 rounded-lg">
                    {visibleCurrentTasks.length === 0 ? (
                         <div className="flex flex-col items-center justify-center my-auto gap-3">
                              <EmptyState title={searchQuery ? "За вашим запитом нічого не знайдено" : "У вас ще немає поточних задач"} />
                              {!searchQuery && (
                                   <Button
                                        type="button"
                                        text="Додати задачу"
                                        Icon={LuPlus}
                                        iconSize="w-5 h-5"
                                        onClick={() => openModal(null)}
                                        className="font-montserrat-bold text-sm py-1.5 px-4 bg-main_green_dark border-2 text-main_lightily"
                                   />
                              )}
                         </div>
                    ) : (
                         <Task tasks={visibleCurrentTasks} setReverseList={setReverseList} isReverseList={isReverseList} openModal={openModal} isPlanned={false} openPlanned={openPlanned} />
                    )}
               </div>
          </section>
     );
}
