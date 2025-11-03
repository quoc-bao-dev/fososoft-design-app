// app/layout.tsx
import RootLayout from "@/components/layouts/root/RootLayout";
import GoogleAnalytics from "@/components/script/GoogleAnalytics";
import { getMetadata } from "@/components/seo/DefaultMetadata";
import { KEY_COOKIES } from "@/constants/Cookie";
import { raleway_sans } from "@/utils/fonts/fontUtils";
import Script from "next/script";
import { Suspense } from "react";

import "@babylonjs/loaders";
import '@smastrom/react-rating/style.css';

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/thumbs";
import "swiper/swiper-bundle.css";

import "@/styles/globals.scss";

export const metadata = getMetadata({
    title: "FOSO - Đội ngũ và sứ mệnh",
    description: "Tìm hiểu về đội ngũ phát triển và tầm nhìn của FOSO.",
    ogImage: "/opengraph-image.png",
    url: "https://fososoft.com/about",
});

export default async function RootLayoutApp({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // const { language, lang } = await getLanguage(); // chạy api dưới sv

    return (
        <html suppressHydrationWarning lang={KEY_COOKIES.DEFAULT_LANGUAGE}>
            <head>
                {/* Google Tag Manager */}
                <Script id="gtm-head" strategy="afterInteractive">
                    {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-M7HZ95L2');`}
                </Script>
            </head>

            <body className={`${raleway_sans.className} antialiased relative`} >
                {/* GTM noscript fallback */}
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-M7HZ95L2"
                        height="0"
                        width="0"
                        style={{ display: 'none', visibility: 'hidden' }}
                    ></iframe>
                </noscript>

                {/* ✅ App Wrapper */}
                <Suspense>
                    <RootLayout data={{ dataLang: "lang", language: "" }}>
                        {children}
                    </RootLayout>
                </Suspense>

                {/* ✅ Analytics Script */}
                <GoogleAnalytics gtag='AW-11487033920' />
            </body>
        </html>
    );
}
