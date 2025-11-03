'use client'

import { KEY_COOKIES } from '@/constants/Cookie'
import { ScrollProvider } from '@/contexts/ScrollContext'
import { TranslateProvider } from '@/contexts/TranslateContext'
import { useStateClientLayout } from '@/managers/state/client/useStateClientLayout'
import { useAuthStore } from '@/stores/useAuthStores'
import useCookieStore from '@/stores/useCookieStore'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import React, { useEffect } from 'react'
import { dataLanguageOptions } from '../../../data/DataTranslate'
import ClientLayout from '../client/ClientLayout'

type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

interface ProviderLayoutProps extends ThemeProviderProps {
    children: React.ReactNode, data: any
}

const ProviderLayout = ({ children, data, ...props }: ProviderLayoutProps) => {
    const { setCookie, getCookie } = useCookieStore()

    const language = getCookie(KEY_COOKIES.WEBSITE_LANG)

    const { informationUser } = useAuthStore()

    const { isStateClientLayout, queryKeyIsStateClientLayout } = useStateClientLayout()

    // const { isLoading } = useGetInfoByToken() // auto call

    useEffect(() => {
        const setLange = () => {
            const oj = dataLanguageOptions.find((item) => item.code === (data?.language || language || KEY_COOKIES.DEFAULT_LANGUAGE))

            queryKeyIsStateClientLayout({
                language: {
                    ...isStateClientLayout?.language,
                    selectedLanguage: oj ?? dataLanguageOptions[0]
                }
            });
        }

        setLange()
        if (data?.language || informationUser?.default_language) {
            setCookie(KEY_COOKIES.WEBSITE_LANG, (data?.language || informationUser?.default_language))
            setLange()
            return
        }

        if (!language) {
            setCookie(KEY_COOKIES.WEBSITE_LANG, KEY_COOKIES.DEFAULT_LANGUAGE)
            setLange()
            return
        }
    }, [informationUser, data])


    return (
        <NextThemesProvider {...props}>
            <TranslateProvider dataLang={data?.dataLang} language={data?.language} loading={false}>
                <ScrollProvider>
                    {/* <ThemeSwitcher /> */}
                    <ClientLayout data={data}>
                        {children}
                    </ClientLayout>
                </ScrollProvider>
            </TranslateProvider>
        </NextThemesProvider>
    )
}

export default ProviderLayout