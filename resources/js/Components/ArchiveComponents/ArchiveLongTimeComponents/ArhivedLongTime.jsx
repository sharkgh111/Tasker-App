import ArchivedLongTimeCardList from "./ArchivedLongTimeCardList";

export default function ArchivedLongTime({ tasks = [] }) {
    return (
        <div className="flex w-[500px] flex-col min-h-0 items-center justify-between">
            <h2 className="font-montserrat-medium text-main_lightly text-2xl text-center py-3">Архівовані давно</h2>
            <div className="flex flex-1 min-h-0 w-full border-t-4 border-r-4 border-main_lightly/30">
                <ArchivedLongTimeCardList tasks={tasks} />
            </div>
        </div>
    );
}