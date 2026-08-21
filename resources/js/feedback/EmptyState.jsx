import { PiSmileySad } from "react-icons/pi";

export default function EmptyState({ title, titleFont = "text-lg", iconSize = "w-10 h-10" }) {
     return (
          <div className="flex flex-col items-center justify-center my-auto w-full">
               <PiSmileySad className={`${iconSize} text-main_lightly`} />
               <p className={`${titleFont} text-main_lightly font-montserrat-regular`}>{title}</p>
          </div>
     );
}
