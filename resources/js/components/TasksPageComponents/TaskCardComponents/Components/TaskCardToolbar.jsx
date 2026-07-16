import React from "react";

import { router } from "@inertiajs/react";

import IconButton from "@/ui/IconButton";
import { FaPencil, FaRegTrashCan } from "react-icons/fa6";
import { FaClockRotateLeft } from "react-icons/fa6";

export default function TaskCardToolbar({ task, taskStatus, isPlanned, openModal }) {
     return (
          <>
               <div className="py-3 flex flex-col gap-2 items-center justify-between flex-shrink-0">
                    {!task.is_completed &&
                         task.can_edit &&
                         taskStatus.text !== "Протерміновано" && (
                              <IconButton
                                   Icon={FaPencil}
                                   type="button"
                                   onClick={() => openModal(task)}
                                   className="bg-main_green_dark border-2 border-main_lightly hover:bg-main_green_dark/80 hover:scale-95"
                                   iconSize="w-6 h-6"
                              />
                         )}
                    {!isPlanned && (
                         <IconButton
                              Icon={FaClockRotateLeft}
                              type="button"
                              onClick={() =>
                                   router.patch(
                                        `/tasks/${task.id}`,
                                        {
                                             is_archived: false,
                                             is_deferred: true,
                                        },
                                        {
                                             preserveScroll: true,
                                             preserveState: true,
                                             only: ["tasks"],
                                        },
                                   )
                              }
                              className="bg-main_green_primary border-2 border-main_lightly hover:bg-main_green_primary/80 hover:scale-95"
                              iconSize="w-6 h-6"
                         />
                    )}

                    <IconButton
                         Icon={FaRegTrashCan}
                         onClick={() => {
                              if (confirm("Ви впевнені, що хочете видалити цю задачу?")) {
                                   router.delete(`/tasks/${task.id}`);
                              }
                         }}
                         type="button"
                         className="bg-danger_light border-2 border-main_lightly hover:bg-danger_light/80 hover:scale-95"
                         iconSize="w-6 h-6"
                    />
               </div>
          </>
     );
}
