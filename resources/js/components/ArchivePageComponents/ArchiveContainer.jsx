import { useMemo } from "react";
import { router } from "@inertiajs/react";

import ArchiveSection from "./ArchiveSection";

export default function ArchiveContainer({ archiveTasks = [] }) {
     const DAY_IN_MS = 1000 * 60 * 60 * 24;
     const LONG_ARCHIVE_THRESHOLD_DAYS = 14;

     const getDeadlineDate = (value) => {
          if (!value) return null;

          const parsedDate = new Date(String(value).replace("T", " "));
          return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
     };

     const getOverdueDays = (task) => {
          const deadlineDate = getDeadlineDate(task.task_date);

          if (!deadlineDate) {
               return 0;
          }

          const now = Date.now();
          const overdueDiff = now - deadlineDate.getTime();

          if (overdueDiff <= 0) {
               return 0;
          }

          return Math.floor(overdueDiff / DAY_IN_MS);
     };

     const { recentTasks, longTasks } = useMemo(() => {
          const sortedArchiveTasks = [...archiveTasks].sort((a, b) => {
               const aDate = getDeadlineDate(a.task_date)?.getTime() ?? Infinity;
               const bDate = getDeadlineDate(b.task_date)?.getTime() ?? Infinity;

               return aDate - bDate;
          });

          return sortedArchiveTasks.reduce(
               (groups, task) => {
                    const overdueDays = getOverdueDays(task);

                    if (overdueDays >= LONG_ARCHIVE_THRESHOLD_DAYS) {
                         groups.longTasks.push(task);
                    } else {
                         groups.recentTasks.push(task);
                    }

                    return groups;
               },
               {
                    recentTasks: [],
                    longTasks: [],
               },
          );
     }, [archiveTasks]);

     const handleDeleteArchivedGroup = (group) => {
          const groupLabel = group === "long" ? "давні" : "нещодавні";

          if (confirm(`Ви впевнені, що хочете видалити всі ${groupLabel} архівні задачі?`)) {
               router.delete("/archive", {
                    data: { group },
                    preserveScroll: true,
                    preserveState: false,
               });
          }
     };

     return (
          <div className="flex w-full h-full flex-col p-5 gap-6">
               <div className="flex w-full h-full items-center gap-4">
                    <section className="flex-1 h-full">
                         <ArchiveSection
                              title="Давні"
                              tasks={longTasks}
                              emptyTitle="Тут ще немає давніх архівних задач"
                              borderClassName="border-l-4 border-r-2 border-main_lightly/30"
                              onDelete={() => handleDeleteArchivedGroup("long")}
                         />
                    </section>

                    <section className="flex-1 h-full">
                         <ArchiveSection
                              title="Нещодавні"
                              tasks={recentTasks}
                              emptyTitle="Тут ще немає нещодавніх архівних задач"
                              borderClassName="border-r-4 border-l-2 border-main_lightly/30"
                              onDelete={() => handleDeleteArchivedGroup("recent")}
                         />
                    </section>
               </div>
          </div>
     );
}
