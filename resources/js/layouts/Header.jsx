import { Link, usePage } from "@inertiajs/react";
import { BsHouse } from "react-icons/bs";
import { BsArchive } from "react-icons/bs";
import { PiCheckSquareOffset } from "react-icons/pi";
import { IoPersonOutline } from "react-icons/io5";
import { PiClockCountdownBold } from "react-icons/pi";
import Tooltip from "../ui/Tooltip";

export default function Header() {
     const { url } = usePage();

     const navItems = [
          { id: "home", Icon: BsHouse, href: "/home", text: "Головна" },
          { id: "archive", Icon: BsArchive, href: "/archive", text: "Архів" },
          { id: "cabinet", Icon: PiCheckSquareOffset, href: "/tasks", text: "Мій кабінет" },
          {
               id: "deferred",
               Icon: PiClockCountdownBold,
               href: "/deferred",
               text: "Відкладені завдання",
          },
          { id: "user", Icon: IoPersonOutline, href: "#", text: "Увійти" },
     ];

     return (
          <header className="w-full flex-shrink-0 flex justify-center h-[100px] shadow-xl border-b-4 border-main_lightly/50 bg-main_green_dark/40 backdrop-blur-md mb-4">
               <nav className="group relative flex flex-1 justify-between items-center">
                    <Link href="/home">
                         <img
                              src="images/tasker-2.png"
                              alt="Tasker"
                              className="w-52 absolute top-5 left-0 cursor-pointer"
                         />
                    </Link>

                    <section className="w-auto h-full gap-6 pr-10 flex items-center justify-around">
                         {navItems.map(({ id, Icon, href, text }) => {
                              const isActive = url === href;

                              return (
                                   <Link
                                        key={id}
                                        href={href}
                                        className={`transition-all pb-2 relative duration-300 flex items-center ease-in-out hover:scale-110
                                    ${isActive ? "drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]" : "shadow-none"}`}
                                   >
                                        <Tooltip text={text}>
                                             <Icon
                                                  className={`w-8 h-8 cursor-pointer transition-colors duration-300 
                                        ${isActive ? "text-white" : "text-main_lightly"}`}
                                             />
                                        </Tooltip>
                                   </Link>
                              );
                         })}
                    </section>
               </nav>
          </header>
     );
}
