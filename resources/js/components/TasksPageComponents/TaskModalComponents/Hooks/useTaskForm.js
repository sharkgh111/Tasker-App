import { useEffect, useMemo, useState } from "react";
import { useForm } from "@inertiajs/react";

const createInitialFormData = () => ({
     title: "",
     description: "",
     task_date: "",
     is_planned: false,
     upload_date: "",
     priority: null,
     categories: [],
     can_edit: true,
     has_reminder: true,
     subtasks: [],
});

const formatDatetimeLocal = (value) => {
     if (!value) return "";

     const normalized = String(value).replace(" ", "T");
     const date = new Date(normalized);
     if (Number.isNaN(date.getTime())) return "";

     const pad = (num) => String(num).padStart(2, "0");
     return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

export function useTaskForm({ isOpen, task, tasks = [] }) {
     const [isAddingSubtask, setIsAddingSubtask] = useState(false);
     const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
     const [isLoading, setIsLoading] = useState(false);

     const initialFormData = useMemo(() => createInitialFormData(), []);

     const { data, setData, post, patch, reset, errors, setError, clearErrors } =
          useForm(initialFormData);

     const clearFormState = () => {
          setData({ ...initialFormData });
          reset(initialFormData);
          setNewSubtaskTitle("");
          setIsAddingSubtask(false);
          clearErrors();
     };

     useEffect(() => {
          if (!isOpen) return;

          if (task) {
               setData({
                    title: task.title || "",
                    description: task.description || "",
                    task_date: formatDatetimeLocal(task.task_date),
                    is_planned: !!task.is_planned,
                    upload_date: formatDatetimeLocal(task.upload_date),
                    priority: task.priority || null,
                    categories: task.categories || [],
                    can_edit: task.can_edit ?? true,
                    has_reminder: task.has_reminder ?? true,
                    subtasks: task.subtasks || [],
               });
          } else {
               clearFormState();
          }
     }, [task, isOpen]);

     const getLimitErrorMessage = (isPlannedTask) => {
          if (task) return null;

          const now = new Date();
          const plannedTasksCount = tasks.filter((item) => {
               if (item.is_completed || item.is_archived) return false;
               return (
                    item.is_planned &&
                    item.upload_date &&
                    new Date(item.upload_date).getTime() > now.getTime()
               );
          }).length;

          const currentTasksCount = tasks.filter((item) => {
               if (item.is_completed || item.is_archived) return false;
               return (
                    !item.is_planned ||
                    (item.is_planned &&
                         item.upload_date &&
                         new Date(item.upload_date).getTime() <= now.getTime())
               );
          }).length;

          if (isPlannedTask && plannedTasksCount >= 5) {
               return "Досягнуто ліміту запланованих задач (макс. 5).";
          }

          if (!isPlannedTask && currentTasksCount >= 7) {
               return "Досягнуто ліміту поточних задач (макс. 7).";
          }

          return null;
     };

     const validateTaskLimit = (isPlannedTask) => {
          const limitMessage = getLimitErrorMessage(isPlannedTask);

          if (limitMessage) {
               setError("limit", limitMessage);
               return false;
          }

          clearErrors("limit");
          return true;
     };

     const validateForm = () => {
          const validationErrors = {};

          if (!data.title.trim()) validationErrors.title = "Назва задачі обов'язкова!";
          if (!data.description.trim()) validationErrors.description = "Опис не може бути пустим!";

          if (!data.task_date) {
               validationErrors.taskDate = "Відсутній термін виконання!";
          } else {
               const taskDateMs = new Date(data.task_date).getTime();
               if (taskDateMs < Date.now()) {
                    validationErrors.taskDate = "Обраний термін виконання вже пройшов!";
               }
          }

          if (data.is_planned && !data.upload_date) {
               validationErrors.uploadDate = "Відсутній час застосування!";
          }

          if (!data.priority) validationErrors.priority = "Не вибраний приорітет!";

          if (data.is_planned && data.task_date && data.upload_date) {
               if (new Date(data.task_date).getTime() < new Date(data.upload_date).getTime()) {
                    validationErrors.taskDate =
                         "Термін виконання не може бути раніше за дату активації!";
               }
          }

          return validationErrors;
     };

     const handleSubmit = (e, onClose) => {
          if (e && e.preventDefault) e.preventDefault();
          clearErrors();

          const validationErrors = validateForm();
          if (!validateTaskLimit(Boolean(data.is_planned))) {
               return;
          }

          if (Object.keys(validationErrors).length > 0) {
               Object.keys(validationErrors).forEach((key) => setError(key, validationErrors[key]));
               return;
          }

          const handleSuccess = () => {
               if (typeof onClose === "function") {
                    onClose();
               }
          };

          if (task && task.id) {
               patch(`/tasks/${task.id}`, {
                    onSuccess: handleSuccess,
               });
          } else {
               post("/tasks", {
                    onSuccess: () => {
                         clearFormState();
                         handleSuccess();
                    },
               });
          }
     };

     const handleReset = (e) => {
          e.preventDefault();
          setIsLoading(true);
          clearFormState();
          setTimeout(() => {
               setIsLoading(false);
          }, 500);
     };

     return {
          data,
          setData,
          errors,
          clearErrors,
          isAddingSubtask,
          setIsAddingSubtask,
          newSubtaskTitle,
          setNewSubtaskTitle,
          isLoading,
          setIsLoading,
          clearFormState,
          handleSubmit,
          handleReset,
          validateTaskLimit,
     };
}
