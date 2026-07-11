import { router } from "@inertiajs/react";
import { FaCheck } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";

export default function SubTaskCard({ subtask, isTaskActive, taskStatus }) {
   const toggleSubtask = () => {
      router.patch(
         `/subtasks/${subtask.id}`,
         {
            is_completed: !subtask.is_completed,
         },
         {
            preserveScroll: true,
         },
      );
   };

   return (
      <div className="w-full [counter-increment:subtask-counter] flex flex-1 items-center justify-between rounded-lg px-2 py-3 bg-main_green_dark/20">
         <span className="text-main_lightly font-montserrat-bold before:content-[counter(subtask-counter)]"></span>
         <span
            className={`font-montserrat-bold text-lg ${taskStatus.text === "Протерміновано" ? " text-main_lightly/50" : "text-main_lightly"} ${subtask.is_completed ? "line-through text-main_lightly/50" : "text-main_lightly"}`}
         >
            {subtask.title}
         </span>
         {isTaskActive && (
            <label className="relative flex items-center cursor-pointer select-none flex-shrink-0">
               {taskStatus.text !== "Протерміновано" ? (
                  <button
                     type="button"
                     onClick={toggleSubtask}
                     className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                        subtask.is_completed ? "border-succes_light text-succes_light shadow-lg" : "border-main_lightly bg-transparent text-transparent"
                     }`}
                  >
                     <FaCheck className="w-3 h-3" />
                  </button>
               ) : (
                  <IoCloseSharp className="text-danger_light w-8 h-8" />
               )}
            </label>
         )}
      </div>
   );
}
