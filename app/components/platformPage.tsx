import Image from "next/image";
import Link from "next/link";
import { RiGeminiFill } from "react-icons/ri";

export default function PlatformPage() {
    return (
        <div id="platform" className="w-full h-[700] bg-[#f8fafc] ">
            <section className="hero">
                <div className="badge">
                    <span className="icon-shield"></span> Automatización de trámites hasta nivel gubernamental
                </div>
                <h1>El flujo de datos <br /> <span className="blue-text">sin fricción.</span></h1>

                <p className="hero-description">
                    Automatiza trámites complejos, tanto gubernamentales como privados, con Inteligencia Artificial de alta velocidad.
                    Seguro, preciso y profundamente eficaz.
                </p>

                <div className="flex justify-center items-center pb-6 gap-2">
                    <Image src="/logo/gemini.png" width={50} height={50} alt="gemini"/>
                    <p className="text-2xl font-semibold">Gemini</p>
                </div>
                <div className="hero-buttons">
                    <Link href="/signup" className="btn-dark">Iniciar automatización &rarr;</Link>
                    <a rel="noopener" target="_blank" href="https://www.youtube.com/@cserratodev" className="btn-outline">
                        <span className="play-icon">▶</span> Ver video
                    </a>
                </div>
            </section>

        </div>
    )
}