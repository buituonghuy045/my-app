"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {

    const { i18n } = useTranslation();

    const [language, setLanguage] = useState("vi");

    useEffect(() => {

        const lang = localStorage.getItem("language") || "vi";

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLanguage(lang);

        i18n.changeLanguage(lang);

    }, [i18n]);

    function handleChange(lang: string) {

        setLanguage(lang);

        i18n.changeLanguage(lang);

        localStorage.setItem("language", lang);
    }

    return (
        <select
            className="select select-sm w-18 text-lg"
            value={language}
            onChange={(e) => handleChange(e.target.value)}
        >
            <option value="vi">VN</option>
            <option value="en">EN</option>
        </select>
    );
}