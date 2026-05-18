import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, tasks = [] }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Привіт, {auth.user.name}! Твій Tasker 📋
                </h2>
            }
        >
            <Head title="Головна" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-6 text-gray-900 dark:text-gray-100">
                        <p className="text-center text-gray-500 mb-4">Фронтенд готовий. Червоні лінії переможено!</p>
                        <div className="text-sm text-gray-400 text-center">
                            Завдань у базі: {tasks.length}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}