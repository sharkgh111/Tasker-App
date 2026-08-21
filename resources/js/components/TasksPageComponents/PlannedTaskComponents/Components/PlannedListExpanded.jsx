import React from "react";

import Task from "@/components/TasksPageComponents/TaskCardComponents/TaskCard";

import Tooltip from "../../../../ui/Tooltip";

import { LuChevronRight, LuChevronLeft } from "react-icons/lu";
import EmptyState from "@/feedback/EmptyState";

export default function PlannedListExpanded({
     unreadPlannedCount,
     handleOpenPlanned,
     openPlanned,
     handleClosePlanned,
     plannedTasks,
     openModal,
}) {
     return (
          <>
               {!openPlanned ? (
                    <>
                         {unreadPlannedCount > 0 && (
                              <button
                                   type="button"
                                   onClick={handleOpenPlanned}
                                   className="inline-flex cursor-pointer absolute -top-2 -right-2 items-center justify-center h-8 w-8 rounded-full bg-danger_light text-main_lightly text-sm font-semibold"
                              >
                                   {unreadPlannedCount}
                              </button>
                         )}
                         <Tooltip text="Відкрити заплановані задачі" delay={300} align="left">
                              <button
                                   type="button"
                                   onClick={handleOpenPlanned}
                                   className="flex items-center justify-center w-10 h-10 rounded-full bg-main_green_dark border-2 border-main_lightly text-main_lightly hover:bg-main_green_dark transition-colors duration-200"
                              >
                                   <LuChevronRight className="w-5 h-5" />
                              </button>
                         </Tooltip>
                    </>
               ) : (
                    <>
                         <div className="w-full absolute top-[50%] -right-2 flex justify-end">
                              <Tooltip text="Закрити заплановані задачі" delay={300} align="left">
                                   <button
                                        type="button"
                                        onClick={handleClosePlanned}
                                        className="flex items-center justify-center w-10 h-10 rounded-full bg-main_green_dark border-2 border-main_lightly text-main_lightly hover:bg-main_green_dark transition-colors duration-200"
                                   >
                                        <LuChevronLeft className="w-5 h-5" />
                                   </button>
                              </Tooltip>
                         </div>
                         {plannedTasks.length === 0 ? (
                              <EmptyState title="У вас ще немає запланованих задач" />
                         ) : (
                              <Task tasks={plannedTasks} openModal={openModal} isPlanned={true} />
                         )}
                    </>
               )}
          </>
     );
}
