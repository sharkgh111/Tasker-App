import Button from "@/ui/Button";
import { LuPlus, LuTrash2 } from "react-icons/lu";
import IconButton from "@/ui/IconButton";
import { TbSubtask } from "react-icons/tb";

export default function SubTaskManager({
     subtasks = [],
     setData,
     isAddingSubtask,
     setIsAddingSubtask,
     setNewSubtaskTitle,
     newSubtaskTitle,
}) {
     const handleAddSubtask = (e) => {
          if (e && e.preventDefault) e.preventDefault();

          if (!newSubtaskTitle.trim()) return;

          const newSubtask = {
               id: Date.now(),
               title: newSubtaskTitle,
               is_completed: false,
          };

          setData("subtasks", [...subtasks, newSubtask]);

          setNewSubtaskTitle("");
          setIsAddingSubtask(false);
     };

     const deleteSubtask = (id) => {
          setData(
               "subtasks",
               subtasks.filter((sub) => sub.id !== id),
          );
     };

     return (
          <section
               className={`flex flex-col flex-1 h-full w-full p-6 gap-4 overflow-y-auto transition-all duration-300 ${
                    subtasks.length === 0 && !isAddingSubtask
                         ? "justify-center items-center"
                         : "justify-start"
               }`}
          >
               {subtasks.length > 0 && (
                    <div className="w-full flex items-center justify-center gap-2 border-b-4 pb-2 border-main_lightly/30">
                         <TbSubtask className="w-7 h-7 text-main_lightly" />
                         <h3 className="text-xl font-montserrat-bold text-main_lightly">
                              Підзавдання
                         </h3>
                    </div>
               )}
               {isAddingSubtask && (
                    <div className="flex w-full items-center gap-3 bg-main_green_light/0 p-3 rounded-xl border-2 border-main_lightly/40 shadow-lg transition-all">
                         <input
                              type="text"
                              value={newSubtaskTitle}
                              onChange={(e) => setNewSubtaskTitle(e.target.value)}
                              placeholder="Введіть назву підзадачі..."
                              className="flex-1 placeholder:text-main_lightly/60 placeholder:italic bg-transparent border-none text-main_lightly font-montserrat-medium text-md outline-none focus:ring-0 p-1"
                              onKeyDown={(e) =>
                                   e.key === "Enter" && (e.preventDefault(), handleAddSubtask())
                              }
                              autoFocus
                         />
                         <div className="flex gap-1 flex-shrink-0">
                              <IconButton
                                   type="button"
                                   Icon={LuPlus}
                                   onClick={handleAddSubtask}
                                   className="bg-main_green_dark border-2 border-main_lightly text-main_lightly hover:scale-95"
                                   iconSize="w-5 h-5"
                              />
                              <IconButton
                                   Icon={LuTrash2}
                                   onClick={() => {
                                        setIsAddingSubtask(false);
                                        setNewSubtaskTitle("");
                                   }}
                                   className="bg-danger_light border-2 border-main_lightly text-main_lightly hover:scale-95"
                                   iconSize="w-5 h-5"
                              />
                         </div>
                    </div>
               )}
               {subtasks.length === 0 && !isAddingSubtask && (
                    <div className="flex flex-col items-center gap-3">
                         <p className="text-main_lightly font-montserrat-medium text-md text-center">
                              У цієї задачі ще немає підзадач
                         </p>
                         <Button
                              type="button"
                              text="Додати підзадачу"
                              Icon={LuPlus}
                              onClick={() => setIsAddingSubtask(true)}
                              iconSize="w-7 h-7"
                              className="border-2 text-main_lightly font-montserrat-medium py-1 px-4 text-md rounded-xl shadow-xl bg-main_green_dark hover:bg-main_green_dark/80 hover:translate-y-1"
                         />
                    </div>
               )}
               {subtasks.length > 0 && (
                    <div className="flex flex-col gap-3 w-full pr-1">
                         {subtasks.map((sub) => (
                              <div
                                   key={sub.id}
                                   className="flex items-center justify-between bg-main_green_dark/50 border-2 border-main_lightly p-3 rounded-xl shadow-md transition-all animate-fadeIn"
                              >
                                   <div className="flex items-center gap-4">
                                        <span
                                             className={`text-md font-montserrat-medium break-words transition-all ${sub.is_completed ? "line-through text-main_lightly/40" : "text-main_lightly"}`}
                                        >
                                             {sub.title}
                                        </span>
                                   </div>

                                   <IconButton
                                        type="button"
                                        Icon={LuTrash2}
                                        onClick={() => deleteSubtask(sub.id)}
                                        className="bg-danger_light text-main_lightly border-2 border-main_lightly hover:bg-danger_light/80 transition-sll"
                                        iconSize="w-5 h-5"
                                   />
                              </div>
                         ))}
                    </div>
               )}
               {subtasks.length > 0 && !isAddingSubtask && subtasks.length < 4 && (
                    <Button
                         type="button"
                         text="Додати ще одну"
                         Icon={LuPlus}
                         onClick={() => {
                              setIsAddingSubtask(true);
                              setNewSubtaskTitle("");
                         }}
                         iconSize="w-5 h-5"
                         className="self-center text-main_lightily border-2 border-dashed border-main_lightily font-montserrat-medium py-1 px-5 text-sm rounded-lg shadow-sm hover:bg-main_green_dark/40"
                    />
               )}
          </section>
     );
}
