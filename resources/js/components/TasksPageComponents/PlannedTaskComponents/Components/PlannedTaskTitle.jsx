import React from "react";

import { GoClock } from "react-icons/go";

export default function PlannedTaskTitle({ title }) {
     return (
          <div className="flex items-center justify-center gap-3 transition-all duration-100">
               <GoClock className="text-main_lightly w-7 h-7" />
               <h2 className="text-2xl text-main_lightly font-montserrat-medium">{title}</h2>
          </div>
     );
}
