import { useCallback, useEffect, useState } from "react";

export function usePlannedTaskNotifications(plannedTasks = [], openPlanned, setOpenPlanned) {
     const storageKey = "tasker-planned-last-seen-count";
     const [lastSeenPlannedCount, setLastSeenPlannedCount] = useState(0);
     const [unreadPlannedCount, setUnreadPlannedCount] = useState(0);

     const handleClosePlanned = useCallback(() => {
          setOpenPlanned(false);
     }, [setOpenPlanned]);

     const handleOpenPlanned = useCallback(() => {
          setOpenPlanned(true);
     }, [setOpenPlanned]);

     useEffect(() => {
          if (typeof window === "undefined") {
               return;
          }

          const storedCount = window.localStorage.getItem(storageKey);

          if (storedCount !== null) {
               setLastSeenPlannedCount(Number(storedCount));
               return;
          }

          window.localStorage.setItem(storageKey, String(plannedTasks.length));
          setLastSeenPlannedCount(plannedTasks.length);
     }, [plannedTasks.length, storageKey]);

     useEffect(() => {
          if (typeof window === "undefined") {
               return;
          }

          if (openPlanned || plannedTasks.length < lastSeenPlannedCount) {
               window.localStorage.setItem(storageKey, String(plannedTasks.length));
               setLastSeenPlannedCount(plannedTasks.length);
               setUnreadPlannedCount(0);
               return;
          }

          setUnreadPlannedCount(plannedTasks.length - lastSeenPlannedCount);
     }, [plannedTasks.length, openPlanned, lastSeenPlannedCount]);

     return {
          unreadPlannedCount,
          handleClosePlanned,
          handleOpenPlanned,
     };
}
