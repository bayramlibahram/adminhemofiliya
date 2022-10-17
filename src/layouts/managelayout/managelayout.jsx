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
            <nav className="navbar navbar-expand-lg fixed-top navbar-expand-lg bg-light shadow-sm" aria-label="Main navigation">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/dashboard">
                        <i className="fa-solid fa-solar-panel"></i>
                    </Link>
                    <button className="navbar-toggler p-0 border-0" type="button" id="navbarSideCollapse"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/dashboard">
                                    İnzibatçı panel
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/posts">
                                    Məqalələr
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/managements">
                                    Rəhəbərlik
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/sponsors">
                                    Sponsorlar
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/navigations">
                                    Bölmələr
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link" onClick={logoutHandler}>
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