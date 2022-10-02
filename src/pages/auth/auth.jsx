import useRequest from "../../hooks/request.hook";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import AuthContext from "../../context/auth.context";
import {BACK_END} from "../../config/keys";
import useMessage from "../../hooks/message.hook";
import AuthLogo from "../../content/images/auth.png";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import  "./auth.css";
const AuthPage = () => {

    const auth = useContext(AuthContext);
    const {request, loading, error, clearError} = useRequest();
    const navigate = useNavigate();
    const message = useMessage();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const inputHandler = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    }

    const onLogin = async () => {
        const data = await request(`${BACK_END.HOST}/api/auth/login`, 'POST', form);
        auth.login(data.token, data.userId);
        navigate('/dashboard', {replace: true});
    }

    useEffect(() => {
        message(error);
        clearError()
    }, [error, clearError, message])
    return (
        <>
            <div className="container">
                <div className="auth-container">
                    <div className="auth-item auth-logo">
                        <img src={AuthLogo} alt="logo"/>
                    </div>
                    <div className="auth-item auth-wrapper">
                        <div className="auth-card">
                            <div className="auth-header">
                                Daxil ol
                            </div>
                            <div className="auth-bottom">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control auth-input"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        value={form.email}
                                        onChange={inputHandler}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className="form-control auth-input"
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        value={form.password}
                                        onChange={inputHandler}
                                    />
                                </div>
                                <button
                                    className="auth-button"
                                    onClick={onLogin}
                                    disabled={loading}
                                >Daxil ol
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </>
    );
};

export default AuthPage;