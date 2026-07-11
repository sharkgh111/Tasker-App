import React, { useState, useMemo, useCallback } from "react";

import TaskToolbar from "../filter_task/TaskToolbar";
import Button from "@/Components/UI/Button";
import Task from "@/Components/TaskComponents/task/TaskCard";
import BasePopover from "../../UI/BasePopover";

import { PiSmileySad } from "react-icons/pi";
import { TbTargetArrow } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { LuPlus } from "react-icons/lu";

import { SEARCH_QUERY_SETTING } from "@/Constants/searchQuerySetting";

export default function CurrentTaskList({
   tasks,
   currentTasks = [],
   activeSearchMode,
   handleSearchModeChange,
   handleApplyFilters,
   handleClearFilters,
   activeTasks,
   searchQuery,
   setSearchQuery,
   searchPlaceholder,
   openModal,
   activeFilters,
}) {
   const [isReverseList, setReverseList] = useState(false);

   const completedTasksCount = useMemo(() => {
      return currentTasks.filter((task) => task.is_completed).length;
   }, [currentTasks]);

   const totalTasksCount = activeTasks.length;

   return (
      <section className="w-full flex-1 p-5 gap-5 h-full flex flex-col items-center rounded-lg min-h-0">
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
               <BasePopover
                  icon={IoSettingsOutline}
                  type="search"
                  popoverClass="absolute top-[7px] right-2"
                  array={SEARCH_QUERY_SETTING}
                  activeSearchMode={activeSearchMode}
                  handleSearchModeChange={handleSearchModeChange}
               />
            </div>

            <div className="flex items-center justify-center gap-3">
               <TaskToolbar
                  tasks={tasks}
                  isReverseList={isReverseList}
                  setReverseList={setReverseList}
                  activeFilters={activeFilters}
                  handleApplyFilters={handleApplyFilters}
                  handleClearFilters={handleClearFilters}
               />
            </div>
         </header>

         <div className="flex-1 w-full min-h-0 overflow-y-auto flex flex-col items-center justify-start gap-4 p-4 rounded-lg">
            {currentTasks.length === 0 ? (
               <div className="flex flex-col items-center justify-center my-auto gap-3">
                  <div className="flex flex-col items-center justify-center my-auto w-full">
                     <PiSmileySad className="w-10 h-10 text-main_lightly" />
                     <p className="text-lg font-montserrat-regular">{searchQuery ? "За вашим запитом задач не знайдено" : "У вас немає поточних задач"}</p>
                  </div>
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
               <Task tasks={currentTasks} setReverseList={setReverseList} isReverseList={isReverseList} openModal={openModal} isPlanned={false} />
            )}
         </div>
      </section>
   );
}
