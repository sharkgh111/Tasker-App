import ArchiveTaskCard from "./ArchiveTaskCard";

export default function ArchiveSection({ title, tasks, emptyMessage, borderClassName }) {
     return (
          <div className={`flex items-center flex-col justify-start h-full ${borderClassName}`}>
               <h3 className="font-montserrat-medium text-3xl text-main_lightly pb-4 border-b-4 border-main_lightly/30 text-center w-full">{title}</h3>
               <div className="flex flex-col items-center justify-start gap-3 flex-1 h-full p-5 w-full overflow-y-auto">
                    {tasks.length === 0 ? (
                         <p className="flex-1 h-full text-lg content-center font-montserrat-regular text-main_lightly/70 text-center">{emptyMessage}</p>
                    ) : (
                         tasks.map((task) => <ArchiveTaskCard key={task.id} task={task} className="w-full" />)
                    )}
               </div>
          </div>
     );
}
