import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar"
import CustomSnackbar from "../common/CustomSnackbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist } from "../../features/wishlist/wishlistSlice";
import WishlistListener from "../common/WishlistListener";

function Layout() {
    const dispatch = useDispatch();

    const { user } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (user) {
            dispatch(fetchWishlist());
        }
    }, [user, dispatch]);
    return (
        <>
            <Navbar />
            <CustomSnackbar />
            <WishlistListener />
            <main className="layoutContent">
                <Outlet />
            </main>
        </>
    )
}
export default Layout;