import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { navLinks } from "./navData";
import { memo } from "react";

function NavLinks() {
    return (
        <div className="navbarLinks">
            {navLinks.map((link) =>
                link.path.includes(link.type === "hash") ? (
                    <HashLink
                        key={link.id}
                        smooth
                        to={link.path}
                        className="navLink"
                    >
                        {link.title}
                    </HashLink>
                ) : (
                    <NavLink
                        key={link.id}
                        to={link.path}
                        className={({ isActive }) =>
                            isActive ? "navLink active" : "navLink"
                        }
                    >
                        {link.title}
                    </NavLink>
                )
            )}
        </div>
    );
}

export default memo(NavLinks);