import {Link, useNavigate} from "react-router-dom";
import AuthContext from "../../context/auth.context";
import {useContext} from "react";
import "./manage.css";

const ManageLayout = ({children}) => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const logoutHandler = async () => {
        auth.logout();
        navigate('/auth', {replace: true})
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg fixed-top shadow-sm bg-light" aria-label="Toggle navigation">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/dashboard">
                        <i className="fa-solid fa-solar-panel"></i>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            <li className="nav-item">
                                <Link className="nav-link" to="/posts">
                                    <i className="fas fa-newspaper me-2 text-dark"></i>
                                    Məqalələr
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/managements">
                                    <i className="fas fa-users me-2 text-dark"></i>
                                    Rəhəbərlik
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/sponsors">
                                    <i className="fas fa-layer-group me-2 text-dark"></i>
                                    Sponsorlar
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/navigations">
                                    <i className="fas fa-ellipsis-h me-2 text-dark"></i>
                                    Bölmələr
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link" onClick={logoutHandler}>
                                    <i className="fas fa-door-open me-2 text-dark"></i>
                                    Çıxış
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="manage-body">
                <div className="site-wrapper">
                    {children}
                </div>
            </div>
        </div>
    )
};

export default ManageLayout;