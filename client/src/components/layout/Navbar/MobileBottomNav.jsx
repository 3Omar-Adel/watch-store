import { NavLink } from "react-router-dom"; import { useSelector } from "react-redux";

import { FaHome } from "react-icons/fa";
import { IoBagHandle, IoHeart, IoHeartOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { useMemo } from "react";
import { useCartCount } from "../../../hooks/useCartCount";
import { useWishlist } from "../../../hooks/useWishlist";

function MobileBottomNav() {
    const { user } = useSelector((state) => state.auth);

    const cartCount = useCartCount()
    const { wishlistItems, hasWishlistItems } = useWishlist();

    const navClass = ({ isActive }) =>
        isActive
            ? "mobileNavItem active"
            : "mobileNavItem";

    return (
        <div className="mobileNavbar">

            <NavLink to="/" className={navClass}>
                <FaHome />
                <span>Home</span>
            </NavLink>
            <NavLink to="/shop" className={navClass}>
                <IoBagHandle />
                <span>Shop</span>
            </NavLink>
            <NavLink to="/wishlist" className={navClass}>
                {
                    hasWishlistItems
                        ? <IoHeart color="#C6A769" />
                        : <IoHeartOutline />
                }
                <span>Wishlist</span>
            </NavLink>
            <NavLink to={user ? "/profile" : "/login"} className={navClass}>
                {
                    user
                        ? <FaUserCircle />
                        : <FaRegUser />
                }
                <span>
                    {user ? "Profile" : "Account"}
                </span>
            </NavLink>
            <NavLink
                to="/cart"
                className={navClass}
            >
                <div className="mobileIconWrapper">
                    <FaShoppingCart />
                    {
                        cartCount > 0 &&
                        <span className="mobileBadge">
                            {cartCount > 99 ? "99+" : cartCount}
                        </span>
                    }
                </div>
                <span>Cart</span>
            </NavLink>
        </div>
    );
}

export default MobileBottomNav;