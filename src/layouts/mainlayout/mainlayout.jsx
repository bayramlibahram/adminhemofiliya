import {Link} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import logo from "../../content/images/logo.png";
import octaPharmaLogo from "../../content/images/octapharma-logo.png";

const MainLayout = ({children}) => {

    return (
        <section className="site-app">
            <header className="site-header">
                <div className="header-top">
                    <div className="site-wrapper">
                        <div className="header-top-container">
                            <div className="social-links">
                                <a className="social-link" href="https://www.facebook.com/www.hemofiliya.az/"
                                   target="_blank">
                                    <i className="fa-brands fa-facebook-f"></i>
                                </a>
                                <a className="social-link" href="https://youtube.com/channel/UCNjxQ1Bc8Xam0vNz1Cve1jA"
                                   target="_blank">
                                    <i className="fa-brands fa-youtube"></i>
                                </a>
                                <a className="social-link"
                                   href="https://twitter.com/ayazhuseynov88?t=JFdMDPFQFr0I4suhp9FKtg&s=09"
                                   target="_blank">
                                    <i className="fa-brands fa-twitter"></i>
                                </a>
                                <a className="social-link"
                                   href="https://instagram.com/hemophilia_azerbaijan_?igshid=YmMyMTA2M2Y="
                                   target="_blank">
                                    <i className="fa-brands fa-instagram"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header-middle">
                    <div className="site-wrapper">
                        <div className="header-middle-container">
                            <Link className="site-logo-container" to="/">
                                <img className="site-logo" src={logo} alt=""/>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
            <main className="site-main">
                <div className="site-wrapper">
                    {children}
                </div>
            </main>
            <footer className="site-footer">
                <div className="footer-bottom">
                    <div className="site-wrapper">
                        <div className="footer-bottom-container">
                            <div className="footer-bottom-item">
                                <p> &copy;  Bütün hüquqlar qorunur.</p>
                            </div>
                            <div className="footer-bottom-item">
                                <div className="social-links">
                                    <a className="social-link" href="https://www.facebook.com/www.hemofiliya.az/"
                                       target="_blank">
                                        <i className="fa-brands fa-facebook-f"></i>
                                    </a>
                                    <a className="social-link"
                                       href="https://youtube.com/channel/UCNjxQ1Bc8Xam0vNz1Cve1jA" target="_blank">
                                        <i className="fa-brands fa-youtube"></i>
                                    </a>
                                    <a className="social-link"
                                       href="https://twitter.com/ayazhuseynov88?t=JFdMDPFQFr0I4suhp9FKtg&s=09"
                                       target="_blank">
                                        <i className="fa-brands fa-twitter"></i>
                                    </a>
                                    <a className="social-link"
                                       href="https://instagram.com/hemophilia_azerbaijan_?igshid=YmMyMTA2M2Y="
                                       target="_blank">
                                        <i className="fa-brands fa-instagram"></i>
                                    </a>
                                </div>
                            </div>
                            <div className="footer-bottom-item">
                                <p>
                                    Designed by <a target="_blank" href="https://bahrambayramli.com">Bahram Bayramli</a>
                                </p>
                                <p>&</p>
                                <p>
                                    <a target="_blank" href="https://qht.az">QHT.AZ</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </section>
    );
};

export default MainLayout;