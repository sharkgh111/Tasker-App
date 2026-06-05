import React from 'react';
import AppLayout from '@/Components/Layouts/AppLayout';
import { Head } from '@inertiajs/react';

export default function Home() {
    return (
        <AppLayout>

            <Head title="Головна" />

            <div className="rounded-md text-main_lightly flex flex-col justify-evenly flex-1 h-full w-full overflow-hidden">
                <div className='flex items-center justify-center'>
                    <div className="h-[70%] p-8 gap-10 flex flex-col justify-center">
                        <h1 className="text-4xl font-light mb-6 font-montserrat-light">
                          Керуй своїми справами без зайвого хаосу
                        </h1>
                        <p className="pb-5 text-lg leading-relaxed text-justify font-montserrat-medium border-b-4 border-main_lightly/20">
                            Tasker — це твій мінімалістичний та швидкий інструмент для щоденного планування. 
                            Більше не потрібно тримати сотні завдань у голові чи записувати їх на клаптиках паперу. 
                            Наш задачник створений для тих, хто цінує простоту: жодних перевантажених 
                            інтерфейсів, лише ти і твої цілі. Фокусуйся на важливому, плануй свій день за 
                            лічені секунди та відчувай задоволення від кожного виконаного пункту.
                        </p>
                    </div>
                        <img src="/images/tasker-3.png" alt="Tasker-3" />
                </div>

                <div className="h-auto w-full flex flex-col justify-start p-6">
                    <ul className="flex flex-col gap-[20px] text-xl text-main_lightly pl-4 font-montserrat-medium">
                        <li className="flex items-center pb-2 gap-3 border-b-4 border-main_lightly/20">
                            <span>📩</span> Додавай миттєво Записуй ідеї, робочі таски чи побутові справи...
                        </li>
                        <li className="flex items-center pb-2 gap-3 border-b-4 border-main_lightly/20">
                            <span>✏️</span> Редагуй на льоту Плани змінилися? Легко змінюй назву...
                        </li>
                        <li className="flex items-center pb-2 gap-3 border-b-4 border-main_lightly/20">
                            <span>✅</span> Відзначай виконане Клікай по чекбоксу та отримуй чистий спокій...
                        </li>
                    </ul>
                </div>

            </div>
        </AppLayout>
    );
}