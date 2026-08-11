import "./NewArrivals.css";
import { useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../../features/products/productSlice";
import NewArrivalCard from "./NewArrivalCard";
import ProductCardSkeleton from "../../Skeletons/ProductCardSkeleton";

function NewArrivals() {

    const dispatch = useDispatch();

    const { products, loading } = useSelector(
        (state) => state.products
    );

    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProducts());
        }
    }, [dispatch, products.length]);


    const latestProducts = useMemo(() => {
        return [...products]
            .sort(
                (a, b) =>
                    new Date(b.createdAt) -
                    new Date(a.createdAt)
            )
            .slice(0, 4);

    }, [products]);


    return (
        <section className="newArrivals">
            <div className="sectionHeading">
                <h2>
                    Explore New Arrivals
                </h2>

                <p>
                    Discover our latest watch collections,
                    carefully selected with premium materials,
                    elegant designs, and timeless details
                    made to elevate your everyday style.
                </p>
            </div>


            <div className="arrivalGrid">
                {loading
                    ? [...Array(4)].map((_, index) => (
                        <ProductCardSkeleton key={index} />
                    ))
                    : latestProducts.map((product) => (
                        <NewArrivalCard
                            key={product._id}
                            product={product}
                        />
                    ))}
            </div>

        </section>
    );
}

export default NewArrivals;