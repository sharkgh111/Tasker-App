import React from "react";

import { router } from "@inertiajs/react";
import { FaCheck } from "react-icons/fa6";

export default function TaskCardMeta({
     task,
     categoryLookup,
     openPlanned,
     isPlanned,
     taskStatus,
     currentPriority,
}) {
     return (
          <>
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
                                        task.is_completed
                                             ? "border-succes_light text-succes_light"
                                             : "border-main_lightly bg-transparent text-transparent"
                                   }`}
                              >
                                   <FaCheck className="w-3 h-3" />
                              </button>
                         </label>
                    )}
                    {currentPriority && (
                         <span
                              className={`w-5 h-5 rounded-full border-2 border-main_lightly bg-${currentPriority.color}`}
                         ></span>
                    )}
               </div>
          </>
     );
}
