import React from 'react';
import AppLayout from '@/Components/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import ArchiveContainer from '../Components/ArchiveComponents/ArchiveContainer';

export default function ArchivePage({ archiveTasks = [] }) {
    return (
        <AppLayout>
            <Head title="Архів" />
            <ArchiveContainer archiveTasks={archiveTasks} />
        </AppLayout>
    );
}