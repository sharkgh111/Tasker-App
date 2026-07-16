import React from "react";
import { router } from "@inertiajs/react";
import { FaRegTrashCan, FaRotateLeft } from "react-icons/fa6";
import IconButton from "@/ui/IconButton";

export default function DeferredTaskToolbar({ task }) {
     return (
          <section className="flex-none w-[100px] min-w-[100px] flex flex-col items-center justify-center p-4">
               <div className="w-full h-full flex flex-col items-center justify-center gap-5">
                    <IconButton
                         Icon={FaRotateLeft}
                         type="button"
                         onClick={() =>
                              router.patch(
                                   `/tasks/${task.id}`,
                                   {
                                        is_deferred: false,
                                        is_archived: false,
                                   },
                                   {
                                        preserveScroll: true,
                                        preserveState: true,
                                        only: ["deferredTasks"],
                                   },
                              )
                         }
                         className="bg-main_green_primary border-2 border-main_lightly hover:bg-main_green_primary/80 hover:scale-95"
                         iconSize="w-9 h-9"
                    />
                    <IconButton
                         Icon={FaRegTrashCan}
                         type="button"
                         onClick={() => {
                              if (
                                   confirm("Ви впевнені, що хочете видалити цю відкладену задачу?")
                              ) {
                                   router.delete(`/tasks/${task.id}`);
                              }
                         }}
                         className="bg-danger_light border-2 border-main_lightly hover:bg-danger_light/80 hover:scale-95"
                         iconSize="w-9 h-9"
                    />
               </div>
          </section>
     );
}
