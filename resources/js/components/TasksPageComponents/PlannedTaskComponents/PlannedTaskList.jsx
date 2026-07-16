import React from "react";

import { usePlannedTaskNotifications } from "../Hooks/usePlannedTaskNotifications";

import PlannedListExpanded from "./Components/PlannedListExpanded";

import ListTaskTitle from "./Components/PlannedTaskTitle";

export default function PlannedTaskList({
     plannedTasks = [],
     openPlanned,
     setOpenPlanned,
     openModal,
}) {
     const { unreadPlannedCount, handleClosePlanned, handleOpenPlanned } =
          usePlannedTaskNotifications(plannedTasks, openPlanned, setOpenPlanned);

     return (
          <section
               className={`w-full ${openPlanned ? "lg:w-[40%]" : "lg:w-20"} shadow-xl relative p-5 gap-5 h-full flex flex-col items-center bg-main_green_dark/10 rounded-lg min-h-0 transition-all duration-300`}
          >
               <div
                    className={`border-b-4 border-main_lightly/20 w-full ${openPlanned ? "px-10 py-2" : "p-0 border-none"} transition-all duration-300`}
               >
                    {openPlanned && <ListTaskTitle title="Заплановані завдання" />}
               </div>

               <div
                    className={`flex-1 w-full min-h-0 overflow-y-auto flex flex-col ${openPlanned ? "items-start gap-4 p-4 justify-start" : "items-center justify-center p-0"}`}
               >
                    <PlannedListExpanded
                         unreadPlannedCount={unreadPlannedCount}
                         handleOpenPlanned={handleOpenPlanned}
                         openPlanned={openPlanned}
                         handleClosePlanned={handleClosePlanned}
                         plannedTasks={plannedTasks}
                         openModal={openModal}
                    />
               </div>
          </section>
     );
}
