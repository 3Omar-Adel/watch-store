import "./Shop.css";

import ProductCard from "../../components/home/FeatuedProducts/ProductCard";
import SearchFilter from "../../components/home/SearchFilter/SearchFilter";
import { useSearchParams } from "react-router-dom";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/products/productSlice";
import ProductCardSkeleton from "../../components/Skeletons/ProductCardSkeleton";
import Pagination from "./Pagination";


function Shop() {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const {
        products,
        loading,
        error,
    } = useSelector((state) => state.products);



    const genderFromUrl = searchParams.get("gender");
    const categoryFromUrl = searchParams.get("category");
    const brandFromUrl = searchParams.get("brand");

    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({
        category: categoryFromUrl || "",
        brand: brandFromUrl || "",
        gender: genderFromUrl || "",
        price: null,
    });
    const PRODUCTS_PER_PAGE = 18;

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);


    useEffect(() => {

        setFilters((prev) => ({
            ...prev,

            category: categoryFromUrl || "",
            brand: brandFromUrl || "",
            gender: genderFromUrl || "",
        }));

    }, [
        categoryFromUrl,
        brandFromUrl,
        genderFromUrl,
    ]);


    const filteredProducts = useMemo(() => {

        const searchTerm = search
            .trim()
            .toLowerCase();

        return products.filter((product) => {
            if (searchTerm) {

                const searchableText = [
                    product.name,
                    product.brand,
                    product.category,
                    product.gender,
                    product.description,
                ]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();


                if (!searchableText.includes(searchTerm)) {
                    return false;
                }
            }

            if (
                filters.category &&
                product.category !== filters.category
            ) {
                return false;
            }

            if (
                filters.brand &&
                product.brand !== filters.brand
            ) {
                return false;
            }

            if (
                filters.gender &&
                product.gender !== filters.gender
            ) {
                return false;
            }

            if (filters.price) {

                const productPrice = Number(product.price);

                if (
                    productPrice < filters.price[0] ||
                    productPrice > filters.price[1]
                ) {
                    return false;
                }
            }


            return true;
        });

    }, [
        products,
        filters,
        search,
    ]);
    const totalPages = Math.ceil(
        filteredProducts.length / PRODUCTS_PER_PAGE
    );

    const startIndex =
        (currentPage - 1) * PRODUCTS_PER_PAGE;

    const currentProducts = filteredProducts.slice(
        startIndex,
        startIndex + PRODUCTS_PER_PAGE
    );
    useEffect(() => {
        setCurrentPage(1);
    }, [search, filters]);

    if (error) {
        return (
            <h2>
                {error}
            </h2>
        );
    }
    return (
        <div className="shop">

            {/* Search + Filter */}

            <SearchFilter
                products={products}
                search={search}
                onSearchChange={setSearch}
                onApplyFilters={(newFilters) => {
                    setFilters(newFilters);
                }}
            />
            {/* Products */}
            <div className="products">
                {loading ? (

                    [...Array(18)].map((_, index) => (
                        <ProductCardSkeleton
                            key={index}
                        />
                    ))

                ) : currentProducts.length > 0 ? (

                    currentProducts.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                        />
                    ))
                ) : (
                    <h2
                        style={{
                            textAlign: "center",
                            width: "100%",
                            marginTop: "50px",
                        }}
                    >
                        No Products Found
                    </h2>

                )}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}


export default Shop;