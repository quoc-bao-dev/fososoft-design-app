import { ReactNode } from "react";

export interface ICardContactItem {
    icon: ReactNode;
    title: string;
    description?: string;
    content: string | { label: string; value: string }[];
    type: string
}