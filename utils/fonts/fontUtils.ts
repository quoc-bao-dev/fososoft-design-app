import { Playwrite_IS, Raleway } from "next/font/google";

const raleway_init = Raleway({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-raleway",
    display: "swap",
});

const playwrite_is_init = Playwrite_IS({
    weight: ["100", "200", "300", "400"],
    variable: "--font-playwrite-is",
    display: "swap",
});

export const raleway_sans = raleway_init;
export const playwrite_is_sans = playwrite_is_init;
