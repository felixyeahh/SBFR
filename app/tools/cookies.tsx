"use client";
import { useState, useEffect } from "react";

export type Options = {
    expires?: Date;
    path?: string;
    domain?: string;
    secure?: boolean;
};

export const useCookies = (key: string): [string | undefined, (value: string, options?: Options) => void] => {
    const [cookieValue, setCookieValue] = useState<string | undefined>(undefined);

    const readCookie = () => {
        const cookie = document.cookie
            .split("; ")
            .find((row) => row.startsWith(`${key}=`));
        setCookieValue(cookie?.split("=")[1]);
    };

    useEffect(() => {
        readCookie();
        const handler = (e: Event) => {
            if ((e as CustomEvent).detail?.key === key) readCookie();
        };
        window.addEventListener("cookie-change", handler);
        return () => window.removeEventListener("cookie-change", handler);
    }, [key]);

    const setCookie = (value: string, options?: Options) => {
        let cookie = `${key}=${value}`;

        if (options) {
            if (options.expires) {
                cookie += `; expires=${options.expires.toUTCString()}`;
            }
            if (options.path) {
                cookie += `; path=${options.path}`;
            }
            if (options.domain) {
                cookie += `; domain=${options.domain}`;
            }
            if (options.secure) {
                cookie += `; secure`;
            }
        }

        document.cookie = cookie;
        setCookieValue(value);
        window.dispatchEvent(new CustomEvent("cookie-change", { detail: { key } }));
    };

    return [cookieValue, setCookie] as const;
};
