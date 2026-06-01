import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { CiTextAlignLeft } from "react-icons/ci";
import { GoClock } from "react-icons/go";
import { IoMdAlarm } from "react-icons/io";

import Toggle from '@/Components/UI/Toggle';
import FieldInput from '@/Components/UI/BaseInput';


export default function TaskManager({ data, setData, errors, clearErrors, task }) {

    const handleChange = (field, value) => {
        setData(field, value);
        if (errors[field]) clearErrors(field);
    };

    return (
        <section className="flex flex-col px-3 py-5 w-[calc(var(--overall-w)-2px)] h-full overflow-y-auto flex-shrink-0 border-r-[3px] border-main_lightly">
            <Toggle 
                enabled={data.is_planned} 
                disabled={!!task} 
                classNameSlider="h-[21px] w-[21px] bg-main_lightly" 
                classNameSwitch={`${task ? 'opacity-50 cursor-not-allowed' : ''} bg-main_green_dark/80 border-main_lightly h-[29px] w-[55px]`}
                setEnabled={(val) => {
                    if (!task) { 
                            setData('is_planned', val);
                     }
                }}
            />
                <div className="flex flex-col flex-1 items-start py-5 gap-[40px] justify-center">
                    <div className="w-full flex items-center flex-col justify-start gap-2 border-b-2 pb-3 border-main_lightly/40">
                        <FieldInput 
                            Icon={MdOutlineDriveFileRenameOutline}
                            label="Назва завдання" 
                            placeholder="Введіть назву..." 
                            value={data.title}
                            className='placeholder:italic'
                            onChange={(e) => handleChange('title', e.target.value)}
                        />
                            {errors.title && (
                                <span className="text-danger_light text-md font-montserrat-medium self-start">
                                    {errors.title}
                                </span>
                            )}
                    </div>
                            <div className="w-full flex flex-col items-center justify-start gap-2 border-b-2 pb-3 border-main_lightly/40">
                                <FieldInput 
                                    Icon={CiTextAlignLeft}
                                    type='textarea'                                                    
                                    label="Опис завдання" 
                                    placeholder="Опишіть задачу..." 
                                    value={data.description}
                                    className='placeholder:italic'
                                    onChange={(e) => handleChange('description', e.target.value)}
                                />
                                    {errors.description && (
                                        <span className="text-danger_light text-md font-montserrat-medium self-start">
                                            {errors.description}
                                        </span>
                                    )}
                            </div>
                    <div className="w-full flex flex-col items-center justify-start gap-2 border-b-2 pb-3 border-main_lightly/40">
                            <FieldInput 
                                label="Термін" 
                                type="datetime-local"
                                Icon={GoClock}
                                value={data.task_date}
                                onChange={(e) => handleChange('task_date', e.target.value)}
                                className="cursor-pointer select-none [color-scheme:dark]" 
                            />
                                {errors.taskDate && (
                                    <span className="text-danger_light text-md font-montserrat-medium self-start">
                                        {errors.taskDate}
                                    </span>
                                )}
                    </div>
                            {data.is_planned && (
                                <div className="w-full flex flex-col items-center justify-start gap-2 border-b-2 pb-3 border-main_lightly/40">
                                    <FieldInput 
                                        label="Застосувати в" 
                                        type="datetime-local"
                                        Icon={IoMdAlarm}
                                        value={data.upload_date}
                                        onChange={(e) => handleChange('upload_date', e.target.value)}
                                        className="cursor-pointer select-none [color-scheme:dark]" 
                                    />
                                        {errors.uploadDate && (
                                            <span className="text-danger_light text-md font-montserrat-medium self-start">
                                                {errors.uploadDate}
                                            </span>
                                        )}
                                </div>
                            )}
                </div>
        </section>
    );
}