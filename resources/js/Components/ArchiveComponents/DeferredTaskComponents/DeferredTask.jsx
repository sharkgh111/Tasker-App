import DeferredTaskCardList from "./DeferredTaskCardList";

export default function DeferredTask({ tasks = [] }) {
   return (
      <div className="flex w-[500px] flex-col min-h-0 items-center justify-between">
         <h2 className="font-montserrat-medium text-main_lightly text-2xl text-center py-3">Відкладені</h2>
         <div className="flex flex-1 min-h-0 w-full border-t-4 border-l-4 border-main_lightly/30">
            <DeferredTaskCardList tasks={tasks} />
         </div>
      </div>
   );
}
