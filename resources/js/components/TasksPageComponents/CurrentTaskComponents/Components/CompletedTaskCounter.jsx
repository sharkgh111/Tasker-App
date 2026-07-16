import React from "react";

export default function CompletedTaskCounter({ completedTasksCount, totalTasksCount }) {
     return (
          <span className="text-2xl text-main_lightly font-montserrat-medium">
               {completedTasksCount}/{totalTasksCount}
          </span>
     );
}
