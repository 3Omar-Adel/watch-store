import "./Products.css";
import ProductCard from "./ProductCard";
import { Link, useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchFeaturedProducts } from "../../../features/products/productSlice";
import ProductCardSkeleton from "../../Skeletons/ProductCardSkeleton";
function FeaturedProducts() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { featuredProducts, loading } = useSelector(
        (state) => state.products
    );

    useEffect(() => {
        dispatch(fetchFeaturedProducts());
    }, [dispatch]);

    return (
        <div>
            <div className="headerInfo">
                <h2 className="headerName">Featured Products </h2>
                <div>
                    <Link className="showAllBtn" to="/shop">
                        Show All
                    </Link>
                </div>
            </div>
            <div className="products">
                {loading
                    ? [...Array(6)].map((_, index) => (
                        <ProductCardSkeleton key={index} />
                    ))
                    : featuredProducts.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                        />
                    ))}
            </div>
        </div>
    );
}

export default FeaturedProducts;