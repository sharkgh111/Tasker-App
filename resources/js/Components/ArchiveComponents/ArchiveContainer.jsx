import DeferredTask from "./DeferredTaskComponents/DeferredTask";
import ArchivedLongTime from "./ArchiveLongTimeComponents/ArhivedLongTime";
import ArchivedRecently from "./ArchiveRecentlyComponents/ArchivedRecently";

export default function ArchiveContainer({ archiveTasks = [] }) {
    const now = new Date();
    const recentThresholdMs = 1000 * 60 * 60 * 24 * 30; 

    const deferredTasks = archiveTasks.filter(task => task.is_deferred || !task.task_date || new Date(task.task_date).getTime() > now.getTime());
    const nonDeferredArchiveTasks = archiveTasks.filter(task => !task.is_deferred);

    const longTimeTasks = nonDeferredArchiveTasks.filter(task => {
        if (!task.task_date) return false;
        const taskDate = new Date(task.task_date);
        return !isNaN(taskDate.getTime()) && now.getTime() - taskDate.getTime() > recentThresholdMs;
    });

    const recentlyArchivedTasks = nonDeferredArchiveTasks.filter(task => {
        if (!task.task_date) return false;
        const taskDate = new Date(task.task_date);
        const age = now.getTime() - taskDate.getTime();
        return !isNaN(taskDate.getTime()) && age >= 0 && age <= recentThresholdMs;
    });

    return (
        <div className="flex flex-1 m-5 min-h-0">
            <ArchivedLongTime tasks={longTimeTasks} />
                <ArchivedRecently tasks={recentlyArchivedTasks} />
            <DeferredTask tasks={deferredTasks} />
        </div>
    );
}