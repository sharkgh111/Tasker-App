import React from "react";

import SearchTaskPopover from "../../UI/SearchTaskPopover";

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
          <div className="relative flex-1 mx-10">
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
               <SearchTaskPopover
                    icon={IoSettingsOutline}
                    popoverClass="absolute right-3 top-7 -translate-y-1/2"
                    items={SEARCH_QUERY_SETTING}
                    activeSearchMode={activeSearchMode}
                    handleSearchModeChange={handleSearchModeChange}
               />
          </div>
     );
}
