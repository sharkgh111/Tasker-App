import { useState } from "react";

export function useTaskModal() {
     const [isOpen, setIsOpen] = useState(false);
     const [editingTask, setEditingTask] = useState(null);

     const open = (task = null) => {
          setEditingTask(task);
          setIsOpen(true);
     };

     const close = () => {
          setIsOpen(false);
     };

     const reset = () => {
          setEditingTask(null);
     };

     return {
          isOpen,
          editingTask,
          open,
          close,
          reset,
     };
}
