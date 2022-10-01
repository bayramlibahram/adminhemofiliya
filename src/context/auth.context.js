import {createContext} from "react";

function empty() {
}

const AuthContext = createContext({
    userId: null,
    token: null,
    login: empty,
    logout: empty,
    isAuthenticated: false
});

export default AuthContext;