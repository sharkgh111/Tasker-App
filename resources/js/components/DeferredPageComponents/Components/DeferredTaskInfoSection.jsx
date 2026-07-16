import React from "react";

export default function DeferredTaskInfoSection({
     task,
     taskStatus,
     currentPriority,
     categoryLookup,
     formatDate,
}) {
     return (
          <div className="flex items-center justify-between p-4 border-b-4 border-main_lightly/30">
               <div className="flex flex-col items-start justify-center">
                    <h3 className="text-3xl font-montserrat-medium text-main_lightly">
                         {task.title || "Нова задача"}
                    </h3>
                    <p className="text-md font-montserrat-medium text-main_lightly/50">
                         {formatDate(task.task_date)}
                    </p>
               </div>

               <div className="flex gap-5 p-2 flex-col-reverse">
                    <div className="flex items-center justify-end gap-3 w-full">
                         <span
                              className={`text-[12px] uppercase tracking-wider font-montserrat-bold px-2 py-0.5 border-2 rounded-md whitespace-nowrap ${taskStatus.color}`}
                         >
                              {taskStatus.text}
                         </span>
                         {currentPriority && (
                              <span
                                   className={`h-5 w-5 content-center rounded-full border-2 border-main_lightly bg-${currentPriority.color}`}
                              />
                         )}
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
                                             {originalCategory && (
                                                  <span>{originalCategory.emoji}</span>
                                             )}
                                             <span>{categoryName}</span>
                                        </span>
                                   );
                              })}
                         </div>
                    )}
               </div>
          </div>
     );
}
