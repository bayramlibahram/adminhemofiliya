import {BrowserRouter as Router} from "react-router-dom";
import AuthContext from "../../context/auth.context";
import LayoutManager from "../../layouts/layoutmanager";
import useAuth from "../../hooks/auth.hook";
const App = () => {
    const {userId, token, login, logout, ready} = useAuth();
    const isAuthenticated = !!token;
    return (
        <Router>
            <AuthContext.Provider value={{userId, token, login, logout}}>
                <LayoutManager isAuthenticated={isAuthenticated}/>
            </AuthContext.Provider>
        </Router>
    );
};

export default App;