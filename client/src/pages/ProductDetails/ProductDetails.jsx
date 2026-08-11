import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchProducts } from "../../features/products/productSlice";

import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";

function ProductDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { products = [], loading } = useSelector(
        (state) => state.products
    );

    useEffect(() => {
        if (!products.length) {
            dispatch(fetchProducts());
        }
    }, [dispatch, products.length]);

    const product = products.find(
        (item) => item._id === id
    );

    if (loading) {
        return (
            <Typography
                sx={{
                    mt: 15,
                    textAlign: "center",
                }}
            >
                Loading...
            </Typography>
        );
    }

    if (!product) {
        return (
            <Typography
                sx={{
                    mt: 15,
                    textAlign: "center",
                }}
            >
                Product Not Found
            </Typography>
        );
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: "#F8F8F8",
                pt: { xs: 10, md: 13 },
                pb: 6,
            }}
        >
            <Box
                sx={{
                    maxWidth: 1250,
                    mx: "auto",
                    px: { xs: 2, md: 3 },
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        lg: "1.05fr 1fr",
                    },
                    gap: { xs: 4, lg: 6 },
                    alignItems: "start",
                }}
            >
                <ProductGallery images={product.images} />

                <ProductInfo product={product} />
            </Box>
        </Box>
    );
}

export default ProductDetails;