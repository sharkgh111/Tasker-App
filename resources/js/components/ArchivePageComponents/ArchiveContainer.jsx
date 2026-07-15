import { useMemo } from "react";

import ArchiveSection from "./ArchiveSection";

export default function ArchiveContainer({ archiveTasks = [] }) {
     const DAY_IN_MS = 1000 * 60 * 60 * 24;
     const RECENT_ARCHIVE_THRESHOLD_DAYS = 7;
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
          return archiveTasks.reduce(
               (groups, task) => {
                    const overdueDays = getOverdueDays(task);

                    if (overdueDays >= LONG_ARCHIVE_THRESHOLD_DAYS) {
                         groups.longTasks.push(task);
                    } else if (overdueDays >= RECENT_ARCHIVE_THRESHOLD_DAYS) {
                         groups.recentTasks.push(task);
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

     return (
          <div className="flex w-full h-full items-center p-5 gap-4">
               <section className="flex-1 h-full">
                    <ArchiveSection title="Давні" tasks={longTasks} emptyMessage="Тут ще немає давніх архівних задач" borderClassName="border-l-4 border-r-2 border-main_lightly/30" />
               </section>

               <section className="flex-1 h-full">
                    <ArchiveSection title="Нещодавні" tasks={recentTasks} emptyMessage="Тут ще немає нещодавніх архівних задач" borderClassName="border-r-4 border-l-2 border-main_lightly/30" />
               </section>
          </div>
     );
}
