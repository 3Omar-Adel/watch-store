import "./Checkout.css";
import { Box, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    createOrder,
    reset,
} from "../../features/order/orderSlice";

import {
    clearCart,
} from "../../features/cart/cartSlice";

import {
    fetchAddresses,
} from "../../features/address/addressSlice";

import {
    showSnackbar,
} from "../../features/snackbar/snackbarSlice";

import AddressCard from "../Adresses/AddressCard";
import CheckoutHeader from "./CheckoutHeader";
import CheckoutProducts from "./CheckoutProducts";
import PaymentMethod from "./PaymentMethod";

import OrderSummary from "../../components/common/OrderSummary";

function Checkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    const { cartItems = [] } = useSelector(
        (state) => state.cart
    );

    const { addresses = [] } = useSelector(
        (state) => state.address
    );

    const defaultAddress = addresses.find(
        (address) => address.isDefault
    );

    const { subtotal, shippingPrice, totalPrice } = useMemo(() => {
        const subtotal = cartItems.reduce(
            (total, item) =>
                total + Number(item.price) * Number(item.quantity),
            0
        );

        const shippingPrice = subtotal > 0 ? 15 : 0;

        const totalPrice = subtotal + shippingPrice;

        return {
            subtotal,
            shippingPrice,
            totalPrice,
        };
    }, [cartItems]);

    useEffect(() => {
        dispatch(fetchAddresses());
    }, [dispatch]);


    const handlePlaceOrder = async () => {
        if (isPlacingOrder) return;
        if (!defaultAddress) {
            dispatch(
                showSnackbar({
                    message:
                        "Please add a shipping address first",
                    severity: "warning",
                })
            );
            return;
        }
        setIsPlacingOrder(true);

        try {

            const orderData = {
                orderItems: cartItems.map((item) => ({
                    product: item.product || item._id,
                    name: item.name,
                    image:
                        item.images?.[0]?.url ||
                        item.images?.[0] ||
                        item.image,
                    price: item.price,
                    quantity: item.quantity,
                })),

                shippingAddress: {
                    firstName: defaultAddress.firstName,
                    lastName: defaultAddress.lastName,
                    phone: defaultAddress.phone,
                    governorate: defaultAddress.governorate,
                    city: defaultAddress.city,
                    address: defaultAddress.address,
                },

                paymentMethod: "Cash",
                itemsPrice: subtotal,
                shippingPrice,
                totalPrice,
            };

            const result = await dispatch(
                createOrder(orderData)
            );

            if (createOrder.fulfilled.match(result)) {
                dispatch(clearCart());
                dispatch(reset());
                navigate("/order-success");
            }

        } finally {
            setIsPlacingOrder(false);
        }
    };
    return (
        <Box
            sx={{
                maxWidth: 1250,
                mx: "auto",
                mt: { xs: 10, md: 13 },
                mb: 6,
                px: { xs: 2, md: 3 },
            }}
        >
            <CheckoutHeader />

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        lg: "minmax(0, 1fr) 360px",
                    },
                    gap: { xs: 3, lg: 4 },
                    alignItems: "start",
                }}
            >
                {/* Left */}
                <Box sx={{ minWidth: 0 }}>
                    <Box className="checkoutSection">
                        <Typography
                            sx={{
                                fontSize: 21,
                                fontWeight: 700,
                                mb: 2,
                            }}
                        >
                            Shipping Address
                        </Typography>

                        {defaultAddress ? (
                            <Box
                                onClick={() =>
                                    navigate("/addresses")
                                }
                                sx={{
                                    cursor: "pointer",
                                }}
                            >
                                <AddressCard
                                    address={defaultAddress}
                                    checkout
                                />
                            </Box>
                        ) : (
                            <Box
                                onClick={() =>
                                    navigate("/addresses")
                                }
                                sx={{
                                    p: 3,
                                    textAlign: "center",
                                    border:
                                        "2px dashed #ddd",
                                    borderRadius: 2,
                                    cursor: "pointer",
                                }}
                            >
                                <strong>
                                    No Default Address
                                </strong>

                                <Box
                                    sx={{
                                        mt: 1,
                                        color: "#888",
                                        fontSize: 14,
                                    }}
                                >
                                    Click here to add
                                    your address
                                </Box>
                            </Box>
                        )}
                    </Box>

                    <Box className="checkoutSection">
                        <CheckoutProducts
                            cartItems={cartItems}
                        />
                    </Box>
                </Box>

                {/* Right */}
                <Box
                    sx={{
                        position: {
                            lg: "sticky",
                        },
                        top: 100,
                    }}
                >
                    <PaymentMethod />

                    <Box sx={{ mt: 2 }}>
                        <OrderSummary
                            cartItems={cartItems}
                            buttonText="Place Order"
                            disabled={isPlacingOrder}
                            buttonAction={
                                handlePlaceOrder
                            }
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default Checkout;