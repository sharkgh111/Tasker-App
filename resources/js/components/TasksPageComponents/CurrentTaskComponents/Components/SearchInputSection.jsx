import React from "react";

import TaskPopover from "../../UI/BaseTaskPopover";

import { IoSettingsOutline } from "react-icons/io5";

export default function SearchInputSection({
     searchQuery,
     setSearchQuery,
     searchPlaceholder,
     SEARCH_QUERY_SETTING,
     activeSearchMode,
     handleSearchModeChange,
}) {
     return (
          <div className="flex-1 mx-10 relative">
               <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="
                                w-full appearance-none transition-all duration-300 bg-main_green_light/30 
                                rounded-xl border-2 border-main_lightly px-3 text-main_lightily font-montserrat-medium 
                                text-lg cursor-text focus:border-main_green_primary placeholder:text-main_lightly/50 placeholder:italic
                            "
                    placeholder={searchPlaceholder}
               />
               <TaskPopover
                    icon={IoSettingsOutline}
                    type="search"
                    popoverClass="absolute top-[8px] right-2"
                    array={SEARCH_QUERY_SETTING}
                    activeSearchMode={activeSearchMode}
                    handleSearchModeChange={handleSearchModeChange}
               />
          </div>
     );
}
