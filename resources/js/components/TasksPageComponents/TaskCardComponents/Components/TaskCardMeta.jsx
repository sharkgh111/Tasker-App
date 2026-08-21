import React from "react";

import { router } from "@inertiajs/react";
import { FaCheck } from "react-icons/fa6";

import Tooltip from "../../../../ui/Tooltip";

import TaskCategories from "./TaskCategories";

const PRIORITY_BG_CLASSES = {
     main_green_light: "bg-main_green_light",
     succes_light: "bg-succes_light",
     warning_light: "bg-warning_light",
     "orange-500": "bg-orange-500",
     danger_light: "bg-danger_light",
};

const getPriorityBgClass = (color) => PRIORITY_BG_CLASSES[color] || "bg-main_green_light";

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
                    <TaskCategories
                         task={task}
                         categoryLookup={categoryLookup}
                         openPlanned={openPlanned}
                    />
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
                         <Tooltip text="Виконати" align="left">
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
                         </Tooltip>
                    )}
                    {currentPriority && (
                         <span
                              className={`w-5 h-5 rounded-full border-2 border-main_lightly ${getPriorityBgClass(currentPriority.color)}`}
                         ></span>
                    )}
               </div>
          </>
     );
}
