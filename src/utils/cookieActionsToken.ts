export const saveCookieToken = (token: string) => {
    document.cookie = `auth_token=${token}; path=/; max-age=86400; SameSite=Lax`; // 1 día
}

export const deleteCookieToken = () => {
    document.cookie = `auth_token=; path=/; max-age=0; SameSite=Lax`;
}

export const getCookieToken = () => {
    return document.cookie.split(';').find((cookie) => cookie.startsWith('auth_token='));
}