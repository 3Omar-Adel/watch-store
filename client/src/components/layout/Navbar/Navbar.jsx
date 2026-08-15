import "./Navbar.css";

import Logo from "./Logo";
import NavLinks from "./NavLinks";
import NavActions from "./NavActions";
import SearchDrawer from "./SearchDrawer";
import MobileBottomNav from "./MobileBottomNav";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

function Navbar() {

    const [searchOpen, setSearchOpen] = useState(false);
    return (
        <>

            <nav className="navbar">
                <Logo />
                <NavLinks />
                <NavActions />
                <button
                    className="mobileSearchBtn"
                    onClick={() => setSearchOpen(true)}
                    aria-label="Open search"
                >
                    <SearchIcon />
                </button>
            </nav>
            <MobileBottomNav />
            <SearchDrawer
                open={searchOpen}
                onClose={() => setSearchOpen(false)}
            />
        </>
    );
}

export default Navbar;