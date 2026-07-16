import React from "react";

export default function ArchiveTaskInfoSection({ task, taskStatus, categoryLookup, formatDate }) {
     return (
          <div className="flex items-center justify-between p-4 border-b-4 border-main_lightly/30">
               <div className="flex flex-col items-start justify-center">
                    <h3 className="text-3xl font-montserrat-medium text-main_lightly/50">
                         {task.title || "Нова задача"}
                    </h3>
                    <p className="text-md font-montserrat-medium text-main_lightly">
                         {formatDate(task.task_date)}
                    </p>
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
