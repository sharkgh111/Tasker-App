import ArchivedRecentlyCardList from "./ArchivedRecentlyCardList";

export default function ArchivedRecently({ tasks = [] }) {
    return (
        <div className="flex flex-grow flex-col min-h-0 items-center justify-between">
            <h2 className="font-montserrat-medium text-main_lightly text-2xl text-center py-3">Архівовані нещодавно</h2>
            <div className="flex flex-1 min-h-0 w-full border-t-4 border-main_lightly/30">
                <ArchivedRecentlyCardList tasks={tasks} />
            </div>
        </div>
    );
}