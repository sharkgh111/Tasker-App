import React from 'react';
import AppLayout from '@/Components/Layouts/AppLayout';
import { Head } from '@inertiajs/react';

export default function Home() {
    return (
        <AppLayout>

            <Head title="Головна" />

            <div className="rounded-md text-main_lightly flex flex-col flex-1 h-full w-full overflow-hidden">
                
                <div className="h-[70%] border-b-[3px] border-main_lightly p-8 gap-10 flex flex-col justify-center">
                    <h1 className="text-4xl font-light mb-6 font-montserrat-light">
                        Керуй своїми справами без зайвого хаосу
                    </h1>
                    <p className="pr-60 text-lg leading-relaxed text-justify font-montserrat-medium">
                        Tasker — це твій мінімалістичний та швидкий інструмент для щоденного планування. 
                        Більше не потрібно тримати сотні завдань у голові чи записувати їх на клаптиках паперу. 
                        Наш задачник створений для тих, хто цінує простоту: жодних перевантажених 
                        інтерфейсів, лише ти і твої цілі. Фокусуйся на важливому, плануй свій день за 
                        лічені секунди та відчувай задоволення від кожного виконаного пункту.
                    </p>
                </div>

                <div className="h-auto w-full flex flex-col justify-start p-6">
                    <ul className="flex flex-col gap-[20px] text-xl text-main_lightly pl-4 font-montserrat-medium">
                        <li className="flex items-center gap-3">
                            <span>📩</span> Додавай миттєво Записуй ідеї, робочі таски чи побутові справи...
                        </li>
                        <li className="flex items-center gap-3">
                            <span>✏️</span> Редагуй на льоту Плани змінилися? Легко змінюй назву...
                        </li>
                        <li className="flex items-center gap-3">
                            <span>✅</span> Відзначай виконане Клікай по чекбоксу та отримуй чистий спокій...
                        </li>
                    </ul>
                </div>

            </div>
        </AppLayout>
    );
}