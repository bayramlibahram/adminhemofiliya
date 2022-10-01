import {toast} from "react-toastify";
import {useCallback} from "react";

const useMessage = () => {
    return useCallback((message) => {
        if (message) {
            toast(message);
        }
    },[]);
}

export default useMessage;