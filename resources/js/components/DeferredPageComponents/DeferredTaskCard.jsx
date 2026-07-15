import React from "react";

import { router } from "@inertiajs/react";

import { FaRegTrashCan, FaRotateLeft } from "react-icons/fa6";
import IconButton from "@/ui/IconButton";
import { PiClockCountdownBold } from "react-icons/pi";

import EmptyState from "../../feedback/EmptyState";

export default function DeferredTaskCard({ deferredTasks = [], categoryLookup, priorityLookup, formatDate, getTaskStatusMeta }) {
     return (
          <div className="flex flex-col h-full w-full px-6 py-6 text-main_lightly">
               <div className="flex items-center justify-center gap-2 border-b-4 border-main_lightly/30 pb-4 shrink-0">
                    <PiClockCountdownBold className="w-8 h-8" />
                    <h1 className="text-3xl text-center font-montserrat-medium">Відкладені задачі</h1>
               </div>

               {deferredTasks.length === 0 ? (
                    <EmptyState title="У вас ще немає відкладених задач" />
               ) : (
                    <div className="flex flex-1 flex-col gap-4 p-8 overflow-y-auto min-h-0">
                         {deferredTasks.map((task) => {
                              const taskStatus = getTaskStatusMeta(task.is_completed, task.task_date);
                              const currentPriority = priorityLookup.get(task.priority);

                              return (
                                   <div key={task.id} className="flex items-stretch gap-0 rounded-lg bg-main_green_dark/20">
                                        <section className="flex-1 min-w-[350px] flex flex-col pr-2 justify-between border-r-4 border-main_lightly/30">
                                             <div className="flex items-center justify-between p-4 border-b-4 border-main_lightly/30">
                                                  <div className="flex flex-col items-start justify-center">
                                                       <h3 className="text-3xl font-montserrat-medium text-main_lightly">{task.title || "Нова задача"}</h3>
                                                       <p className="text-md font-montserrat-medium text-main_lightly/50">{formatDate(task.task_date)}</p>
                                                  </div>

                                                  <div className="flex gap-5 p-2 flex-col-reverse">
                                                       <div className="flex items-center justify-end gap-3 w-full">
                                                            <span
                                                                 className={`text-[12px] uppercase tracking-wider font-montserrat-bold px-2 py-0.5 border-2 rounded-md whitespace-nowrap ${taskStatus.color}`}
                                                            >
                                                                 {taskStatus.text}
                                                            </span>
                                                            {currentPriority && <span className={`h-5 w-5 content-center rounded-full border-2 border-main_lightly bg-${currentPriority.color}`} />}
                                                       </div>

                                                       {task.categories && task.categories.length > 0 && (
                                                            <div className="flex flex-wrap items-center justify-end gap-1">
                                                                 {task.categories.map((categoryName, idx) => {
                                                                      const originalCategory = categoryLookup.get(categoryName);

                                                                      return (
                                                                           <span
                                                                                key={`${task.id}-${idx}`}
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
                                                  <div className="flex-2 py-5 text-lg px-10 content-center h-full max-w-[500px] border-r-4 border-main_lightly/30">
                                                       {task.description || "Опис відсутній"}
                                                  </div>
                                                  <div className="flex-1 flex items-center justify-center flex-col p-4 gap-2 w-full">
                                                       {Array.isArray(task.subtasks) && task.subtasks.length > 0 ? (
                                                            task.subtasks.map((subtask, idx) => (
                                                                 <div
                                                                      key={subtask.id ?? `${task.id}-${idx}`}
                                                                      className="w-full rounded-md border border-main_lightly/20 bg-main_green_dark/20 px-3 py-2"
                                                                 >
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
                                             <div className="w-full h-full flex flex-col items-center justify-center gap-5">
                                                  <IconButton
                                                       Icon={FaRotateLeft}
                                                       type="button"
                                                       onClick={() =>
                                                            router.patch(
                                                                 `/tasks/${task.id}`,
                                                                 {
                                                                      is_deferred: false,
                                                                      is_archived: false,
                                                                 },
                                                                 {
                                                                      preserveScroll: true,
                                                                      preserveState: true,
                                                                      only: ["deferredTasks"],
                                                                 },
                                                            )
                                                       }
                                                       className="bg-main_green_primary border-2 border-main_lightly hover:bg-main_green_primary/80 hover:scale-95"
                                                       iconSize="w-9 h-9"
                                                  />
                                                  <IconButton
                                                       Icon={FaRegTrashCan}
                                                       type="button"
                                                       onClick={() => {
                                                            if (confirm("Ви впевнені, що хочете видалити цю відкладену задачу?")) {
                                                                 router.delete(`/tasks/${task.id}`);
                                                            }
                                                       }}
                                                       className="bg-danger_light border-2 border-main_lightly hover:bg-danger_light/80 hover:scale-95"
                                                       iconSize="w-9 h-9"
                                                  />
                                             </div>
                                        </section>
                                   </div>
                              );
                         })}
                    </div>
               )}
          </div>
     );
}
