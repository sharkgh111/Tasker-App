import React, { useMemo } from "react";
import { LuPlus } from "react-icons/lu";

import Button from "@/ui/Button";
import SubTaskList from "./Components/SubTaskList";
import InfoSection from "./Components/TaskCardInfoSection";
import TaskToolbar from "./Components/TaskCardToolbar";

import { TASK_CATEGORIES } from "@/constants/taskCategories";
import { PRIORITY_OPTIONS } from "@/constants/priorityOptions";
import {
     formatTaskCompletionText,
     formatTaskUploadDate,
     getTaskStatusMeta,
} from "../Utils/taskStatusUtils";

export default function Task({ openPlanned, tasks, isReverseList, openModal, isPlanned = false }) {
     const priorityLookup = useMemo(
          () => new Map(PRIORITY_OPTIONS.map((option) => [option.value, option])),
          [],
     );
     const categoryLookup = useMemo(
          () => new Map(TASK_CATEGORIES.map((category) => [category.name, category])),
          [],
     );

     if (!Array.isArray(tasks) || tasks.length === 0) {
          return null;
     }

     return (
          <>
               <div
                    className={`flex w-full flex-col items-center gap-5 ${isReverseList ? "flex-col-reverse" : "flex-col"} justify-center`}
               >
                    {tasks.map((task) => {
                         const taskStatus = getTaskStatusMeta(task.is_completed, task.task_date);
                         const currentPriority = priorityLookup.get(task.priority);

                         return (
                              <section
                                   key={task.id}
                                   className={`flex items-center shadow-xl justify-between w-full flex-col ${!isPlanned ? "bg-main_green_dark/30" : "bg-main_green_light/20"}  rounded-xl transition-all`}
                              >
                                   <InfoSection
                                        task={task}
                                        taskStatus={taskStatus}
                                        openPlanned={openPlanned}
                                        isPlanned={isPlanned}
                                        currentPriority={currentPriority}
                                        categoryLookup={categoryLookup}
                                        formatTaskCompletionText={formatTaskCompletionText}
                                        formatTaskUploadDate={formatTaskUploadDate}
                                   />

                                   <div
                                        className={`flex w-full items-center justify-between gap-4 ${isPlanned ? "px-2" : "px-4"}`}
                                   >
                                        <SubTaskList
                                             isTaskActive={!isPlanned}
                                             subtasks={task.subtasks}
                                             taskStatus={taskStatus}
                                        />
                                        <TaskToolbar
                                             task={task}
                                             taskStatus={taskStatus}
                                             isPlanned={isPlanned}
                                             openModal={openModal}
                                        />
                                   </div>
                              </section>
                         );
                    })}
               </div>
               {!isPlanned && (
                    <Button
                         type="button"
                         Icon={LuPlus}
                         iconSize="w-7 h-7"
                         onClick={() => openModal(null)}
                         className="font-montserrat-bold px-[45px] bg-main_green_dark hover:bg-main_green_dark/80"
                    />
               )}
          </>
     );
}
