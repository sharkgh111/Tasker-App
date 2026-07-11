import React, { useState, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { useForm } from "@inertiajs/react";

import Button from "@/Components/UI/Button";
import TaskManager from "./TaskManager";
import SubTaskManager from "./SubTaskManager";
import OtherOptions from "./OtherOptions";
import LoadingOverlay from "../../Overlays/LoadingOverlayModal";
import { IoCreateOutline } from "react-icons/io5";
import { TbCancel } from "react-icons/tb";
import { MdOutlineCreate } from "react-icons/md";

import { LuPlus, LuTrash2 } from "react-icons/lu";

export default function TaskModal({ isOpen, onClose, task = null, tasks = [], afterLeave }) {
   const initialFormData = {
      title: "",
      description: "",
      task_date: "",
      is_planned: false,
      upload_date: "",
      priority: null,
      categories: [],
      can_edit: true,
      can_archive: true,
      has_reminder: true,
      subtasks: [],
   };

   const [isAddingSubtask, setIsAddingSubtask] = useState(false);
   const [newSubtaskTitle, setNewSubtaskTitle] = useState("");

   const { data, setData, post, patch, reset, errors, setError, clearErrors } = useForm(initialFormData);

   const formatDatetimeLocal = (value) => {
      if (!value) return "";

      const normalized = String(value).replace(" ", "T");
      const date = new Date(normalized);
      if (Number.isNaN(date.getTime())) return "";

      const pad = (num) => String(num).padStart(2, "0");
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
   };

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
            can_archive: !!task.can_archive,
            has_reminder: task.has_reminder ?? true,
            subtasks: task.subtasks || [],
         });
      } else {
         clearFormState();
      }
   }, [task, isOpen]);

   const isActionForbidden = task && data.is_planned !== !!task.is_planned;
   const isTaskLocked = task && data.is_planned !== !!task.is_planned;

   const [isLoading, setIsLoading] = useState(false);

   const getLimitErrorMessage = (isPlannedTask) => {
      if (task) return null;

      const now = new Date();
      const plannedTasksCount = tasks.filter((item) => {
         if (item.is_completed || item.is_archived) return false;
         return item.is_planned && item.upload_date && new Date(item.upload_date).getTime() > now.getTime();
      }).length;

      const currentTasksCount = tasks.filter((item) => {
         if (item.is_completed || item.is_archived) return false;
         return !item.is_planned || (item.is_planned && item.upload_date && new Date(item.upload_date).getTime() <= now.getTime());
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

   const overallWidth = "450px";

   const handleSubmit = (e) => {
      if (e && e.preventDefault) e.preventDefault();
      clearErrors();

      let validationErrors = {};

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

      if (data.is_planned && !data.upload_date) validationErrors.uploadDate = "Відсутній час застосування!";

      if (!data.priority) validationErrors.priority = "Не вибраний приорітет!";

      if (data.is_planned && data.task_date && data.upload_date) {
         if (new Date(data.task_date).getTime() < new Date(data.upload_date).getTime()) {
            validationErrors.taskDate = "Термін виконання не може бути раніше за дату активації!";
         }
      }

      if (!validateTaskLimit(Boolean(data.is_planned))) {
         return;
      }

      if (Object.keys(validationErrors).length > 0) {
         Object.keys(validationErrors).forEach((key) => setError(key, validationErrors[key]));
         return;
      }

      if (task && task.id) {
         patch(`/tasks/${task.id}`, {
            onSuccess: () => {
               onClose();
            },
         });
      } else {
         post("/tasks", {
            onSuccess: () => {
               clearFormState();
               onClose();
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

   return (
      <Transition
         show={isOpen}
         as={React.Fragment}
         afterLeave={() => {
            if (afterLeave) afterLeave();
            clearFormState();
         }}
      >
         <Dialog as="div" className="relative z-50" onClose={onClose}>
            <TransitionChild
               as={React.Fragment}
               enter="ease-out duration-300"
               enterFrom="opacity-0"
               enterTo="opacity-100"
               leave="ease-in duration-200"
               leaveFrom="opacity-100"
               leaveTo="opacity-0"
            >
               <div className="fixed inset-0 backdrop-blur-sm bg-black/40 " />
            </TransitionChild>
            <div className="fixed inset-0 overflow-y-auto flex items-center justify-center p-4">
               <TransitionChild
                  as={React.Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
               >
                  <DialogPanel
                     style={{ "--overall-w": overallWidth }}
                     className="w-full max-w-7xl h-[60vh] flex flex-col transform rounded-2xl bg-main_green_primary/30 backdrop-blur-lg border-[3px] border-main_lightly/30 text-left shadow-2xl transition-all"
                  >
                     <LoadingOverlay isLoading={isLoading} />
                     <div className="flex flex-col flex-grow min-h-0">
                        <form id="task-create-form" onSubmit={handleSubmit} className="flex flex-row flex-grow min-h-0 border-b-[3px] border-main_lightly/30">
                           <TaskManager
                              data={data}
                              setData={setData}
                              errors={errors}
                              clearErrors={clearErrors}
                              task={task}
                              onToggleChange={(nextValue) => {
                                 setData("is_planned", nextValue);
                                 validateTaskLimit(nextValue);
                              }}
                           />

                           <SubTaskManager
                              subtasks={data.subtasks}
                              isAddingSubtask={isAddingSubtask}
                              setIsAddingSubtask={setIsAddingSubtask}
                              setNewSubtaskTitle={setNewSubtaskTitle}
                              newSubtaskTitle={newSubtaskTitle}
                              setData={setData}
                           />

                           <OtherOptions data={data} setData={setData} errors={errors} />
                        </form>

                        <footer className="flex-shrink-0 p-5 mt-auto border-t border-main_lightly/30">
                           {errors.limit && <div className="mb-4 text-xl font-montserrat-medium text-danger_light">{errors.limit}</div>}
                           <div className="flex justify-between items-center">
                              <Button
                                 type="button"
                                 text="Очистити"
                                 Icon={LuTrash2}
                                 iconSize="w-6 h-6"
                                 className="border-2 bg-danger_light hover:bg-danger_light/80 font-montserrat-medium px-[50px] py-[5px] text-2xl"
                                 onClick={handleReset}
                              />
                              <div className="flex items-center justify-center gap-5">
                                 <Button
                                    type="button"
                                    Icon={TbCancel}
                                    iconSize="w-7 h-7"
                                    text="Скасувати"
                                    className="border-2 bg-main_green_primary hover:bg-main_green_primary/70 font-montserrat-medium px-[50px] py-[5px] text-2xl"
                                    onClick={onClose}
                                 />
                                 <Button
                                    type="submit"
                                    form="task-create-form"
                                    Icon={MdOutlineCreate}
                                    iconSize="w-7 h-7"
                                    onClick={handleSubmit}
                                    disabled={isActionForbidden}
                                    text={task ? "Зберегти" : "Створити"}
                                    className={`${isTaskLocked ? "bg-gray-500 cursor-not-allowed" : "bg-main_green_dark"} border-2 bg-main_green_dark hover:bg-main_green_dark/80 font-montserrat-medium px-[50px] py-[5px] text-2xl`}
                                 />
                              </div>
                           </div>
                        </footer>
                     </div>
                  </DialogPanel>
               </TransitionChild>
            </div>
         </Dialog>
      </Transition>
   );
}
