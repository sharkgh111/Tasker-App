import { useCallback } from "react";
import { FiFilter } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { FaArrowDownUpAcrossLine } from "react-icons/fa6";
import IconButton from "../../../ui/IconButton";

import FilterTask from "../task/ui/BaseTaskPopover";
import { FILTER_TASKS_SETUP } from "@/Constants/filterTaskSetup";
import { router } from "@inertiajs/react";

export default function Toolbar({ tasks, setReverseList, activeFilters, handleApplyFilters, handleClearFilters }) {
     const handleReverse = useCallback(() => {
          setReverseList((previous) => !previous);
     }, [setReverseList]);

     const handleDeleteAll = useCallback(() => {
          if (tasks.length && confirm("Ви впевнені, що хочете видалити всі задачі? Заплановані та поточні задачі будуть видалені після підтвердження")) {
               router.delete("/tasks");
          }
     }, [tasks.length]);

     const toolbarItems = [
          {
               component: FilterTask,
               props: {
                    icon: FiFilter,
                    type: "filter",
                    array: FILTER_TASKS_SETUP,
                    activeSearchMode: activeFilters,
                    handleApplyFilters,
                    handleClearFilters,
               },
          },
          {
               component: IconButton,
               props: {
                    Icon: FaArrowDownUpAcrossLine,
                    iconSize: "w-8 h-8",
                    onClick: handleReverse,
               },
          },
          {
               component: IconButton,
               props: {
                    Icon: FiTrash2,
                    iconSize: "w-8 h-8",
                    onClick: handleDeleteAll,
               },
          },
     ];

     return (
          <div className="flex items-center justify-center gap-3">
               {toolbarItems.map((item, index) => {
                    const Component = item.component;
                    return <Component key={index} {...item.props} />;
               })}
          </div>
     );
}
