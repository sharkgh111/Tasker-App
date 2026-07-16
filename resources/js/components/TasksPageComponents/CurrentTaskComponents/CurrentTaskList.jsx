import React from "react";

import TaskToolbar from "../FilterTaskComponents/TaskToolbar";
import Button from "@/ui/Button";
import Task from "@/components/TasksPageComponents/TaskCardComponents/TaskCard";
import EmptyState from "../../../feedback/EmptyState";

import { LuPlus } from "react-icons/lu";

import { SEARCH_QUERY_SETTING } from "@/constants/searchQuerySetting";
import ListTaskTitle from "./Components/CurrentTaskTitle";
import SearchInputSection from "./Components/SearchInputSection";

export default function CurrentTaskList({
     tasks,
     activeSearchMode,
     isReverseList,
     handleSearchModeChange,
     handleApplyFilters,
     completedTasksCount,
     totalTasksCount,
     visibleCurrentTasks,
     setReverseList,
     handleClearFilters,
     openPlanned,
     searchQuery,
     setSearchQuery,
     searchPlaceholder,
     openModal,
     activeFilters,
}) {
     return (
          <section className="w-full flex-1 gap-2 h-full flex flex-col items-center rounded-lg min-h-0">
               <header className="px-10 w-full flex items-center justify-between gap-2 py-2 flex-shrink-0 border-b-4 border-main_lightly/20">
                    <ListTaskTitle
                         completedTasksCount={completedTasksCount}
                         totalTasksCount={totalTasksCount}
                         title="Поточні завдання"
                    />
                    <SearchInputSection
                         searchQuery={searchQuery}
                         setSearchQuery={setSearchQuery}
                         searchPlaceholder={searchPlaceholder}
                         SEARCH_QUERY_SETTING={SEARCH_QUERY_SETTING}
                         handleSearchModeChange={handleSearchModeChange}
                         activeSearchMode={activeSearchMode}
                         handleSearchModeChange={handleSearchModeChange}
                    />
                    <TaskToolbar
                         tasks={tasks}
                         setReverseList={setReverseList}
                         activeFilters={activeFilters}
                         handleApplyFilters={handleApplyFilters}
                         handleClearFilters={handleClearFilters}
                    />
               </header>

               <div className="flex-1 w-full min-h-0 overflow-y-auto flex flex-col items-center justify-start gap-4 p-4 rounded-lg">
                    {visibleCurrentTasks.length === 0 ? (
                         <div className="flex flex-col items-center justify-center my-auto gap-3">
                              <EmptyState
                                   title={
                                        searchQuery
                                             ? "За вашим запитом нічого не знайдено"
                                             : "У вас ще немає поточних задач"
                                   }
                              />
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
                         <Task
                              tasks={visibleCurrentTasks}
                              setReverseList={setReverseList}
                              isReverseList={isReverseList}
                              openModal={openModal}
                              isPlanned={false}
                              openPlanned={openPlanned}
                         />
                    )}
               </div>
          </section>
     );
}
