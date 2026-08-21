import React from "react";

export default function TaskCardHeader({
     task,
     formatDate,
     renderMeta,
     titleClassName = "text-3xl font-montserrat-medium text-main_lightly",
     subtitleClassName = "text-md font-montserrat-medium text-main_lightly/50",
}) {
     return (
          <div className="flex items-center justify-between p-4 border-b-4 border-main_lightly/30">
               <div className="flex flex-col items-start justify-center">
                    <h3 className={titleClassName}>{task.title || "Нова задача"}</h3>
                    <p className={subtitleClassName}>{formatDate(task.task_date)}</p>
               </div>

               <div className="flex gap-2 items-end justify-center flex-col-reverse">
                    {typeof renderMeta === "function" ? renderMeta(task) : null}
               </div>
          </div>
     );
}
