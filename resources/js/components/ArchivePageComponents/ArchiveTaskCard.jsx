import React from "react";

import { TASK_CATEGORIES } from "@/constants/taskCategories";
import { getTaskStatusMeta } from "@/components/TasksPageComponents/utils/taskStatusUtils";
import ArchiveTaskInfoSection from "./Components/ArchiveTaskInfoSection";
import ArchiveTaskContent from "./Components/ArchiveTaskContent";
import ArchiveTaskToolbar from "./Components/ArchiveTaskToolbar";

export default function ArchiveTaskCard({ task = {}, className = "" }) {
     const categoryLookup = new Map(TASK_CATEGORIES.map((category) => [category.name, category]));
     const taskStatus = getTaskStatusMeta(task.is_completed, task.task_date);

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

     return (
          <div className={`flex items-stretch gap-0 bg-main_green_dark/20 rounded-lg ${className}`}>
               <section className="flex-1 min-w-[350px] flex flex-col pr-2 justify-between border-r-4 border-main_lightly/30">
                    <ArchiveTaskInfoSection
                         task={task}
                         taskStatus={taskStatus}
                         categoryLookup={categoryLookup}
                         formatDate={formatDate}
                    />
                    <ArchiveTaskContent task={task} />
               </section>

               <ArchiveTaskToolbar task={task} />
          </div>
     );
}
