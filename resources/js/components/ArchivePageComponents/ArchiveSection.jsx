import ArchiveTaskCard from "./ArchiveTaskCard";
import EmptyState from "../../feedback/EmptyState";
import IconButton from "@/ui/IconButton";
import { LuTrash2 } from "react-icons/lu";

export default function ArchiveSection({ title, tasks, emptyTitle, borderClassName, onDelete }) {
     return (
          <div className={`flex items-center flex-col justify-start h-full ${borderClassName}`}>
               <div className="w-full relative flex items-center justify-center gap-3 pb-4 border-b-4 border-main_lightly/30">
                    <h3 className="font-montserrat-bold text-3xl text-main_lightly text-left">
                         {title}
                    </h3>
                    {onDelete && (
                         <IconButton
                              Icon={LuTrash2}
                              type="button"
                              onClick={onDelete}
                              className="text-main_lightly hover:text-main_lightly/70 absolute right-2 bottom-1"
                              iconSize="w-10 h-10"
                              color="text-main_lightly"
                         />
                    )}
               </div>
               <div className="flex flex-col items-center justify-start gap-3 flex-1 h-full p-5 w-full overflow-y-auto">
                    {tasks.length === 0 ? (
                         <EmptyState title={emptyTitle} />
                    ) : (
                         tasks.map((task) => (
                              <ArchiveTaskCard key={task.id} task={task} className="w-full" />
                         ))
                    )}
               </div>
          </div>
     );
}
