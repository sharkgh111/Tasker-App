import { useMemo, useState } from "react";

import { useTaskListSearch } from "./useTaskListSearch";
import { filterTasksByOptions, filterTasksBySearch, isTaskPlanned, parseTaskUploadDate, sortTasksByDate, sortTasksByStatusAndDate } from "../utils/taskUtils";

export function useTaskListView(tasks = [], activeFilters = []) {
     const [openPlanned, setOpenPlanned] = useState(false);
     const now = useMemo(() => new Date(), [tasks]);
     const { searchQuery, setSearchQuery, activeSearchMode, handleSearchModeChange, searchPlaceholder } = useTaskListSearch();

     const currentFilteredTasks = useMemo(() => {
          const searchedTasks = filterTasksBySearch(tasks, searchQuery, activeSearchMode);
          return filterTasksByOptions(searchedTasks, activeFilters);
     }, [tasks, searchQuery, activeSearchMode, activeFilters]);

     const currentRaw = useMemo(
          () =>
               currentFilteredTasks.filter((task) => {
                    const uploadDateMs = parseTaskUploadDate(task.upload_date);
                    return !isTaskPlanned(task.is_planned) || uploadDateMs <= now.getTime() || Number.isNaN(uploadDateMs);
               }),
          [currentFilteredTasks, now],
     );

     const currentFuture = useMemo(
          () =>
               sortTasksByDate(
                    currentRaw.filter((task) => {
                         const taskDate = task.task_date ? new Date(task.task_date) : NaN;
                         return Number.isNaN(taskDate) || taskDate.getTime() >= now.getTime();
                    }),
                    now,
               ),
          [currentRaw, now],
     );

     const currentOverdue = useMemo(
          () =>
               sortTasksByDate(
                    currentRaw.filter((task) => {
                         const taskDate = task.task_date ? new Date(task.task_date) : NaN;
                         return !Number.isNaN(taskDate) && taskDate.getTime() < now.getTime();
                    }),
                    now,
               ),
          [currentRaw, now],
     );

     const currentTasks = useMemo(() => sortTasksByStatusAndDate([...currentFuture, ...currentOverdue], now), [currentFuture, currentOverdue, now]);

     const activeTasks = useMemo(
          () =>
               currentTasks.filter((task) => {
                    if (!task.task_date) return true;

                    const taskDate = new Date(task.task_date);
                    return !Number.isNaN(taskDate.getTime()) && taskDate.getTime() >= now.getTime();
               }),
          [currentTasks, now],
     );

     const plannedTasks = useMemo(() => {
          const nowMs = Date.now();

          return tasks
               .filter((task) => {
                    const uploadDateMs = parseTaskUploadDate(task.upload_date);
                    return isTaskPlanned(task.is_planned) && uploadDateMs > nowMs;
               })
               .sort((a, b) => {
                    const uploadA = parseTaskUploadDate(a.upload_date) || Infinity;
                    const uploadB = parseTaskUploadDate(b.upload_date) || Infinity;
                    return uploadA - uploadB;
               });
     }, [tasks]);

     return {
          openPlanned,
          setOpenPlanned,
          searchQuery,
          setSearchQuery,
          activeSearchMode,
          handleSearchModeChange,
          searchPlaceholder,
          currentTasks,
          activeTasks,
          plannedTasks,
     };
}
