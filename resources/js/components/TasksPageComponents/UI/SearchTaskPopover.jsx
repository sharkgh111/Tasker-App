import BaseTaskPopover from "./BaseTaskPopover";

export default function SearchTaskPopover({
     icon,
     iconSize = "w-8 h-8",
     popoverClass = "",
     items = [],
     activeSearchMode,
     handleSearchModeChange,
}) {
     return (
          <BaseTaskPopover icon={icon} iconSize={iconSize} popoverClass={popoverClass}>
               {({ close }) => (
                    <ul className="w-full flex items-center justify-center flex-col font-montserrat-medium text-main_lightily">
                         <p className="font-montserrat-medium text-center text-xl text-main_lightily border-b-2 py-2 px-5 border-main_lightily/20 whitespace-nowrap min-w-max">
                              Налаштування пошуку задач
                         </p>
                         {items.map((item) => (
                              <li
                                   key={item.id}
                                   onClick={() => {
                                        handleSearchModeChange(item.id);
                                        close();
                                   }}
                                   className={`py-1 transition-all text-md duration-200 px-3 hover:bg-main_green_dark/20 w-full ${
                                        item.id === activeSearchMode
                                             ? "bg-main_green_dark/80 text-white"
                                             : "bg-transparent hover:bg-main_green_dark/50 text-main_lightily"
                                   } text-center cursor-pointer`}
                              >
                                   {item.title}
                              </li>
                         ))}
                    </ul>
               )}
          </BaseTaskPopover>
     );
}
