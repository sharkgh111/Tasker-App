import React from "react";
import { LuChevronRight, LuChevronLeft } from "react-icons/lu";
import { GoClock } from "react-icons/go";
import { PiSmileySad } from "react-icons/pi";
import Task from "@/Components/TaskComponents/task/TaskCard";
import { usePlannedTaskNotifications } from "@/Hooks/usePlannedTaskNotifications";

export default function PlannedTaskList({ plannedTasks = [], openPlanned, setOpenPlanned, openModal }) {
   const { unreadPlannedCount, handleClosePlanned, handleOpenPlanned } = usePlannedTaskNotifications(plannedTasks, openPlanned, setOpenPlanned);

   return (
      <section
         className={`w-full ${openPlanned ? "lg:w-[30%]" : "lg:w-20"} shadow-xl relative p-5 gap-5 h-full flex flex-col items-center bg-main_green_dark/10 rounded-lg min-h-0 transition-all duration-300`}
      >
         <div className={`border-b-4 border-main_lightly/20 w-full ${openPlanned ? "px-10 py-2" : "p-0 border-none"} transition-all duration-300`}>
            {openPlanned && (
               <div className="flex items-center justify-center gap-3 transition-all duration-100">
                  <GoClock className="text-main_lightly w-7 h-7" />
                  <h2 className="text-2xl text-main_lightly font-montserrat-medium">Заплановані завдання</h2>
               </div>
            )}
         </div>

         <div
            className={`flex-1 w-full min-h-0 overflow-y-auto flex flex-col ${openPlanned ? "items-start gap-4 p-4 justify-start" : "items-center justify-center p-0"}`}
         >
            {!openPlanned ? (
               <div className="flex flex-col items-center justify-center w-full gap-3">
                  {unreadPlannedCount > 0 && (
                     <button
                        type="button"
                        onClick={handleOpenPlanned}
                        className="inline-flex cursor-pointer absolute -top-2 -right-2 items-center justify-center h-8 w-8 rounded-full bg-danger_light text-main_lightly text-sm font-semibold"
                     >
                        {unreadPlannedCount}
                     </button>
                  )}
                  <button
                     type="button"
                     onClick={handleOpenPlanned}
                     className="flex items-center justify-center w-10 h-10 rounded-full bg-main_green_dark border-2 border-main_lightly text-main_lightly hover:bg-main_green_dark transition-colors duration-200"
                  >
                     <LuChevronRight className="w-5 h-5" />
                  </button>
               </div>
            ) : (
               <>
                  <div className="w-full absolute top-[50%] -right-2 flex justify-end">
                     <button
                        type="button"
                        onClick={handleClosePlanned}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-main_green_dark border-2 border-main_lightly text-main_lightly hover:bg-main_green_dark transition-colors duration-200"
                     >
                        <LuChevronLeft className="w-5 h-5" />
                     </button>
                  </div>
                  {plannedTasks.length === 0 ? (
                     <div className="flex flex-col items-center justify-center my-auto w-full">
                        <PiSmileySad className="w-10 h-10 text-main_lightly" />
                        <p className="text-lg font-montserrat-regular">Тут поки нічого немає</p>
                     </div>
                  ) : (
                     <Task tasks={plannedTasks} openModal={openModal} isPlanned={true} />
                  )}
               </>
            )}
         </div>
      </section>
   );
}
