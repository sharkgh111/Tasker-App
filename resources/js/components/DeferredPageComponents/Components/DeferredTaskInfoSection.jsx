import React from "react";

import TaskCardHeader from "@/components/TasksPageComponents/TaskCardComponents/Components/TaskCardHeader";
import TaskCategories from "../../TasksPageComponents/TaskCardComponents/Components/TaskCategories";

const PRIORITY_BG_CLASSES = {
     main_green_light: "bg-main_green_light",
     succes_light: "bg-succes_light",
     warning_light: "bg-warning_light",
     "orange-500": "bg-orange-500",
     danger_light: "bg-danger_light",
};

const getPriorityBgClass = (color) => PRIORITY_BG_CLASSES[color] || "bg-main_green_light";

export default function DeferredTaskInfoSection({
     task,
     taskStatus,
     currentPriority,
     categoryLookup,
     formatDate,
}) {
     return (
          <TaskCardHeader
               task={task}
               formatDate={formatDate}
               titleClassName="text-3xl font-montserrat-medium text-main_lightly"
               subtitleClassName="text-md font-montserrat-medium text-main_lightly/50"
               renderMeta={(currentTask) => (
                    <div className="flex gap-5 p-2 flex-col-reverse">
                         <div className="flex items-center justify-end gap-3 w-full">
                              <span
                                   className={`text-[12px] uppercase tracking-wider font-montserrat-bold px-2 py-0.5 border-2 rounded-md whitespace-nowrap ${taskStatus.color}`}
                              >
                                   {taskStatus.text}
                              </span>
                              {currentPriority && (
                                   <span
                                        className={`h-5 w-5 content-center rounded-full border-2 border-main_lightly ${getPriorityBgClass(currentPriority.color)}`}
                                   />
                              )}
                         </div>

                         {currentTask.categories && currentTask.categories.length > 0 && (
                              <TaskCategories task={currentTask} categoryLookup={categoryLookup} />
                         )}
                    </div>
               )}
          />
     );
}
