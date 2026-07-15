import { PiSmileySad } from "react-icons/pi";

export default function EmptyState({ title }) {
     return (
          <div className="flex flex-col items-center justify-center my-auto w-full">
               <PiSmileySad className="w-10 h-10 text-main_lightly" />
               <p className="text-lg font-montserrat-regular">{title}</p>
          </div>
     );
}
