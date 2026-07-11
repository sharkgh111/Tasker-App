import React, { useMemo } from "react";
import { LuPlus } from "react-icons/lu";
import { FaCheck, FaPencil, FaRegTrashCan } from "react-icons/fa6";
import { BsArchive } from "react-icons/bs";
import { FaClockRotateLeft } from "react-icons/fa6";

import { router } from "@inertiajs/react";
import IconButton from "@/Components/UI/IconButton";
import Button from "@/Components/UI/Button";
import SubTaskList from "@/Components/TaskComponents/subtask/SubTaskList";
import { TASK_CATEGORIES } from "@/Constants/taskCategories";
import { PRIORITY_OPTIONS } from "@/Constants/priorityOptions";

export default function Task({ tasks, isReverseList, openModal, isPlanned = false }) {
   const priorityLookup = useMemo(() => new Map(PRIORITY_OPTIONS.map((option) => [option.value, option])), []);
   const categoryLookup = useMemo(() => new Map(TASK_CATEGORIES.map((category) => [category.name, category])), []);

   const formatTaskDate = (dateString, isCompleted) => {
      if (!dateString) return "";

      const localDateString = dateString.replace("T", " ");
      const taskDate = new Date(localDateString);
      const now = new Date();

      if (isNaN(taskDate.getTime())) return "";

      if (now.getTime() > taskDate.getTime() && !isCompleted) {
         const dateOptions = { day: "numeric", month: "long" };
         const timeOptions = { hour: "2-digit", minute: "2-digit" };

         const dateText = taskDate.toLocaleDateString("uk-UA", dateOptions);
         const timeText = taskDate.toLocaleTimeString("uk-UA", timeOptions);

         return `Термін вийшов ${dateText} в ${timeText}`;
      }

      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      const compareDate = new Date(taskDate.getFullYear(), taskDate.getMonth(), taskDate.getDate());

      const timeOptions = { hour: "2-digit", minute: "2-digit" };
      const timeText = taskDate.toLocaleTimeString("uk-UA", timeOptions);

      if (compareDate.getTime() === today.getTime()) {
         return `до ${timeText}`;
      }

      if (compareDate.getTime() === tomorrow.getTime()) {
         return `завтра до ${timeText}`;
      }

      const dateOptions = { day: "numeric", month: "long" };
      const dateText = taskDate.toLocaleDateString("uk-UA", dateOptions);

      return `до ${dateText} ${timeText}`;
   };

   const renderCompletionText = (task) => {
      if (!task.is_completed) {
         return `Дедлайн: ${formatTaskDate(task.task_date, task.is_completed)}`;
      }

      if (!task.completed_at) return "Виконано: щойно";

      const completedAt = new Date(task.completed_at).getTime();
      const now = new Date().getTime();
      const diffInMinutes = (now - completedAt) / (1000 * 60);

      if (diffInMinutes < 1) {
         return "Виконано: щойно";
      }

      return `Виконано: ${new Date(task.completed_at).toLocaleDateString("uk-UA")}`;
   };

   const toggleSubtask = (id) => {
      setData(
         "subtasks",
         data.subtasks.map((sub) => (sub.id === id ? { ...sub, is_completed: !sub.is_completed } : sub)),
      );
   };

   const formatUploadDate = (dateString) => {
      if (!dateString) return "";
      const taskDate = new Date(dateString.replace("T", " "));
      if (isNaN(taskDate.getTime())) return "";

      return taskDate.toLocaleString("uk-UA", {
         day: "numeric",
         month: "long",
         hour: "2-digit",
         minute: "2-digit",
      });
   };

   const getTaskStatus = (isCompleted, taskDateString) => {
      if (isCompleted) {
         return { text: "Виконано", color: "text-succes_light border-succes_light" };
      }

      if (!taskDateString) {
         return { text: "Призначено", color: "text-main_lightly border-main_lightly" };
      }

      const taskDate = new Date(taskDateString);
      const now = new Date();

      if (isNaN(taskDate.getTime())) {
         return { text: "Призначено", color: "text-main_lightly border-main_lightly" };
      }

      const msDifference = taskDate.getTime() - now.getTime();
      const hoursDifference = msDifference / (1000 * 60 * 60);

      if (hoursDifference < 0) {
         return { text: "Протерміновано", color: "text-danger_light border-danger_light " };
      }

      if (hoursDifference <= 2) {
         return { text: "Скоро спливає", color: "text-warning_light border-warning_light" };
      }

      return { text: "Призначено", color: "text-main_lightly border-main_lightly" };
   };

   return (
      <>
         <div className={`flex w-full flex-col items-center gap-5 ${isReverseList ? "flex-col-reverse" : "flex-col"} justify-center`}>
            {!tasks || tasks.length === 0 ? (
               <div className="flex flex-col items-center gap-3 my-auto">
                  <p className="font-montserrat-medium text-lg text-main_lightly/60">
                     {isPlanned ? "У вас немає запланованих задач" : "У вас немає поточних задач"}
                  </p>
                  <Button
                     type="button"
                     Icon={LuPlus}
                     text="Створити задачу"
                     iconSize="w-5 h-5"
                     onClick={openModal}
                     className="font-montserrat-bold text-sm py-1.5 px-4 border-2 text-main_lightly shadow-md hover:scale-95 transition-all"
                  />
               </div>
            ) : (
               tasks.map((task) => {
                  const taskStatus = getTaskStatus(task.is_completed, task.task_date);
                  const currentPriority = priorityLookup.get(task.priority);
                  const isTaskActive = !task.is_planned;

                  return (
                     <section
                        key={task.id}
                        className={`flex items-center shadow-xl justify-between w-full flex-col ${!isPlanned ? "bg-main_green_dark/30" : "bg-main_green_light/20"}  rounded-xl transition-all`}
                     >
                        <div className="flex w-full items-center justify-between border-b-2 border-main_lightly/30">
                           <div className={`flex flex-1 ${isPlanned ? "px-2" : "px-4"} py-4 flex-row gap-4 items-center justify-between`}>
                              <div className={`flex flex-1 ${isPlanned ? "flex-row items-center" : "flex-col items-start"} justify-between`}>
                                 <div className="flex flex-col items-start text-base justify-center">
                                    <h3
                                       className={`text-2xl font-montserrat-medium transition-all duration-300 
                                                    ${task.is_completed ? "line-through text-main_lightly/50" : "text-main_lightly"}  
                                                    ${taskStatus.text === "Протерміновано" ? " text-main_lightly/50" : "text-main_lightly"}`}
                                    >
                                       {task.title}
                                    </h3>
                                    <span className="font-montserrat-regular text-main_lightly rounded-md whitespace-nowrap">{renderCompletionText(task)}</span>
                                    {isPlanned && task.upload_date && (
                                       <span className="font-montserrat-regular text-main_lightly rounded-md whitespace-nowrap">
                                          Застосувати: {formatUploadDate(task.upload_date)}
                                       </span>
                                    )}
                                 </div>
                              </div>

                              <div className="flex flex-col-reverse gap-2 items-end justify-between h-full">
                                 <div className="flex items-center justify-between gap-2">
                                    {!isPlanned && (
                                       <span
                                          className={`text-[12px] uppercase tracking-wider font-montserrat-bold px-2 py-0.5 border-2 shadow-lg rounded-md whitespace-nowrap transition-all duration-300 ${taskStatus.color}`}
                                       >
                                          {taskStatus.text}
                                       </span>
                                    )}
                                    {!isPlanned && taskStatus.text !== "Протерміновано" && (
                                       <label className="relative flex items-center cursor-pointer select-none flex-shrink-0">
                                          <button
                                             type="button"
                                             onClick={() =>
                                                router.patch(
                                                   `/tasks/${task.id}`,
                                                   {
                                                      is_completed: !task.is_completed,
                                                   },
                                                   {
                                                      preserveScroll: true,
                                                      preserveState: true,
                                                      only: ["tasks"],
                                                   },
                                                )
                                             }
                                             className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                                                task.is_completed
                                                   ? "border-succes_light text-succes_light"
                                                   : "border-main_lightly bg-transparent text-transparent"
                                             }`}
                                          >
                                             <FaCheck className="w-3 h-3" />
                                          </button>
                                       </label>
                                    )}
                                    {currentPriority && (
                                       <span className={`w-5 h-5 rounded-full border-2 border-main_lightly bg-${currentPriority.color}`}></span>
                                    )}
                                 </div>
                                 {task.categories && task.categories.length > 0 && (
                                    <div className="flex flex-wrap items-center justify-end gap-1">
                                       {task.categories.map((categoryName, idx) => {
                                          const originalCategory = categoryLookup.get(categoryName);

                                          return (
                                             <span
                                                key={idx}
                                                className="flex items-center gap-1 px-2 py-0.5 text-xs font-montserrat-medium bg-main_green_primary/40 border border-main_lightly/10 text-main_lightly/90 rounded-md select-none whitespace-nowrap"
                                             >
                                                {originalCategory && <span>{originalCategory.emoji}</span>}
                                                <span>{categoryName}</span>
                                             </span>
                                          );
                                       })}
                                    </div>
                                 )}
                              </div>
                           </div>
                        </div>

                        <div className={`flex w-full items-center justify-between gap-4 ${isPlanned ? "px-2" : "px-5"}`}>
                           <div className="flex-none w-1/5 min-w-0 py-3">
                              {task.description && (
                                 <p
                                    className={`font-montserrat-medium break-words whitespace-pre-wrap text-left w-full text-lg transition-all duration-300 
                                            ${task.is_completed ? "text-main_lightly/60" : "text-main_lightly"}
                                            ${taskStatus.text === "Протерміновано" ? " text-main_lightly/50" : "text-main_lightly"}`}
                                 >
                                    {task.description}
                                 </p>
                              )}
                           </div>
                           <div className="flex flex-grow items-center justify-center flex-1 h-full border-x-2 border-main_lightly/30">
                              <SubTaskList isTaskActive={!isPlanned} subtasks={task.subtasks} taskStatus={taskStatus} />
                           </div>
                           <div className="px-2 py-3 flex gap-2 items-center justify-between flex-shrink-0">
                              {!task.is_completed && task.can_edit && taskStatus.text !== "Протерміновано" && (
                                 <IconButton
                                    Icon={FaPencil}
                                    type="button"
                                    onClick={() => openModal(task)}
                                    className="bg-main_green_dark border-2 border-main_lightly hover:bg-main_green_dark/80 hover:scale-95"
                                    iconSize="w-6 h-6"
                                 />
                              )}
                              <IconButton
                                 Icon={FaClockRotateLeft}
                                 type="button"
                                 onClick={() =>
                                    router.patch(
                                       `/tasks/${task.id}`,
                                       {
                                          is_archived: true,
                                          is_deferred: true,
                                       },
                                       {
                                          preserveScroll: true,
                                          preserveState: true,
                                          only: ["tasks"],
                                       },
                                    )
                                 }
                                 className="bg-main_green_primary border-2 border-main_lightly hover:bg-main_green_primary/80 hover:scale-95"
                                 iconSize="w-6 h-6"
                              />
                              {!isPlanned && task.can_archive && (
                                 <IconButton
                                    Icon={BsArchive}
                                    type="button"
                                    onClick={() =>
                                       router.patch(
                                          `/tasks/${task.id}`,
                                          {
                                             is_archived: true,
                                          },
                                          {
                                             preserveScroll: true,
                                             preserveState: true,
                                             only: ["tasks"],
                                          },
                                       )
                                    }
                                    className="bg-main_green_primary border-2 border-main_lightly hover:bg-main_green_primary/80 hover:scale-95"
                                    iconSize="w-6 h-6"
                                 />
                              )}
                              <IconButton
                                 Icon={FaRegTrashCan}
                                 onClick={() => {
                                    if (confirm("Ви впевнені, що хочете видалити цю задачу?")) {
                                       router.delete(`/tasks/${task.id}`);
                                    }
                                 }}
                                 type="button"
                                 className="bg-danger_light border-2 border-main_lightly hover:bg-danger_light/80 hover:scale-95"
                                 iconSize="w-6 h-6"
                              />
                           </div>
                        </div>
                     </section>
                  );
               })
            )}
         </div>
         {!isPlanned && (
            <Button
               type="button"
               Icon={LuPlus}
               iconSize="w-7 h-7"
               onClick={() => openModal(null)}
               className="font-montserrat-bold px-[45px] bg-main_green_dark hover:bg-main_green_dark/80"
            />
         )}
      </>
   );
}
