import { useCallback } from "react";
import { FiFilter } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { FaArrowDownUpAcrossLine } from "react-icons/fa6";
import IconButton from "@/ui/IconButton";

import FilterTaskPopover from "../../UI/FilterTaskPopover";
import Tooltip from "@/ui/Tooltip";
import { FILTER_TASKS_SETUP } from "@/constants/filterTaskSetup";
import { router } from "@inertiajs/react";

export default function Toolbar({
     tasks,
     setReverseList,
     activeFilters,
     handleApplyFilters,
     handleClearFilters,
}) {
     const handleReverse = useCallback(() => {
          setReverseList((previous) => !previous);
     }, [setReverseList]);

     const handleDeleteAll = useCallback(() => {
          if (
               tasks.length &&
               confirm(
                    "Ви впевнені, що хочете видалити всі задачі? Заплановані та поточні задачі будуть видалені після підтвердження",
               )
          ) {
               router.delete("/tasks");
          }
     }, [tasks.length]);

     const toolbarItems = [
          {
               component: FilterTaskPopover,
               text: "Фільтрувати",
               props: {
                    icon: FiFilter,
                    popoverClass: "",
                    items: FILTER_TASKS_SETUP,
                    activeFilters,
                    handleApplyFilters,
                    handleClearFilters,
               },
          },
          {
               component: IconButton,
               text: "Розвернути список",
               props: {
                    Icon: FaArrowDownUpAcrossLine,
                    iconSize: "w-8 h-8",
                    onClick: handleReverse,
               },
          },
          {
               component: IconButton,
               text: "Видалити усі завдання",
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
                    return (
                         <Tooltip key={index} text={item.text}>
                              <Component {...item.props} />
                         </Tooltip>
                    );
               })}
          </div>
     );
}
