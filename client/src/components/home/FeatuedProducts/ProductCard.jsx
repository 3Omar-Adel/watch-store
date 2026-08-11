import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showSnackbar } from "../../../features/snackbar/snackbarSlice";
import { toggleWishlist } from "../../../features/wishlist/wishlistSlice";


function ProductCard({ product }) {

    const dispatch = useDispatch();

    const { wishlistItems } = useSelector(
        (state) => state.wishlist
    );

    const { user } = useSelector(
        (state) => state.auth
    );

    const isFavorite = wishlistItems.some(
        (item) => item._id === product._id
    );


    return (
        <Link
            to={`/product/${product._id}`}
            className="productCard"
        >
            <div className="productImage">

                <button
                    className="wishlistBtn"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        if (!user) {
                            dispatch(
                                showSnackbar({
                                    severity: "warning",
                                    message: "Please login first",
                                })
                            );
                            return;
                        }
                        dispatch(toggleWishlist(product._id));
                    }}
                >
                    {isFavorite ? (
                        <IoHeart color="#C6A769" />
                    ) : (
                        <IoHeartOutline />
                    )}
                </button>
                <img
                    src={product.images?.[0]?.url}
                    alt={product.name}
                />
            </div>
            <div className="productInfo">
                <span className="brand">
                    {product.brand}
                </span>
                <h3>
                    {product.name}
                </h3>
                <h2> 
                    {product.price}
                    <span>EGP </span>
                </h2>
            </div>
        </Link>
    );
}

export default ProductCard;