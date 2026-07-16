import React from "react";

export default function ArchiveTaskContent({ task }) {
     return (
          <div className="flex flex-1 items-center py-2 justify-center">
               <div className="flex-2 py-5 content-center h-full border-r-4 border-main_lightly/30">
                    <p className="text-left text-xl px-10 max-w-[300px] font-montserrat-medium text-main_lightly/50">
                         {task.description || "Опис відсутній"}
                    </p>
               </div>
               <div className="flex-1 flex items-center justify-center flex-col p-4 gap-2 w-full">
                    {Array.isArray(task.subtasks) && task.subtasks.length > 0 ? (
                         task.subtasks.map((subtask, idx) => (
                              <div
                                   key={subtask.id ?? `${task.id}-${idx}`}
                                   className="w-full rounded-md border border-main_lightly/20 bg-main_green_dark/20 px-3 py-2"
                              >
                                   <div className="flex items-center justify-between gap-2">
                                        <span className="text-main_lightly font-montserrat-medium">
                                             {subtask.title || "Без назви"}
                                        </span>
                                   </div>
                              </div>
                         ))
                    ) : (
                         <span className="text-sm font-montserrat-medium text-main_lightly/70">
                              Немає підзадач
                         </span>
                    )}
               </div>
          </div>
     );
}
