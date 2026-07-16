import React from "react";

import { TbTargetArrow } from "react-icons/tb";

import Counter from "./CompletedTaskCounter";

export default function CurrentTaskTitle({ completedTasksCount, totalTasksCount, title }) {
     return (
          <div className="flex items-center justify-center gap-2">
               <TbTargetArrow className="text-main_lightly w-7 h-7" />
               <h2 className="text-2xl text-main_lightly font-montserrat-medium mr-3">{title}</h2>
               <Counter
                    completedTasksCount={completedTasksCount}
                    totalTasksCount={totalTasksCount}
               />
          </div>
     );
}
