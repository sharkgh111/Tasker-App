import React, { useState } from "react";
import { router } from "@inertiajs/react";

import IconButton from "@/Components/UI/IconButton";
import { FaRegTrashCan } from "react-icons/fa6";
import { RiResetLeftFill } from "react-icons/ri";
import { BsInfoSquare } from "react-icons/bs";
import { PRIORITY_OPTIONS } from "@/Constants/priorityOptions";

import ArchiveModal from "./ArchiveTaskModal";

export default function ArchiveTaskCard({ task = {}, className = "" }) {
   const [isInfoOpen, setIsInfoOpen] = useState(false);

   const formatDate = (value) => {
      if (!value) return "Термін не вказано";
      const date = new Date(value.replace("T", " "));
      if (isNaN(date.getTime())) return "Термін не вказано";

      const now = new Date();
      const deadlineText = date.toLocaleString("uk-UA", {
         day: "numeric",
         month: "long",
         year: "numeric",
      });

      if (now.getTime() > date.getTime()) {
         const timeText = date.toLocaleTimeString("uk-UA", {
            hour: "2-digit",
            minute: "2-digit",
         });
         return `Термін вийшов ${deadlineText} о ${timeText}`;
      }

      return `До ${deadlineText}`;
   };

   const handleRestore = () => {
      router.patch(
         `/tasks/${task.id}`,
         { is_archived: false },
         {
            preserveScroll: true,
            preserveState: true,
            only: ["archiveTasks"],
         },
      );
   };

   const handleDelete = () => {
      if (confirm("Ви впевнені, що хочете видалити цю архівну задачу?")) {
         router.delete(`/tasks/${task.id}`);
      }
   };

   const categories = Array.isArray(task.categories) ? task.categories.join(", ") : task.categories || "Немає категорій";
   const priorityOption = PRIORITY_OPTIONS.find((option) => option.value === task.priority);
   const priorityValue = priorityOption ? priorityOption.label : task.priority ? task.priority.replace(/_/g, " ") : "Немає пріоритету";

   return (
      <>
         <div className={`flex items-stretch gap-0 bg-main_green_dark/20 rounded-lg ${className}`}>
            <section className="flex-1 min-w-[350px] flex flex-col justify-between border-r-2 border-main_lightly/30">
               <div className="flex flex-col items-start justify-between p-4 border-b-2 border-main_lightly/30">
                  <h3 className="text-3xl font-montserrat-medium text-main_lightly">{task.title || "Нова задача"}</h3>
                  <p className="text-lg max-w-xs font-montserrat-medium truncate text-main_lightly">{formatDate(task.task_date)}</p>
               </div>
               <div className="flex flex-1 items-center justify-center p-3">
                  <p className="text-center text-xl font-montserrat-medium text-main_lightly">{task.description || "Опис відсутній"}</p>
               </div>
            </section>
            <section className="flex-none w-[100px] min-w-[100px] flex flex-col items-center justify-center p-4">
               <div className="w-full h-full flex flex-col items-center justify-evenly gap-2">
                  <IconButton
                     Icon={BsInfoSquare}
                     type="button"
                     onClick={() => setIsInfoOpen(true)}
                     className="bg-main_green_dark border-2 border-main_lightly hover:bg-main_green_dark/70 hover:scale-95"
                     iconSize="w-9 h-9"
                  />
                  <IconButton
                     Icon={RiResetLeftFill}
                     type="button"
                     onClick={handleRestore}
                     className="bg-main_green_primary border-2 border-main_lightly hover:bg-main_green_primary/70 hover:scale-95"
                     iconSize="w-9 h-9"
                  />
                  <IconButton
                     Icon={FaRegTrashCan}
                     type="button"
                     onClick={handleDelete}
                     className="bg-danger_light border-2 border-main_lightly hover:bg-danger_light/80 hover:scale-95"
                     iconSize="w-9 h-9"
                  />
               </div>
            </section>
         </div>

         <ArchiveModal
            setIsInfoOpen={setIsInfoOpen}
            title={task.title}
            description={task.description}
            deadline={formatDate(task.task_date)}
            details={task.description}
            categories={categories}
            priority={priorityValue}
            isInfoOpen={isInfoOpen}
         />
      </>
   );
}
