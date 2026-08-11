import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import GuestMenu from "./GuestMenu";
import UserMenu from "./UserMenu";

function NavActions() {
    const { user } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.cart);
    const { wishlistItems } = useSelector((state) => state.wishlist);

    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const hasWishlistItems = wishlistItems.length > 0;

    return (
        <div className="navbarActions">
            <Link className="iconBtn" to="/wishlist">
                {hasWishlistItems ? (
                    <IoHeart color="#eca690" />
                ) : (
                    <IoHeartOutline />
                )}
            </Link>

            <Link
                className="iconBtn cartIcon"
                to="/cart"
            >
                <FaShoppingCart />

                {cartCount > 0 && (
                    <span className="badge">
                        {cartCount > 99 ? "99+" : cartCount}
                    </span>
                )}
            </Link>

            {user ? <UserMenu /> : <GuestMenu />}
        </div>
    );
}

export default NavActions;