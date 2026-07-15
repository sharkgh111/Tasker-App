import React from "react";
import { router } from "@inertiajs/react";

import IconButton from "@/ui/IconButton";
import { FaRegTrashCan } from "react-icons/fa6";
import { TASK_CATEGORIES } from "@/constants/taskCategories";
import { getTaskStatusMeta } from "@/components/TasksPageComponents/task/utils/taskStatusUtils";

export default function ArchiveTaskCard({ task = {}, className = "" }) {
     const categoryLookup = new Map(TASK_CATEGORIES.map((category) => [category.name, category]));
     const taskStatus = getTaskStatusMeta(task.is_completed, task.task_date);

     const formatDate = (value) => {
          if (!value) return "Термін не вказано";
          const date = new Date(value.replace("T", " "));
          if (isNaN(date.getTime())) return "Термін не вказано";

          const now = new Date();
          const deadlineText = date.toLocaleString("uk-UA", {
               day: "numeric",
               month: "long",
               year: "numeric",
          });

          if (now.getTime() > date.getTime()) {
               const timeText = date.toLocaleTimeString("uk-UA", {
                    hour: "2-digit",
                    minute: "2-digit",
               });
               return `Термін вийшов ${deadlineText} о ${timeText}`;
          }

          return `До ${deadlineText}`;
     };

     const handleDelete = () => {
          if (confirm("Ви впевнені, що хочете видалити цю архівну задачу?")) {
               router.delete(`/tasks/${task.id}`);
          }
     };

     return (
          <>
               <div className={`flex items-stretch gap-0 bg-main_green_dark/20 rounded-lg ${className}`}>
                    <section className="flex-1 min-w-[350px] flex flex-col pr-2 justify-between border-r-4 border-main_lightly/30">
                         <div className="flex items-center justify-between p-4 border-b-4 border-main_lightly/30">
                              <div className="flex flex-col items-start justify-center">
                                   <h3 className="text-3xl font-montserrat-medium text-main_lightly/50">{task.title || "Нова задача"}</h3>
                                   <p className="text-md font-montserrat-medium text-main_lightly">{formatDate(task.task_date)}</p>
                              </div>

                              <div className="flex gap-2 items-end justify-center flex-col-reverse">
                                   {taskStatus.text === "Протерміновано" && (
                                        <span className="text-[12px] uppercase tracking-wider font-montserrat-bold px-2 py-0.5 border-2 border-danger_light text-danger_light rounded-md whitespace-nowrap">
                                             {taskStatus.text}
                                        </span>
                                   )}

                                   {task.categories && task.categories.length > 0 && (
                                        <div className="flex flex-wrap items-center justify-end gap-1">
                                             {task.categories.map((categoryName, idx) => {
                                                  const originalCategory = categoryLookup.get(categoryName);

                                                  return (
                                                       <span
                                                            key={idx}
                                                            className="flex items-center gap-1 px-2 py-0.5 text-xs font-montserrat-medium bg-main_green_primary/40 border border-main_lightly/10 text-main_lightly/90 rounded-md select-none whitespace-nowrap"
                                                       >
                                                            {originalCategory && <span>{originalCategory.emoji}</span>}
                                                            <span>{categoryName}</span>
                                                       </span>
                                                  );
                                             })}
                                        </div>
                                   )}
                              </div>
                         </div>
                         <div className="flex flex-1 items-center py-2 justify-center">
                              <div className="flex-2 py-5 content-center h-full border-r-4 border-main_lightly/30">
                                   <p className="text-left text-xl px-10 max-w-[300px] font-montserrat-medium text-main_lightly/50">{task.description || "Опис відсутній"}</p>
                              </div>
                              <div className="flex-1 flex items-center justify-center flex-col p-4 gap-2 w-full">
                                   {Array.isArray(task.subtasks) && task.subtasks.length > 0 ? (
                                        task.subtasks.map((subtask, idx) => (
                                             <div key={subtask.id ?? `${task.id}-${idx}`} className="w-full rounded-md border border-main_lightly/20 bg-main_green_dark/20 px-3 py-2">
                                                  <div className="flex items-center justify-between gap-2">
                                                       <span className="text-main_lightly font-montserrat-medium">{subtask.title || "Без назви"}</span>
                                                  </div>
                                             </div>
                                        ))
                                   ) : (
                                        <span className="text-sm font-montserrat-medium text-main_lightly/70">Немає підзадач</span>
                                   )}
                              </div>
                         </div>
                    </section>
                    <section className="flex-none w-[100px] min-w-[100px] flex flex-col items-center justify-center p-4">
                         <div className="w-full h-full flex flex-col items-center justify-evenly gap-2">
                              <IconButton
                                   Icon={FaRegTrashCan}
                                   type="button"
                                   onClick={handleDelete}
                                   className="bg-danger_light border-2 border-main_lightly hover:bg-danger_light/80 hover:scale-95"
                                   iconSize="w-9 h-9"
                              />
                         </div>
                    </section>
               </div>
          </>
     );
}
