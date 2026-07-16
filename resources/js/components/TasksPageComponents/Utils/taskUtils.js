export function isTaskPlanned(value) {
     return value === true || value === 1;
}

export function parseTaskUploadDate(uploadDate) {
     if (!uploadDate) return NaN;

     const timestamp = Date.parse(uploadDate);
     return Number.isNaN(timestamp) ? NaN : timestamp;
}

export function getTaskSearchPlaceholder(activeSearchMode) {
     switch (activeSearchMode) {
          case 1:
               return "Пошук по назві";
          case 2:
               return "Пошук по підзавданням";
          case 3:
               return "Пошук по категоріям";
          case 4:
               return "Пошук по опису";
          default:
               return "Пошук по назві";
     }
}

export function filterTasksBySearch(tasks, searchQuery, activeSearchMode) {
     const normalizedSearch = searchQuery.trim().toLowerCase();

     if (!normalizedSearch) {
          return tasks;
     }

     return tasks.filter((task) => {
          switch (activeSearchMode) {
               case 1:
                    return task.title?.toLowerCase().includes(normalizedSearch);
               case 2:
                    return (
                         Array.isArray(task.subtasks) &&
                         task.subtasks.some((subtask) =>
                              subtask.title?.toLowerCase().includes(normalizedSearch),
                         )
                    );
               case 3:
                    return (
                         Array.isArray(task.categories) &&
                         task.categories.some((category) =>
                              String(category).toLowerCase().includes(normalizedSearch),
                         )
                    );
               case 4:
                    return task.description?.toLowerCase().includes(normalizedSearch);
               default:
                    return task.title?.toLowerCase().includes(normalizedSearch);
          }
     });
}

function getStartOfDay(date) {
     return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function getStartOfWeek(date) {
     const startOfDay = getStartOfDay(date);
     const dayIndex = startOfDay.getDay();
     const mondayShift = dayIndex === 0 ? -6 : 1 - dayIndex;

     return new Date(
          startOfDay.getFullYear(),
          startOfDay.getMonth(),
          startOfDay.getDate() + mondayShift,
     );
}

function getTaskStatus(task, now = new Date()) {
     if (task.is_completed) {
          return "completed";
     }

     const taskDate = task.task_date ? new Date(task.task_date) : null;

     if (!taskDate || Number.isNaN(taskDate.getTime())) {
          return "assigned";
     }

     const diffInHours = (taskDate.getTime() - now.getTime()) / (1000 * 60 * 60);

     if (diffInHours < 0) {
          return "expired";
     }

     if (diffInHours <= 2) {
          return "soon";
     }

     return "assigned";
}

export function filterTasksByOptions(tasks = [], activeFilters = []) {
     if (!Array.isArray(tasks) || !Array.isArray(activeFilters)) {
          return tasks;
     }

     const normalizedFilters = activeFilters.filter((filterId) => filterId && filterId !== "all");

     if (normalizedFilters.length === 0) {
          return tasks;
     }

     const now = new Date();
     const startOfToday = getStartOfDay(now);
     const startOfTomorrow = new Date(
          startOfToday.getFullYear(),
          startOfToday.getMonth(),
          startOfToday.getDate() + 1,
     );
     const startOfCurrentWeek = getStartOfWeek(now);
     const endOfCurrentWeek = new Date(
          startOfCurrentWeek.getFullYear(),
          startOfCurrentWeek.getMonth(),
          startOfCurrentWeek.getDate() + 6,
     );
     const startOfNextWeek = new Date(
          endOfCurrentWeek.getFullYear(),
          endOfCurrentWeek.getMonth(),
          endOfCurrentWeek.getDate() + 1,
     );
     const endOfNextWeek = new Date(
          startOfNextWeek.getFullYear(),
          startOfNextWeek.getMonth(),
          startOfNextWeek.getDate() + 6,
     );

     return tasks.filter((task) => {
          const taskDate = task.task_date ? new Date(task.task_date) : null;
          const isCompleted = Boolean(task.is_completed);
          const status = getTaskStatus(task, now);
          const isExpired = status === "expired";
          const isUrgent = task.priority === "urgent";
          const isToday = Boolean(
               taskDate && getStartOfDay(taskDate).getTime() === startOfToday.getTime(),
          );
          const isTomorrow = Boolean(
               taskDate && getStartOfDay(taskDate).getTime() === startOfTomorrow.getTime(),
          );
          const isThisWeek = Boolean(
               taskDate && taskDate >= startOfCurrentWeek && taskDate <= endOfCurrentWeek,
          );
          const isNextWeek = Boolean(
               taskDate && taskDate >= startOfNextWeek && taskDate <= endOfNextWeek,
          );
          const isAssigned = status === "assigned";
          const isSoon = status === "soon";

          return normalizedFilters.every((filterId) => {
               switch (filterId) {
                    case "active":
                         return !isCompleted && !isExpired;
                    case "today":
                         return isToday;
                    case "appointed":
                         return isAssigned;
                    case "expired":
                         return isExpired;
                    case "completed":
                         return isCompleted;
                    case "tomorrow":
                         return isTomorrow;
                    case "thisWeek":
                         return isThisWeek;
                    case "nextWeek":
                         return isNextWeek;
                    case "urgent":
                         return isUrgent;
                    case "soon":
                         return isSoon;
                    default:
                         return true;
               }
          });
     });
}

export function sortTasksByStatusAndDate(tasks = [], now = new Date()) {
     const priorityMap = {
          soon: 1,
          assigned: 2,
          completed: 3,
          expired: 4,
     };

     return [...tasks].sort((a, b) => {
          const statusA = getTaskStatus(a, now);
          const statusB = getTaskStatus(b, now);
          const priorityA = priorityMap[statusA] ?? Number.MAX_SAFE_INTEGER;
          const priorityB = priorityMap[statusB] ?? Number.MAX_SAFE_INTEGER;

          if (priorityA !== priorityB) {
               return priorityA - priorityB;
          }

          const aDate = a.task_date ? new Date(a.task_date).getTime() : Infinity;
          const bDate = b.task_date ? new Date(b.task_date).getTime() : Infinity;

          if (aDate === Infinity && bDate === Infinity) {
               return String(a.title ?? "").localeCompare(String(b.title ?? ""));
          }

          return aDate - bDate;
     });
}

export function sortTasksByDate(tasks) {
     return [...tasks].sort((a, b) => {
          const aDate = a.task_date ? new Date(a.task_date).getTime() : Infinity;
          const bDate = b.task_date ? new Date(b.task_date).getTime() : Infinity;

          return aDate - bDate;
     });
}
