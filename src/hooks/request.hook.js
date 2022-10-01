import {useCallback, useState} from "react";

const useRequest = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url = "", method = "GET", body = null, headers = {}) => {
        try {
            setLoading(true);

            if (body) {
                body = JSON.stringify(body);
                headers["Content-Type"] = "application/json";
                console.log('sss');
            }

            const response = await fetch(url, {
                method,
                body,
                headers
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong!!!');
            }
            setLoading(false);
            return data;
        } catch (err) {
            setError(err.message);
        }
    }, []);

    const clearError = useCallback(() => {
        setError(null)
    }, []);

    return {loading, error, request, clearError}
}

export default useRequest;