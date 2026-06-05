import React from 'react';

import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { BsInfoSquare } from "react-icons/bs";

export default function Modal({
    setIsInfoOpen,
    title,
    description,
    deadline,
    priority,
    categories,
    isInfoOpen
}) {
    return (
        <Transition show={isInfoOpen} as={React.Fragment} afterLeave={() => setIsInfoOpen(false)}>
                <Dialog as="div" className="relative z-50" onClose={() => setIsInfoOpen(false)}>
                    <TransitionChild
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed backdrop-blur-sm inset-0 bg-black/50" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto flex items-center justify-center p-4">
                        <TransitionChild
                            as={React.Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel
                                className="w-full max-w-xl h-auto transform rounded-2xl p-4 bg-main_green_primary border-[3px] border-main_lightly text-left align-middle shadow-2xl transition-all"
                            >
                                <DialogTitle as="div" className="flex items-center justify-center gap-4">
                                    <BsInfoSquare className="w-8 h-8 text-main_lightly"/>
                                    <h2 className="text-3xl font-montserrat-medium text-main_lightly">
                                        Деталі завдання
                                    </h2>
                                </DialogTitle>
                                <div className="flex flex-1 flex-col justify-between pt-[70px] pb-5 px-5">
                                    <div className="space-y-3 text-main_lightly">
                                        <div className="flex items-center">
                                            <h2 className="text-2xl font-montserrat-medium">Заголовок: </h2>
                                                <p className="text-xl font-montserrat-regular pl-3">{title}</p>
                                        </div>
                                        <div className="flex items-center">
                                            <h2 className="text-2xl font-montserrat-medium">Термін:</h2>
                                                <p className="text-xl font-montserrat-regular pl-3">{deadline}</p>
                                        </div>
                                        <div className="flex items-center">
                                            <h2 className="text-2xl font-montserrat-medium">Опис:</h2>
                                                <p className="text-xl font-montserrat-regular pl-3">{description}</p>
                                        </div>
                                        <div className="flex items-center">
                                            <h2 className="text-2xl font-montserrat-medium">Категорії:</h2>
                                                <p className="text-xl font-montserrat-regular pl-3 whitespace-pre-wrap">{categories}</p>
                                        </div>
                                        <div className="flex items-center">
                                            <h2 className="text-2xl font-montserrat-medium">Пріорітет:</h2>
                                                <p className="text-xl font-montserrat-regular pl-3 whitespace-pre-wrap">{priority}</p>
                                        </div>
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </Dialog>
            </Transition>
    )
}