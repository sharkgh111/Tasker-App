import ArchiveTaskCard from '@/Components/ArchiveComponents/ArchiveTaskCard';

export default function ArchivedRecentlyCardList({ tasks = [] }) {
    return (
        <div className="flex-1 min-h-0 w-full p-5 flex flex-col gap-4">
            {tasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-12">
                    <p className="text-main_lightly text-lg font-montserrat-regular">Тут ще немає нещодавно архівованих задач</p>
                </div>
            ) : (
                tasks.map(task => (
                    <ArchiveTaskCard key={task.id} task={task} />
                ))
            )}
        </div>
    );
}