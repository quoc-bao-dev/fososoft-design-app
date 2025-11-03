// contexts/TranslateContext.tsx
import React, { createContext, useContext, ReactNode, useState } from 'react';

interface TranslateContextProps {
    loading: boolean;
    dataLang: any;
    language: string
}

interface ContextData {
    children: ReactNode,
    dataLang: any,
    language: string,
    loading: boolean,
}

const TranslateContext = createContext<TranslateContextProps | undefined>(undefined);

export const useTranslate = () => {
    const context = useContext(TranslateContext);
    if (context === undefined) {
        throw new Error("useTranslate must be used within a TranslateProvider");
    }
    return context;
};

export const TranslateProvider: React.FC<ContextData> = ({ children, dataLang, language, loading }) => {
    return (
        <TranslateContext.Provider value={{ dataLang: dataLang, loading: loading, language: language }}>
            {children}
        </TranslateContext.Provider>
    );
};

