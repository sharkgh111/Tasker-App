import { useState, useEffect } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import Button from "@/UI/Button";
import { LuPlus, LuTrash2 } from "react-icons/lu";

export default function BasePopover({
     popoverClass,
     activeSearchMode,
     handleSearchModeChange,
     handleApplyFilters,
     handleClearFilters,
     type = "default",
     icon: Icon,
     iconSize = "w-8 h-8",
     array = [],
}) {
     const normalizeFilters = (filters) => {
          if (!Array.isArray(filters) || filters.length === 0) {
               return ["all"];
          }

          return filters;
     };

     const [tempFilters, setTempFilters] = useState(() => normalizeFilters(activeSearchMode));

     useEffect(() => {
          setTempFilters(normalizeFilters(activeSearchMode));
     }, [activeSearchMode]);

     const toggleTempFilter = (id) => {
          if (id === "all") {
               setTempFilters(["all"]);
               return;
          }

          setTempFilters((prev) => {
               const withoutAll = prev.filter((item) => item !== "all");
               const isSelected = withoutAll.includes(id);
               const nextFilters = isSelected ? withoutAll.filter((item) => item !== id) : [...withoutAll, id];

               return nextFilters.length > 0 ? nextFilters : ["all"];
          });
     };

     return (
          <Popover className={popoverClass}>
               <PopoverButton className="outline-none">
                    <Icon className={`text-main_lightly transition-all duration-300 hover:text-main_lightly/80 hover:scale-95 cursor-pointer ${iconSize}`} />
               </PopoverButton>
               <PopoverPanel anchor={{ to: "bottom end", offset: "20px" }} className="flex flex-col bg-main_green_dark/40 backdrop-blur-sm border border-main_lightly/30 rounded-xl shadow-xl mt-3">
                    {({ close }) => (
                         <>
                              {type === "search" && (
                                   <ul className="w-full flex items-center justify-center flex-col text-lg font-montserrat-medium text-main_lightly">
                                        {array.map((item) => (
                                             <li
                                                  key={item.id}
                                                  onClick={() => {
                                                       handleSearchModeChange(item.id);
                                                       close();
                                                  }}
                                                  className={`py-1 transition-all duration-200 px-3 hover:bg-main_green_dark/20 w-full ${item.id === activeSearchMode ? "bg-main_green_dark/30" : "bg-main_green_primary/60"} text-center cursor-pointer`}
                                             >
                                                  {item.title}
                                             </li>
                                        ))}
                                   </ul>
                              )}
                              {type === "filter" && (
                                   <div className="flex gap-0 flex-col text-main_lightly">
                                        <p className="font-montserrat-medium text-center text-xl text-main_lightly border-b-2 py-2 px-6 border-main_lightly/20">Фільтрація задач</p>
                                        <div className="grid grid-cols-2 w-full text-base font-montserrat-regular">
                                             {array.map((item) => {
                                                  const isSelected = Array.isArray(tempFilters) && tempFilters.includes(item.id);

                                                  return (
                                                       <button
                                                            key={item.id}
                                                            onClick={() => toggleTempFilter(item.id)}
                                                            className={`
                                                                    p-4 font-montserrat-medium transition-all duration-200 border-r border-main_lightly/20 even:border-r-0
                                                                    ${isSelected ? "bg-main_green_dark/80 text-white" : "bg-transparent hover:bg-main_green_dark/50 text-main_lightly"}
                                                                `}
                                                       >
                                                            {item.title}
                                                       </button>
                                                  );
                                             })}
                                        </div>
                                        <div className="w-full flex items-center justify-between border-t-2 py-3 px-6 border-main_lightly/20">
                                             <Button
                                                  type="button"
                                                  text="Очистити"
                                                  Icon={LuTrash2}
                                                  onClick={() => {
                                                       setTempFilters(["all"]);
                                                       handleClearFilters();
                                                  }}
                                                  iconSize="w-5 h-5"
                                                  className="border-2 bg-danger_light hover:bg-danger_light/80 font-montserrat-medium px-7 py-[4px] text-xl"
                                             />
                                             <Button
                                                  type="button"
                                                  text="Застосувати"
                                                  Icon={LuPlus}
                                                  onClick={() => {
                                                       const nextFilters = tempFilters.length > 0 ? tempFilters : ["all"];

                                                       if (typeof handleApplyFilters === "function") {
                                                            handleApplyFilters(nextFilters);
                                                       }

                                                       close();
                                                  }}
                                                  iconSize="w-6 h-6"
                                                  className="border-2 bg-main_green_primary hover:bg-main_green_primary/80 font-montserrat-medium px-10 py-[4px] text-xl"
                                             />
                                        </div>
                                   </div>
                              )}
                         </>
                    )}
               </PopoverPanel>
          </Popover>
     );
}
