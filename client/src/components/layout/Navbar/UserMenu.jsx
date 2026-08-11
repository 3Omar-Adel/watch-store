import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";

function UserMenu() {
    return (
        <Link
            to="/profile"
            className="iconBtn"
        >
            <FaRegUser />
        </Link>
    );
}

export default UserMenu;