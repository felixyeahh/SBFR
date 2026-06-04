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

    useEffect(() => {
        const cookie = document.cookie
            .split("; ")
            .find((row) => row.startsWith(`${key}=`));
        if (cookie) {
            setCookieValue(cookie.split("=")[1]);
        }
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
    };

    return [cookieValue, setCookie] as const;
};
