import "./Navbar.css";

import Logo from "./Logo";
import NavLinks from "./NavLinks";
import NavActions from "./NavActions";
import MobileBottomNav from "./MobileBottomNav";

function Navbar() {

    return (
        <>

            <nav className="navbar">
                <Logo />
                <NavLinks />
                <NavActions />
            </nav>
            <MobileBottomNav />

        </>
    );
}

export default Navbar;