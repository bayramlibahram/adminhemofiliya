import {useCallback, useEffect, useState} from 'react';

const storageName = "userData";

const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [ready, setReady] = useState(false);
    const login = useCallback((usrId, usrToken) => {
        setUserId(usrId);
        setToken(usrToken);
        localStorage.setItem(storageName, JSON.stringify({
            userId: usrId,
            token: usrToken
        }));
    }, []);
    const logout = useCallback(() => {
        setUserId(null);
        setToken(null);
        localStorage.removeItem(storageName);
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));

        if (data && data.token) {
            login(data.userId, data.token);
        }
        setReady(true);
    }, [login, ready]);

    return {userId, token, login, logout, ready}
}

export default useAuth;