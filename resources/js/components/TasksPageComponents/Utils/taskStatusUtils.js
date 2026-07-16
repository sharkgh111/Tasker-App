const TASK_STATUS_META = {
     completed: {
          text: "Виконано",
          color: "text-succes_light border-succes_light",
     },
     assigned: {
          text: "Призначено",
          color: "text-main_lightly border-main_lightly",
     },
     expired: {
          text: "Протерміновано",
          color: "text-danger_light border-danger_light",
     },
     soon: {
          text: "Скоро спливає",
          color: "text-warning_light border-warning_light",
     },
};

export function formatTaskDate(dateString, isCompleted = false, now = new Date()) {
     if (!dateString) {
          return "";
     }

     const taskDate = new Date(dateString.replace("T", " "));

     if (Number.isNaN(taskDate.getTime())) {
          return "";
     }

     if (now.getTime() > taskDate.getTime() && !isCompleted) {
          const dateText = taskDate.toLocaleDateString("uk-UA", {
               day: "numeric",
               month: "long",
          });
          const timeText = taskDate.toLocaleTimeString("uk-UA", {
               hour: "2-digit",
               minute: "2-digit",
          });

          return `Термін вийшов ${dateText} в ${timeText}`;
     }

     const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
     const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
     const compareDate = new Date(taskDate.getFullYear(), taskDate.getMonth(), taskDate.getDate());
     const timeText = taskDate.toLocaleTimeString("uk-UA", {
          hour: "2-digit",
          minute: "2-digit",
     });

     if (compareDate.getTime() === today.getTime()) {
          return `до ${timeText}`;
     }

     if (compareDate.getTime() === tomorrow.getTime()) {
          return `завтра до ${timeText}`;
     }

     const dateText = taskDate.toLocaleDateString("uk-UA", {
          day: "numeric",
          month: "long",
     });

     return `до ${dateText} ${timeText}`;
}

export function formatTaskCompletionText(task, now = new Date()) {
     if (!task.is_completed) {
          const formattedDate = formatTaskDate(task.task_date, task.is_completed, now);

          if (!formattedDate) {
               return "";
          }

          if (now.getTime() > new Date(task.task_date.replace("T", " ")).getTime()) {
               return formattedDate;
          }

          return `Дедлайн: ${formattedDate}`;
     }

     if (!task.completed_at) {
          return "Виконано: щойно";
     }

     const completedAt = new Date(task.completed_at).getTime();
     const diffInMinutes = (now.getTime() - completedAt) / (1000 * 60);

     if (diffInMinutes < 1) {
          return "Виконано: щойно";
     }

     return `Виконано: ${new Date(task.completed_at).toLocaleDateString("uk-UA")}`;
}

export function formatTaskUploadDate(dateString) {
     if (!dateString) {
          return "";
     }

     const taskDate = new Date(dateString.replace("T", " "));

     if (Number.isNaN(taskDate.getTime())) {
          return "";
     }

     return taskDate.toLocaleString("uk-UA", {
          day: "numeric",
          month: "long",
          hour: "2-digit",
          minute: "2-digit",
     });
}

export function getTaskStatusMeta(isCompleted, taskDateString, now = new Date()) {
     if (isCompleted) {
          return TASK_STATUS_META.completed;
     }

     if (!taskDateString) {
          return TASK_STATUS_META.assigned;
     }

     const taskDate = new Date(taskDateString);

     if (Number.isNaN(taskDate.getTime())) {
          return TASK_STATUS_META.assigned;
     }

     const msDifference = taskDate.getTime() - now.getTime();
     const hoursDifference = msDifference / (1000 * 60 * 60);

     if (hoursDifference < 0) {
          return TASK_STATUS_META.expired;
     }

     if (hoursDifference <= 2) {
          return TASK_STATUS_META.soon;
     }

     return TASK_STATUS_META.assigned;
}
