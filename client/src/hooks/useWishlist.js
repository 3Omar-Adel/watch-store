import { useSelector } from "react-redux";

export function useWishlist() {
    const wishlistItems = useSelector(
        (state) => state.wishlist.wishlistItems
    );

    const hasWishlistItems = wishlistItems.length > 0;

    return {
        wishlistItems,
        hasWishlistItems,
    };
}