export default function TaskCardDescription({
     isPlanned,
     task,
     taskStatus,
     formatTaskCompletionText,
     formatTaskUploadDate,
}) {
     return (
          <div className="flex flex-col items-start w-fit max-w-full pr-3 border-l-4 border-main_lightly/30">
               <div className="flex flex-col p-4">
                    <h3
                         className={`inline-block max-w-full text-2xl font-montserrat-medium transition-all duration-300 
                                                                                ${task.is_completed ? "line-through text-main_lightly/50" : "text-main_lightly"}  
                                                                                ${taskStatus.text === "Протерміновано" ? " text-main_lightly/50" : "text-main_lightly"}`}
                    >
                         {task.title}
                    </h3>
                    <span
                         className={`font-montserrat-regular w-fit text-main_lightly whitespace-nowrap`}
                    >
                         {formatTaskCompletionText(task)}
                    </span>
                    {isPlanned && task.upload_date && (
                         <span className="font-montserrat-regular text-main_lightly rounded-md whitespace-nowrap">
                              Застосувати: {formatTaskUploadDate(task.upload_date)}
                         </span>
                    )}
               </div>

               {task.description && (
                    <div className="w-full p-4 border-t-4 border-main_lightly/30">
                         <p
                              className={`w-full min-w-0 font-montserrat-medium break-words whitespace-pre-wrap text-left text-lg transition-all duration-300 
                                                                                     ${task.is_completed ? "text-main_lightly/60" : "text-main_lightly"}
                                                                                     ${taskStatus.text === "Протерміновано" ? " text-main_lightly/50" : "text-main_lightly"}`}
                         >
                              {task.description}
                         </p>
                    </div>
               )}
          </div>
     );
}
