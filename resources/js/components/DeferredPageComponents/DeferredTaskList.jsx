import React from "react";

import DeferredTaskCard from "./DeferredTaskCard";

import { TASK_CATEGORIES } from "@/constants/taskCategories";
import { PRIORITY_OPTIONS } from "@/constants/priorityOptions";
import { getTaskStatusMeta } from "@/components/TasksPageComponents/task/utils/taskStatusUtils";

export default function DeferredTaskList({ deferredTasks = [] }) {
     const categoryLookup = new Map(TASK_CATEGORIES.map((category) => [category.name, category]));
     const priorityLookup = new Map(PRIORITY_OPTIONS.map((option) => [option.value, option]));

     const formatDate = (value) => {
          if (!value) return "Термін не вказано";
          const date = new Date(value.replace("T", " "));
          if (Number.isNaN(date.getTime())) return "Термін не вказано";

          return date.toLocaleString("uk-UA", {
               day: "numeric",
               month: "long",
               year: "numeric",
               hour: "2-digit",
               minute: "2-digit",
          });
     };

     return <DeferredTaskCard deferredTasks={deferredTasks} categoryLookup={categoryLookup} priorityLookup={priorityLookup} formatDate={formatDate} getTaskStatusMeta={getTaskStatusMeta} />;
}
