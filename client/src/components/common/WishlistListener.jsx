import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { showSnackbar } from "../../features/snackbar/snackbarSlice";
import { reset } from "../../features/wishlist/wishlistSlice";

function WishlistListener() {

    const dispatch = useDispatch();

    const {
        isSuccess,
        isError,
        message,
    } = useSelector(
        (state) => state.wishlist
    );

    useEffect(() => {

        if (isSuccess && message) {

            dispatch(
                showSnackbar({
                    severity: "success",
                    message,
                })
            );

            dispatch(reset());
        }

        if (isError && message) {

            dispatch(
                showSnackbar({
                    severity: "error",
                    message,
                })
            );

            dispatch(reset());
        }

    }, [
        isSuccess,
        isError,
        message,
        dispatch,
    ]);

    return null;
}

export default WishlistListener;