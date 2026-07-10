"use client";

import { useEffect, useState } from "react";

export default function ToggleTheme() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        const theme = localStorage.getItem("theme") || "light";

        document.documentElement.setAttribute("data-theme", theme);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setDark(theme === "dark");
    }, []);

    const handleToggle = () => {
        const theme = dark ? "light" : "dark";

        document.documentElement.setAttribute("data-theme", theme);

        localStorage.setItem("theme", theme);

        setDark(!dark);
    };

    return (
        <input
            type="checkbox"
            checked={dark}
            onChange={handleToggle}
            className="toggle"
        />
    );
}