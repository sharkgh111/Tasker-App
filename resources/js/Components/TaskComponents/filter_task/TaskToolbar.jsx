import React, { useCallback, useState } from "react";
import { FiFilter } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { FaArrowDownUpAcrossLine } from "react-icons/fa6";
import IconButton from "../../UI/IconButton";

import BasePopover from "../../UI/BasePopover";
import { FILTER_TASKS_SETUP } from "@/Constants/filterTaskSetup";
import { router } from "@inertiajs/react";

export default function Toolbar({ tasks, setReverseList, isReverseList, activeFilters, handleApplyFilters, handleClearFilters }) {
   const handleReverse = useCallback(() => {
      setReverseList((previous) => !previous);
   }, [setReverseList]);

   const handleDeleteAll = useCallback(() => {
      if (tasks.length && confirm("Ви впевнені, що хочете видалити всі задачі? Заплановані та поточні задачі будуть видалені після підтвердження")) {
         router.delete("/tasks");
      }
   }, [tasks.length]);

   return (
      <>
         <BasePopover
            icon={FiFilter}
            type="filter"
            array={FILTER_TASKS_SETUP}
            activeSearchMode={activeFilters}
            handleApplyFilters={handleApplyFilters}
            handleClearFilters={handleClearFilters}
         />
         <IconButton Icon={FaArrowDownUpAcrossLine} iconSize="w-8 h-8" onClick={handleReverse} />
         <IconButton Icon={FiTrash2} iconSize="w-8 h-8" onClick={handleDeleteAll} />
      </>
   );
}
