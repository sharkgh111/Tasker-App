import React from "react";

export default function TaskCategories({ task, categoryLookup, openPlanned }) {
     const sizeClass = openPlanned
          ? task.categories.length >= 5
               ? "text-[7px]"
               : "text-[10px]"
          : "text-base";

     return (
          <div className="flex flex-wrap gap-2 justify-end">
               {task.categories.map((categoryName, idx) => {
                    const originalCategory = categoryLookup.get(categoryName);

                    return (
                         <span
                              key={idx}
                              className={`${sizeClass} transition-all duration-200 flex items-center gap-1 px-3 py-1 font-montserrat-medium bg-main_green_light/20 border border-main_lightly/50 text-main_lightly/90 rounded-md select-none`}
                         >
                              {originalCategory && <span>{originalCategory.emoji}</span>}
                              <span>{categoryName}</span>
                         </span>
                    );
               })}
          </div>
     );
}
