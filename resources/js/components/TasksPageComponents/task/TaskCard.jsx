import React, { useEffect, useMemo, useRef } from "react";
import { LuPlus } from "react-icons/lu";
import { FaCheck, FaPencil, FaRegTrashCan } from "react-icons/fa6";
import { FaClockRotateLeft } from "react-icons/fa6";

import { router } from "@inertiajs/react";
import IconButton from "@/ui/IconButton";
import Button from "@/ui/Button";
import SubTaskList from "./subtask/SubTaskList";
import { TASK_CATEGORIES } from "@/constants/taskCategories";
import { PRIORITY_OPTIONS } from "@/constants/priorityOptions";
import { formatTaskCompletionText, formatTaskUploadDate, getTaskStatusMeta } from "./utils/taskStatusUtils";

export default function Task({ openPlanned, tasks, isReverseList, openModal, isPlanned = false }) {
     const priorityLookup = useMemo(() => new Map(PRIORITY_OPTIONS.map((option) => [option.value, option])), []);
     const categoryLookup = useMemo(() => new Map(TASK_CATEGORIES.map((category) => [category.name, category])), []);
     const archivedTaskIds = useRef(new Set());

     useEffect(() => {
          if (isPlanned || !Array.isArray(tasks)) {
               return;
          }

          tasks.forEach((task) => {
               const taskStatus = getTaskStatusMeta(task.is_completed, task.task_date);

               if (task.is_completed || task.is_archived || taskStatus.text !== "Протерміновано") {
                    return;
               }

               if (archivedTaskIds.current.has(task.id)) {
                    return;
               }

               archivedTaskIds.current.add(task.id);

               router.patch(
                    `/tasks/${task.id}`,
                    {
                         is_archived: true,
                    },
                    {
                         preserveScroll: true,
                         preserveState: true,
                         only: ["tasks"],
                    },
               );
          });
     }, [isPlanned, tasks]);

     if (!Array.isArray(tasks) || tasks.length === 0) {
          return null;
     }

     return (
          <>
               <div className={`flex w-full flex-col items-center gap-5 ${isReverseList ? "flex-col-reverse" : "flex-col"} justify-center`}>
                    {tasks.map((task) => {
                         const taskStatus = getTaskStatusMeta(task.is_completed, task.task_date);
                         const currentPriority = priorityLookup.get(task.priority);

                         return (
                              <section
                                   key={task.id}
                                   className={`flex items-center shadow-xl justify-between w-full flex-col ${!isPlanned ? "bg-main_green_dark/30" : "bg-main_green_light/20"}  rounded-xl transition-all`}
                              >
                                   <div className="flex w-full items-center justify-between border-b-4 border-main_lightly/30">
                                        <div className={`flex flex-1 ${isPlanned ? "px-2" : "px-4"} flex-row gap-4 items-stretch justify-between min-w-0`}>
                                             <div className={`flex ${isPlanned ? "flex-row items-center" : "flex-col items-start"} justify-between min-w-0`}>
                                                  <div className="flex w-fit max-w-full flex-col items-start text-base justify-center min-w-0">
                                                       <div className="flex flex-col items-start w-fit max-w-full pr-3 border-l-4 border-main_lightly/30">
                                                            <div className="flex flex-col p-4">
                                                                 <h3
                                                                      className={`inline-block max-w-full text-2xl font-montserrat-medium transition-all duration-300 
                                                                                ${task.is_completed ? "line-through text-main_lightly/50" : "text-main_lightly"}  
                                                                                ${taskStatus.text === "Протерміновано" ? " text-main_lightly/50" : "text-main_lightly"}`}
                                                                 >
                                                                      {task.title}
                                                                 </h3>
                                                                 <span className={`font-montserrat-regular w-fit text-main_lightly whitespace-nowrap`}>{formatTaskCompletionText(task)}</span>
                                                                 {isPlanned && task.upload_date && (
                                                                      <span className="font-montserrat-regular text-main_lightly rounded-md whitespace-nowrap">
                                                                           Застосувати: {formatTaskUploadDate(task.upload_date)}
                                                                      </span>
                                                                 )}
                                                            </div>

                                                            {task.description && (
                                                                 <div className="w-full p-4 border-t-4 border-main_lightly/30">
                                                                      <p
                                                                           className={`w-full min-w-0 font-montserrat-medium break-words whitespace-pre-wrap text-left text-lg transition-all duration-300 
                                                                                     ${task.is_completed ? "text-main_lightly/60" : "text-main_lightly"}
                                                                                     ${taskStatus.text === "Протерміновано" ? " text-main_lightly/50" : "text-main_lightly"}`}
                                                                      >
                                                                           {task.description}
                                                                      </p>
                                                                 </div>
                                                            )}
                                                       </div>
                                                  </div>
                                             </div>

                                             <div className="flex flex-1 flex-col items-end justify-center py-5 gap-5 w-full">
                                                  {task.categories && task.categories.length > 0 && (
                                                       <div className="flex flex-wrap gap-2 justify-end">
                                                            {task.categories.map((categoryName, idx) => {
                                                                 const originalCategory = categoryLookup.get(categoryName);

                                                                 return (
                                                                      <span
                                                                           key={idx}
                                                                           className={`
                                                                                     ${(openPlanned ? "text-[10px]" : "text-base", openPlanned && task.categories.length >= 5 ? "text-[7px]" : "text-base")} 
                                                                                     transition-all duration-200 flex items-center gap-1 px-2 py-0.5 
                                                                                     font-montserrat-medium bg-main_green_primary/40 border 
                                                                                     border-main_lightly/10 text-main_lightly/90 rounded-md select-none
                                                                                `}
                                                                      >
                                                                           {originalCategory && <span>{originalCategory.emoji}</span>}
                                                                           <span>{categoryName}</span>
                                                                      </span>
                                                                 );
                                                            })}
                                                       </div>
                                                  )}
                                                  <div className="flex items-center justify-end gap-2 w-full">
                                                       {!isPlanned && (
                                                            <span
                                                                 className={`text-[12px] uppercase tracking-wider font-montserrat-bold px-2 py-0.5 border-2 shadow-lg rounded-md whitespace-nowrap transition-all duration-300 ${taskStatus.color}`}
                                                            >
                                                                 {taskStatus.text}
                                                            </span>
                                                       )}
                                                       {!isPlanned && taskStatus.text !== "Протерміновано" && (
                                                            <label className="relative flex items-center cursor-pointer select-none flex-shrink-0">
                                                                 <button
                                                                      type="button"
                                                                      onClick={() =>
                                                                           router.patch(
                                                                                `/tasks/${task.id}`,
                                                                                {
                                                                                     is_completed: !task.is_completed,
                                                                                },
                                                                                {
                                                                                     preserveScroll: true,
                                                                                     preserveState: true,
                                                                                     only: ["tasks"],
                                                                                },
                                                                           )
                                                                      }
                                                                      className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                                                                           task.is_completed ? "border-succes_light text-succes_light" : "border-main_lightly bg-transparent text-transparent"
                                                                      }`}
                                                                 >
                                                                      <FaCheck className="w-3 h-3" />
                                                                 </button>
                                                            </label>
                                                       )}
                                                       {currentPriority && <span className={`w-5 h-5 rounded-full border-2 border-main_lightly bg-${currentPriority.color}`}></span>}
                                                  </div>
                                             </div>
                                        </div>
                                   </div>

                                   <div className={`flex w-full items-center justify-between gap-4 ${isPlanned ? "px-2" : "px-4"}`}>
                                        <div className="flex flex-grow items-center justify-center flex-1 h-full border-x-4 border-main_lightly/30">
                                             <SubTaskList isTaskActive={!isPlanned} subtasks={task.subtasks} taskStatus={taskStatus} />
                                        </div>
                                        <div className="py-3 flex flex-col gap-2 items-center justify-between flex-shrink-0">
                                             {!task.is_completed && task.can_edit && taskStatus.text !== "Протерміновано" && (
                                                  <IconButton
                                                       Icon={FaPencil}
                                                       type="button"
                                                       onClick={() => openModal(task)}
                                                       className="bg-main_green_dark border-2 border-main_lightly hover:bg-main_green_dark/80 hover:scale-95"
                                                       iconSize="w-6 h-6"
                                                  />
                                             )}
                                             {!isPlanned && (
                                                  <IconButton
                                                       Icon={FaClockRotateLeft}
                                                       type="button"
                                                       onClick={() =>
                                                            router.patch(
                                                                 `/tasks/${task.id}`,
                                                                 {
                                                                      is_archived: false,
                                                                      is_deferred: true,
                                                                 },
                                                                 {
                                                                      preserveScroll: true,
                                                                      preserveState: true,
                                                                      only: ["tasks"],
                                                                 },
                                                            )
                                                       }
                                                       className="bg-main_green_primary border-2 border-main_lightly hover:bg-main_green_primary/80 hover:scale-95"
                                                       iconSize="w-6 h-6"
                                                  />
                                             )}

                                             <IconButton
                                                  Icon={FaRegTrashCan}
                                                  onClick={() => {
                                                       if (confirm("Ви впевнені, що хочете видалити цю задачу?")) {
                                                            router.delete(`/tasks/${task.id}`);
                                                       }
                                                  }}
                                                  type="button"
                                                  className="bg-danger_light border-2 border-main_lightly hover:bg-danger_light/80 hover:scale-95"
                                                  iconSize="w-6 h-6"
                                             />
                                        </div>
                                   </div>
                              </section>
                         );
                    })}
               </div>
               {!isPlanned && (
                    <Button type="button" Icon={LuPlus} iconSize="w-7 h-7" onClick={() => openModal(null)} className="font-montserrat-bold px-[45px] bg-main_green_dark hover:bg-main_green_dark/80" />
               )}
          </>
     );
}
