import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";

export default function Footer() {
    const footerSocial = [
        { title: 'GitHub', Icon: FaGithub, href: 'https://github.com' },
        { title: 'LinkedIn', Icon: FaLinkedin , href: 'https://linkedin.com' },
        { title: 'Telegram', Icon: FaTelegram, href: 'https://t.me' }
    ];

    return (
        <>
            <footer className="w-full flex-shrink-0 overflow-hidden flex justify-center h-[80px] shadow-xl bg-main_green_dark/10 backdrop-blur-xl rounded-md px-5 mt-4">
                <div className="flex flex-1 justify-between items-center relative">
                    <div className="flex flex-col items-start gap-1">
                        {footerSocial.map(({ title, Icon, href }) => (
                            <a
                                key={title}
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                                className="flex flex-row cursor-pointer h-4 items-center justify-center gap-1 transition-all duration-200 ease-in-out scale-100 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.7)] hover:translate-x-2 text-main_lightly hover:text-white"
                            >
                                <Icon className="text-main_lightly" />
                                <p className="text-sm font-medium font-montserrat-regular">{title}</p>
                            </a>
                        ))}
                    </div>
                        <p className="text-main_lightly absolute h-full font-montserrat-medium flex items-end font-medium top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">© 2026 Tasker Inc</p>
                    <ul className="flex flex-col items-end justify-center text-main_lightly text-sm font-montserrat-medium">
                        <li className="cursor-pointer transition-all duration-100 ease-in-out hover:text-main_green_light hover:scale-105">
                            Політика конфіденційності.
                        </li>
                        <li className="cursor-pointer transition-colors duration-100 ease-in-out hover:text-main_green_light hover:scale-105">
                            Умови використання.
                        </li>
                        <li className="cursor-pointer transition-colors duration-100 ease-in-out hover:text-main_green_light hover:scale-105">
                            Cookies.
                        </li>
                    </ul>
                </div>
            </footer>
        </>
    );
}