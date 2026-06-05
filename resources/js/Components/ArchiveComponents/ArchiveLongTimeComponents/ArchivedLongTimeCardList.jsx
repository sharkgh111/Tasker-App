import ArchiveTaskCard from '@/Components/ArchiveComponents/ArchiveTaskCard';

export default function ArchivedLongTimeCardList({ tasks = [] }) {
    return (
        <div className="flex flex-1 flex-col gap-4 items-stretch justify-start min-h-0 w-full p-5">
            {tasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-12">
                    <p className="text-main_lightly text-lg font-montserrat-regular">Тут ще немає старих архівних задач</p>
                </div>
            ) : (
                tasks.map(task => (
                    <ArchiveTaskCard key={task.id} task={task} />
                ))
            )}
        </div>
    );
}