import React from "react";

import { PiClockCountdownBold } from "react-icons/pi";

import EmptyState from "../../feedback/EmptyState";
import DeferredTaskInfoSection from "./Components/DeferredTaskInfoSection";
import DeferredTaskContent from "./Components/DeferredTaskContent";
import DeferredTaskToolbar from "./Components/DeferredTaskToolbar";

export default function DeferredTaskCard({
     deferredTasks = [],
     categoryLookup,
     priorityLookup,
     formatDate,
     getTaskStatusMeta,
}) {
     return (
          <div className="flex flex-col h-full w-full px-6 py-6 text-main_lightly">
               <div className="flex items-center justify-center gap-2 border-b-4 border-main_lightly/30 pb-4 shrink-0">
                    <PiClockCountdownBold className="w-8 h-8" />
                    <h1 className="text-3xl text-center font-montserrat-medium">
                         Відкладені задачі
                    </h1>
               </div>

               {deferredTasks.length === 0 ? (
                    <EmptyState title="У вас ще немає відкладених задач" />
               ) : (
                    <div className="flex flex-1 flex-col gap-4 p-8 overflow-y-auto min-h-0">
                         {deferredTasks.map((task) => {
                              const taskStatus = getTaskStatusMeta(
                                   task.is_completed,
                                   task.task_date,
                              );
                              const currentPriority = priorityLookup.get(task.priority);

                              return (
                                   <div
                                        key={task.id}
                                        className="flex items-stretch gap-0 rounded-lg bg-main_green_dark/20"
                                   >
                                        <section className="flex-1 min-w-[350px] flex flex-col pr-2 justify-between border-r-4 border-main_lightly/30">
                                             <DeferredTaskInfoSection
                                                  task={task}
                                                  taskStatus={taskStatus}
                                                  currentPriority={currentPriority}
                                                  categoryLookup={categoryLookup}
                                                  formatDate={formatDate}
                                             />
                                             <DeferredTaskContent task={task} />
                                        </section>

                                        <DeferredTaskToolbar task={task} />
                                   </div>
                              );
                         })}
                    </div>
               )}
          </div>
     );
}
