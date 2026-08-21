import SubTaskCard from "./SubTaskCard";

import EmptyState from "../../../../feedback/EmptyState";

export default function SubTaskList({ subtasks, isTaskActive, taskStatus }) {
     return (
          <div className="flex flex-grow items-center justify-center flex-1 h-full border-x-4 border-main_lightly/30">
               <div className="w-full [counter-reset:subtask-counter] p-2 flex items-center justify-center flex-col gap-2">
                    {subtasks.length == 0 ? (
                         <EmptyState
                              titleFont="text-base"
                              iconSize="w-7 h-7"
                              title="В данному завданні відсутні підзавдання"
                         />
                    ) : (
                         <>
                              {subtasks.map((item) => (
                                   <SubTaskCard
                                        key={item.id}
                                        subtask={item}
                                        isTaskActive={isTaskActive}
                                        taskStatus={taskStatus}
                                   />
                              ))}
                         </>
                    )}
               </div>
          </div>
     );
}
