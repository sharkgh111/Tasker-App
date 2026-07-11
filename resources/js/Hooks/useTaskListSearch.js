import { useCallback, useMemo, useState } from "react";

import { getTaskSearchPlaceholder } from "@/Utils/taskUtils";

export function useTaskListSearch() {
   const [searchQuery, setSearchQuery] = useState("");
   const [activeSearchMode, setActiveSearchMode] = useState(1);

   const handleSearchModeChange = useCallback((modeId) => {
      setActiveSearchMode(modeId);
   }, []);

   const searchPlaceholder = useMemo(() => getTaskSearchPlaceholder(activeSearchMode), [activeSearchMode]);

   return {
      searchQuery,
      setSearchQuery,
      activeSearchMode,
      handleSearchModeChange,
      searchPlaceholder,
   };
}
