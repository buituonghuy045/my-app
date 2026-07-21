"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import vi from "./locales/vi/common.json";
import en from "./locales/en/common.json";

const resources = {
    vi: {
        translation: vi,
    },
    en: {
        translation: en,
    },
};

if (!i18n.isInitialized) {
    i18n
        .use(initReactI18next)
        .init({
            resources,
            lng: "vi",
            fallbackLng: "vi",
            interpolation: {
                escapeValue: false,
            },
        });
}
else {
    i18n.addResourceBundle("vi", "translation", vi, true, true);
    i18n.addResourceBundle("en", "translation", en, true, true);
}

export default i18n;