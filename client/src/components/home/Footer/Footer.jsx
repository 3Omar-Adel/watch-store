import "./Footer.css";

import { Link } from "react-router-dom";

import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedinIn,
} from "react-icons/fa";

function Footer() {
    return (
        <footer className="footer">
            <div className="footerContainer">

                {/* Brand */}
                <div className="footerBrand">
                    <Link to="/" className="footerLogo">
                        WATCH STORE
                    </Link>

                    <p className="footerDescription">
                        Luxury watches crafted for every moment.
                        Discover premium collections with timeless elegance.
                    </p>

                    <div className="footerSocial">
                        <a href="#" aria-label="Facebook">
                            <FaFacebookF />
                        </a>

                        <a href="#" aria-label="Instagram">
                            <FaInstagram />
                        </a>

                        <a href="#" aria-label="Twitter">
                            <FaTwitter />
                        </a>

                        <a href="#" aria-label="LinkedIn">
                            <FaLinkedinIn />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="footerColumn quickLinks">
                    <h3>Quick Links</h3>

                    <Link to="/">Home</Link>
                    <Link to="/shop">Shop</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                </div>

                {/* Customer */}
                <div className="footerColumn customerLinks">
                    <h3>Customer</h3>

                    <Link to="/orders">My Orders</Link>
                    <Link to="/wishlist">Wishlist</Link>
                    <Link to="/cart">Cart</Link>
                    <Link to="/profile">Profile</Link>
                </div>

                {/* Contact */}
                <div className="footerColumn contactColumn">
                    <h3>Contact</h3>

                    <p>Cairo, Egypt</p>
                    <p>+20 100 000 0000</p>
                    <p>watchstore@gmail.com</p>
                </div>

            </div>

            <div className="footerBottom">
                © 2026 Watch Store · Designed & Developed by Omar Adel
            </div>
        </footer>
    );
}

export default Footer;