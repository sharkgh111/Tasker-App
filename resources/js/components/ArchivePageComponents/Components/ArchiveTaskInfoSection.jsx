import React from "react";

import TaskCardHeader from "@/components/TasksPageComponents/TaskCardComponents/Components/TaskCardHeader";
import TaskCategories from "../../TasksPageComponents/TaskCardComponents/Components/TaskCategories";

export default function ArchiveTaskInfoSection({ task, taskStatus, categoryLookup, formatDate }) {
     return (
          <TaskCardHeader
               task={task}
               formatDate={formatDate}
               titleClassName="text-3xl font-montserrat-medium text-main_lightly/50"
               subtitleClassName="text-md font-montserrat-medium text-main_lightly"
               renderMeta={(currentTask) => (
                    <>
                         {taskStatus.text === "Протерміновано" && (
                              <span className="text-[12px] uppercase tracking-wider font-montserrat-bold px-2 py-0.5 border-2 border-danger_light text-danger_light rounded-md whitespace-nowrap">
                                   {taskStatus.text}
                              </span>
                         )}

                         {currentTask.categories && currentTask.categories.length > 0 && (
                              <TaskCategories task={currentTask} categoryLookup={categoryLookup} />
                         )}
                    </>
               )}
          />
     );
}
