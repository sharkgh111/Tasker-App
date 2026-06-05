import SubTaskCard from "./SubTaskCard";

export default function SubTaskList({subtasks, isTaskActive, taskStatus}) {
    
    return (
        <div className="w-full [counter-reset:subtask-counter] p-2 flex items-center justify-center flex-col gap-2">
            {subtasks.length == 0 ? (
                <p className="text-center text-main_lightly font-montserrat-medium">В даному завдані немає підзадач</p>
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
    );
}