import React from "react";
import { router } from "@inertiajs/react";
import IconButton from "@/ui/IconButton";
import { FaRegTrashCan } from "react-icons/fa6";

export default function ArchiveTaskToolbar({ task }) {
     const handleDelete = () => {
          if (confirm("Ви впевнені, що хочете видалити цю архівну задачу?")) {
               router.delete(`/tasks/${task.id}`);
          }
     };

     return (
          <section className="flex-none w-[100px] min-w-[100px] flex flex-col items-center justify-center p-4">
               <div className="w-full h-full flex flex-col items-center justify-evenly gap-2">
                    <IconButton
                         Icon={FaRegTrashCan}
                         type="button"
                         onClick={handleDelete}
                         className="bg-danger_light border-2 border-main_lightly hover:bg-danger_light/80 hover:scale-95"
                         iconSize="w-9 h-9"
                    />
               </div>
          </section>
     );
}
