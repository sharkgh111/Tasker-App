import React from "react";
import AppLayout from "@/layouts/AppLayout";
import { Head } from "@inertiajs/react";

import ArchiveContainer from "@/components/ArchivePageComponents/ArchiveContainer";

export default function ArchiveTasksPage({ archiveTasks = [] }) {
     return (
          <AppLayout>
               <Head title="Архів" />
               <ArchiveContainer archiveTasks={archiveTasks} />
          </AppLayout>
     );
}
