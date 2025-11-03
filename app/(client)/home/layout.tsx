import { getMetadata } from "@/components/seo/DefaultMetadata";

export const metadata = getMetadata({
    title: "FOSO - Dịch Vụ Thiết Kế App Mobile Tận Tâm - Viết  App Theo Nhu Cầu",
    description: "Thiết kế app mobile tại FOSO mang đến giải pháp app mobile hiệu quả, phù hợp với từng nhu cầu doanh nghiệp với giao diện thân thiện, đẹp mắt.",
    ogImage: "/design-app/meta.png",
    url: `${process.env.NEXT_PUBLIC_URL_WEBSITE}/thiet-ke-app-mobile`,
});

export default function AppMobileLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return children
}
