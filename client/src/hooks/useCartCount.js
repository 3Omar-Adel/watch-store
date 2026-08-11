import { useMemo } from "react";
import { useSelector } from "react-redux";

export function useCartCount() {
    const cartItems = useSelector(
        (state) => state.cart.cartItems
    );

    const cartCount = useMemo(() => {
        return cartItems.reduce(
            (acc, item) => acc + item.quantity,
            0
        );
    }, [cartItems]);

    return cartCount;
}