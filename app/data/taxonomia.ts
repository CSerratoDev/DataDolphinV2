import { ReactNode, createElement } from "react";
import { FaBalanceScale, FaIndustry, FaGraduationCap, FaShippingFast } from "react-icons/fa";
import { HiBuildingLibrary } from "react-icons/hi2";

export interface Taxonomia {
    id: number;
    nombre: string;
    descripcion: string;
    img_icon: ReactNode;
}

export const taxonomias : Taxonomia[] = [
    {
        id: 1,
        nombre: "Fiscal y Financiero",
        descripcion: "Documentos relacionados con impuestos, contabilidad, finanzas personales y corporativas.",
        img_icon: createElement(HiBuildingLibrary)
    },
    {
        id: 2,
        nombre: "Gubernamental y Legal",
        descripcion: "Documentos oficiales, leyes, regulaciones, contratos y otros documentos legales.",
        img_icon: createElement(FaBalanceScale)
    },
    {
        id: 3,
        nombre: "Empresarial y Laboral",
        descripcion: "Documentos relacionados con recursos humanos, nóminas, contratos laborales y gestión empresarial.",
        img_icon: createElement(FaIndustry)
    },
    {
        id: 4,
        nombre: "Universitario y Académico",
        descripcion: "Documentos académicos, investigaciones, tesis, artículos científicos y materiales educativos.",
        img_icon: createElement(FaGraduationCap)
    },
    {
        id: 5,
        nombre: "Internacional y Logística",
        descripcion: "Documentos relacionados con comercio internacional, logística, aduanas y transporte.",
        img_icon: createElement(FaShippingFast)
    }
];