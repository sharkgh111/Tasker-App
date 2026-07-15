import { TASK_CATEGORIES } from "@/constants/taskCategories";
import { PRIORITY_OPTIONS } from "@/constants/priorityOptions";
import { getToggleOptions } from "@/constants/toggleOptions";
import { BsHash } from "react-icons/bs";
import { TbFlagUp } from "react-icons/tb";

import Radio from "@/ui/RadioButton";

export default function OtherOptions({ setData, data, errors }) {
     const currentToggleOptions = getToggleOptions(data);

     const handleCategoryClick = (categoryName) => {
          const currentCategories = data.categories;
          if (currentCategories.includes(categoryName)) {
               setData(
                    "categories",
                    currentCategories.filter((item) => item !== categoryName),
               );
          } else {
               setData("categories", [...currentCategories, categoryName]);
          }
     };

     return (
          <section className="flex flex-col flex-1 min-w-0 min-h-0 w-[calc(var(--overall-w)-2px)] h-full flex-shrink-0 p-3 border-l-[3px] border-main_lightly/30 overflow-y-auto">
               <div className="flex flex-col items-center mb-4 justify-center w-full gap-2 border-b-4 pb-3 border-main_lightly/30">
                    <span className="flex items-center justify-center gap-2">
                         <TbFlagUp className="w-6 h-6 text-main_lightly" />
                         <h2 className="font-montserrat-bold text-xl text-main_lightly">Пріорітет</h2>
                    </span>
                    <div className="flex items-center justify-center">
                         {PRIORITY_OPTIONS.map((option) => (
                              <Radio
                                   key={option.value}
                                   name="priority"
                                   value={option.value}
                                   checked={data.priority === option.value}
                                   onChange={(e) => setData("priority", e.target.value)}
                                   defaultColor={option.color}
                                   label={option.label}
                              />
                         ))}
                    </div>
                    {errors.priority && <span className="text-danger_light text-md font-montserrat-medium self-center">{errors.priority}</span>}
               </div>
               <div className="flex flex-col items-center justify-center w-full gap-2 border-b-4 pb-3 border-main_lightly/30">
                    <span className="flex items-center justify-center">
                         <BsHash className="w-6 h-6 text-main_lightly" />
                         <h2 className="font-montserrat-bold text-xl text-main_lightly">Теги</h2>
                    </span>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4 p-2 w-full">
                         {TASK_CATEGORIES.map((category, index) => {
                              const isLeftColumn = index % 2 === 0;
                              const isSelected = data.categories.includes(category.name);

                              return (
                                   <button
                                        key={index}
                                        type="button"
                                        onClick={() => handleCategoryClick(category.name)}
                                        className={`
                                    flex flex-row items-center whitespace-nowrap 
                                    font-montserrat-medium text-lg 
                                    transition-all duration-200 active:scale-95 select-none
                                    ${isLeftColumn ? "justify-self-start" : "justify-self-end"}
                                    ${isSelected ? "text-succes_light font-montserrat-bold scale-105" : "text-main_lightly hover:text-main_lightly/80"}
                                `}
                                   >
                                        <span>{category.emoji}</span>
                                        <span>{category.name}</span>
                                   </button>
                              );
                         })}
                    </div>
               </div>
               <div className="flex flex-1 items-center justify-start gap-3 flex-col w-full mt-2">
                    {currentToggleOptions.map((option) => {
                         const IconComponent = option.Icon;
                         const isActive = data[option.id];

                         return (
                              <div key={option.id} className="flex items-center justify-between w-full gap-4 py-1 border-b-4 border-main_lightly/30">
                                   <div className="flex justify-center items-center gap-2 text-main_lightly">
                                        <IconComponent className="w-7 h-7 text-main_lightly" />
                                        <span className="font-montserrat-regular text-lg">{option.label}</span>
                                   </div>
                                   <div className="flex items-center gap-1 bg-main_green_dark/40 p-1 rounded-lg border border-main_lightly/10">
                                        <button
                                             type="button"
                                             onClick={() => setData(option.id, true)}
                                             className={`px-4 py-1 text-md font-montserrat-bold rounded-md transition-all border border-main_lightly ${
                                                  isActive ? "bg-main_green_dark text-main_lightly shadow-sm scale-95" : "bg-transparent text-main_lightly hover:text-main_lightly/70"
                                             }`}
                                        >
                                             Так
                                        </button>
                                        <button
                                             type="button"
                                             onClick={() => setData(option.id, false)}
                                             className={`px-3 py-1 text-md font-montserrat-bold rounded-md transition-all border border-main_lightly ${
                                                  !isActive ? "bg-danger_light text-main_lightly shadow-sm scale-95" : "bg-transparent text-main_lightly hover:text-main_lightly/70"
                                             }`}
                                        >
                                             Ні
                                        </button>
                                   </div>
                              </div>
                         );
                    })}
               </div>
          </section>
     );
}
