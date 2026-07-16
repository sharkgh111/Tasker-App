import React from "react";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";

import Button from "@/ui/Button";
import TaskManager from "./Components/TaskManager";
import SubTaskManager from "./Components/SubTaskManager";
import OtherOptions from "./Components/OtherOptions";
import LoadingOverlay from "@/feedback/LoadingOverlayModal";
import { TbCancel } from "react-icons/tb";
import { MdOutlineCreate } from "react-icons/md";

import { LuTrash2 } from "react-icons/lu";
import { useTaskForm } from "./Hooks/useTaskForm";

export default function TaskModal({ isOpen, onClose, task = null, tasks = [], afterLeave }) {
     const {
          data,
          setData,
          errors,
          clearErrors,
          isAddingSubtask,
          setIsAddingSubtask,
          newSubtaskTitle,
          setNewSubtaskTitle,
          isLoading,
          clearFormState,
          handleSubmit,
          handleReset,
          validateTaskLimit,
     } = useTaskForm({ isOpen, task, tasks });

     const isActionForbidden = task && data.is_planned !== !!task.is_planned;
     const isTaskLocked = task && data.is_planned !== !!task.is_planned;

     const overallWidth = "450px";

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
                                        <form
                                             id="task-create-form"
                                             onSubmit={handleSubmit}
                                             className="flex flex-row flex-grow min-h-0 border-b-[3px] border-main_lightly/30"
                                        >
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

                                             <OtherOptions
                                                  data={data}
                                                  setData={setData}
                                                  errors={errors}
                                             />
                                        </form>

                                        <footer className="flex-shrink-0 p-5 mt-auto border-t border-main_lightly/30">
                                             {errors.limit && (
                                                  <div className="mb-4 text-xl font-montserrat-medium text-danger_light">
                                                       {errors.limit}
                                                  </div>
                                             )}
                                             <div className="flex justify-between items-center">
                                                  <Button
                                                       type="button"
                                                       text="Очистити"
                                                       Icon={LuTrash2}
                                                       iconSize="w-6 h-6"
                                                       className="border-2 bg-danger_light hover:bg-danger_light/80 font-montserrat-medium px-[50px] py-[5px] text-2xl"
                                                       onClick={(event) => handleReset(event)}
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
                                                            onClick={(event) =>
                                                                 handleSubmit(event, onClose)
                                                            }
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
