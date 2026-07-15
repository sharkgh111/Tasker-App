export default function TaskProgressBar({ percentage, animatedPercentage }) {
     return (
          <section className="flex w-full items-center gap-5 justify-center">
               <div className="w-1/2 bg-transparent border-2 border-main_lightly rounded-full h-4 p-[2px] flex items-center">
                    <div
                         className={` ${percentage == 100 ? "bg-succes_light" : "bg-main_green_light"} transition-all duration-1000 ease-out h-full rounded-full`}
                         style={{ width: `${percentage}%` }}
                    />
               </div>
               <span className={`font-montserrat-medium ${percentage == 100 ? "text-succes_light" : "text-main_lightly"} text-lg`}>{`${animatedPercentage}%`}</span>
          </section>
     );
}
