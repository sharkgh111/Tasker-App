import { useEffect, useRef } from "react";
import { router } from "@inertiajs/react";

import { getTaskStatusMeta } from "../Utils/taskStatusUtils";

export function useAutoArchiveExpiredTasks(tasks = []) {
     const archivedTaskIds = useRef(new Set());

     useEffect(() => {
          if (!Array.isArray(tasks)) return;

          tasks.forEach((task) => {
               if (!task || !task.id) return;

               const taskStatus = getTaskStatusMeta(task.is_completed, task.task_date);
               if (task.is_completed || task.is_archived || taskStatus.text !== "Протерміновано") {
                    return;
               }

               if (archivedTaskIds.current.has(task.id)) {
                    return;
               }

               archivedTaskIds.current.add(task.id);

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
               );
          });
     }, [tasks]);
}
