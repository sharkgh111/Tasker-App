import TaskDescription from "./TaskCardDescription";
import TaskMeta from "./TaskCardMeta";

export default function TaskCardInfoSection({
     isPlanned,
     task,
     taskStatus,
     categoryLookup,
     openPlanned,
     currentPriority,
     formatTaskCompletionText,
     formatTaskUploadDate,
}) {
     return (
          <div className="flex w-full items-center justify-between border-b-4 border-main_lightly/30">
               <div
                    className={`flex flex-1 ${isPlanned ? "px-2" : "px-4"} flex-row gap-4 items-stretch justify-between min-w-0`}
               >
                    <div
                         className={`flex ${isPlanned ? "flex-row items-center" : "flex-col items-start"} justify-between min-w-0`}
                    >
                         <div className="flex w-fit max-w-full flex-col items-start text-base justify-center min-w-0">
                              <TaskDescription
                                   isPlanned={isPlanned}
                                   task={task}
                                   taskStatus={taskStatus}
                                   formatTaskCompletionText={formatTaskCompletionText}
                                   formatTaskUploadDate={formatTaskUploadDate}
                              />
                         </div>
                    </div>

                    <div className="flex flex-1 flex-col items-end justify-center py-5 gap-5 w-full">
                         <TaskMeta
                              task={task}
                              categoryLookup={categoryLookup}
                              openPlanned={openPlanned}
                              isPlanned={isPlanned}
                              taskStatus={taskStatus}
                              currentPriority={currentPriority}
                         />
                    </div>
               </div>
          </div>
     );
}
