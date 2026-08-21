import { useMemo } from "react";

export const useTaskProgress = (currentTasks = [], getTaskStatusMeta) => {
     const visibleCurrentTasks = useMemo(() => {
          if (!Array.isArray(currentTasks) || currentTasks.length === 0) return [];

          return currentTasks.filter((task) => {
               const taskStatus =
                    typeof getTaskStatusMeta === "function"
                         ? getTaskStatusMeta(task.is_completed, task.task_date)
                         : null;

               const isExpired = taskStatus?.text === "Протерміновано";

               return !task.is_archived && !task.is_deferred && !isExpired;
          });
     }, [currentTasks, getTaskStatusMeta]);

     const completedTasksCount = useMemo(() => {
          return visibleCurrentTasks.filter((task) => task.is_completed).length;
     }, [visibleCurrentTasks]);

     const totalTasksCount = visibleCurrentTasks.length;

     const percentage = useMemo(() => {
          return totalTasksCount > 0
               ? Math.round((completedTasksCount / totalTasksCount) * 100)
               : 0;
     }, [completedTasksCount, totalTasksCount]);

     return {
          percentage,
          visibleCurrentTasks,
          completedTasksCount,
          totalTasksCount,
     };
};
