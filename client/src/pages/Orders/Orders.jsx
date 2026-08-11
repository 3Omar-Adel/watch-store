import "./Orders.css"
import OrderCardSkeleton from "../../components/Skeletons/OrderCardSkeleton";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMyOrders } from "../../features/order/orderSlice";

function Order() {
    const dispatch = useDispatch();

    const { orders, loading} = useSelector(
        (state) => state.order
    )

    useEffect(() => {
        dispatch(fetchMyOrders())
    }, [dispatch])

    return (
        <>
            <div className="orders-container">
                {loading
                    ? Array.from({ length: 6 }).map((_, index) => (
                        <OrderCardSkeleton key={index} />
                    ))
                    : orders.map((order) => (
                        <OrderCard
                            key={order._id}
                            order={order}
                        />
                    ))}
            </div>

        </>
    )
}

export default Order;