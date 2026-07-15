import React from "react";
import AppLayout from "@/layouts/AppLayout";
import { Head } from "@inertiajs/react";

import DeferredTaskList from "../components/DeferredPageComponents/DeferredTaskList";

export default function DeferredTasksPage({ deferredTasks = [] }) {
     return (
          <AppLayout>
               <Head title="Відкладені" />
               <DeferredTaskList deferredTasks={deferredTasks} />
          </AppLayout>
     );
}
