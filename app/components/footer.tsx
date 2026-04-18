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
        <footer className="bg-[#0f2d5e] static bottom-0 left-0 grid grid-cols-1 md:grid-cols-3 justify-items-center items-center text-center md:text-start text-white h-auto md:h-100 w-full py-10">
            <div className="pb-6">
                <Image src="/logo/data-dolphin.png" alt="logo" width={200} height={200} className="invert brightness-0"/>
            </div>
            <div className="flex flex-col space-y-2 pb-6">
                <h1 className="text-2xl font-bold mb-4" >Desarrolladores</h1>
                <a href="/https://github.com/CSerratoDev" target="_blank" rel="noopener noreferrer">Alexis Serrato</a>
                <a href="#" target="_blank" rel="noopener noreferrer">Juan Pablo</a>
                <a href="https://github.com/Osva0421" target="_blank" rel="noopener noreferrer">Osvaldo Partida</a>
                <a href="#" target="_blank" rel="noopener noreferrer">Diego Hernandez</a>
                <a href="/https://github.com/marizpebeltran" target="_blank" rel="noopener noreferrer">Mario Arizpe</a>
            </div>
            <div className="pt-2 justify-items-center">
                <h1 className="text-2xl font-bold mb-4">Redes Sociales</h1>
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