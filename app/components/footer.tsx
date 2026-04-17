import Image from "next/image";
import { ReactNode } from "react";
import { FaGithub, FaLinkedin, FaDev } from "react-icons/fa";

type Links = {
    name: string;
    href: string;
    img_icon: ReactNode;
}

const links: Links[] = [
    {name: 'GitHub', href: 'https://github.com/CSerratoDev/DataDolphinV2', img_icon: <FaGithub /> },
    {name: 'DevPost', href: 'https://devpost.com', img_icon: <FaDev /> },
    {name: 'LinkedIn', href: '#', img_icon: <FaLinkedin /> }
]

export default function Footer() {
    return (
        <footer className="bg-[#0f2d5e] grid grid-cols-3 items-center text-white h-100 w-full p-4">
            <div>
                <Image src="/logo/datadolphin.png" alt="logo" width={100} height={100} className=""/>
            </div>
            <div>

            </div>
            <div>
                <h1 className="text-2xl font-bold">Redes Sociales</h1>
                <ul className="flex flex-col space-y-2">
                    {links.map((l) => (
                        <li key={l.name}>
                            <a
                                className="hover:underline flex items-center space-x-2"
                                href={l.href}
                                target={l.href.startsWith('http') ? '_blank' : undefined}
                                rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                aria-label={l.name}
                            >
                                <span className="text-xl">{l.img_icon}</span>
                                <span>{l.name}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    )
}