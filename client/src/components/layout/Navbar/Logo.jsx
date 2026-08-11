import { memo } from "react";
import { Link } from "react-router-dom";
function Logo() {
    return (
            <Link to="/" className="navbarLogo">
                <h2>
                    <span>Thapt</span>Store
                </h2>
            </Link>
    );
}

export default memo(Logo);