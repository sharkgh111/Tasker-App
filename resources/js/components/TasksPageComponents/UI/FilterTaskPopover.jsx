import { useState, useEffect } from "react";
import BaseTaskPopover from "./BaseTaskPopover";
import Button from "@/ui/Button";
import { LuPlus, LuTrash2 } from "react-icons/lu";

const normalizeFilters = (filters) => {
     if (!Array.isArray(filters) || filters.length === 0) {
          return ["all"];
     }

     return filters;
};

export default function FilterTaskPopover({
     icon,
     iconSize = "w-8 h-8",
     popoverClass = "",
     items = [],
     activeFilters,
     handleApplyFilters,
     handleClearFilters,
}) {
     const [tempFilters, setTempFilters] = useState(() => normalizeFilters(activeFilters));

     useEffect(() => {
          setTempFilters(normalizeFilters(activeFilters));
     }, [activeFilters]);

     const toggleTempFilter = (id) => {
          if (id === "all") {
               setTempFilters(["all"]);
               return;
          }

          setTempFilters((prev) => {
               const withoutAll = prev.filter((item) => item !== "all");
               const isSelected = withoutAll.includes(id);
               const nextFilters = isSelected
                    ? withoutAll.filter((item) => item !== id)
                    : [...withoutAll, id];

               return nextFilters.length > 0 ? nextFilters : ["all"];
          });
     };

     const applyFilters = (close) => {
          const nextFilters = tempFilters.length > 0 ? tempFilters : ["all"];

          if (typeof handleApplyFilters === "function") {
               handleApplyFilters(nextFilters);
          }

          close();
     };

     return (
          <BaseTaskPopover icon={icon} iconSize={iconSize} popoverClass={popoverClass}>
               {({ close }) => (
                    <div className="flex gap-0 flex-col text-main_lightily">
                         <p className="font-montserrat-medium text-center text-xl text-main_lightily border-b-2 py-2 px-6 border-main_lightily/20">
                              Фільтрація задач
                         </p>
                         <div className="grid grid-cols-2 w-full text-base font-montserrat-regular">
                              {items.map((item) => {
                                   const isSelected =
                                        Array.isArray(tempFilters) && tempFilters.includes(item.id);

                                   return (
                                        <button
                                             key={item.id}
                                             onClick={() => toggleTempFilter(item.id)}
                                             className={`p-4 font-montserrat-medium transition-all duration-200 border-r border-main_lightily/20 even:border-r-0 ${
                                                  isSelected
                                                       ? "bg-main_green_dark/80 text-white"
                                                       : "bg-transparent hover:bg-main_green_dark/50 text-main_lightily"
                                             }`}
                                        >
                                             {item.title}
                                        </button>
                                   );
                              })}
                         </div>
                         <div className="w-full flex items-center gap-4 justify-between border-t-2 p-3 border-main_lightily/20">
                              <Button
                                   type="button"
                                   text="Очистити"
                                   Icon={LuTrash2}
                                   onClick={() => {
                                        setTempFilters(["all"]);
                                        if (typeof handleClearFilters === "function") {
                                             handleClearFilters();
                                        }
                                   }}
                                   iconSize="w-5 h-5"
                                   className="border-2 bg-danger_light hover:bg-danger_light/80 font-montserrat-medium px-7 py-[4px] text-xl"
                              />
                              <Button
                                   type="button"
                                   text="Застосувати"
                                   Icon={LuPlus}
                                   onClick={() => applyFilters(close)}
                                   iconSize="w-6 h-6"
                                   className="border-2 bg-main_green_primary hover:bg-main_green_primary/80 font-montserrat-medium px-10 py-[4px] text-xl"
                              />
                         </div>
                    </div>
               )}
          </BaseTaskPopover>
     );
}
