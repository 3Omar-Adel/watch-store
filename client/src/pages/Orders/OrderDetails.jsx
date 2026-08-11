import "./OrderDetails.css";
import OrderDetailsSkeleton from "../../components/Skeletons/OrderDetailsSkeleton";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { fetchOrderById } from "../../features/order/orderSlice";

function OrderDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { order, isLoading } = useSelector(
        (state) => state.order
    );

    useEffect(() => {
        dispatch(fetchOrderById(id));
    }, [dispatch, id]);

    if (isLoading) {
        return <OrderDetailsSkeleton />;
    }

    if (!order) {
        return <h2>Order not found</h2>;
    }
    return (
        <div className="orderDetails">

            <div className="orderTop">
                <button
                    className="backBtn"
                    onClick={() => navigate("/orders")}
                >
                    ← Back
                </button>

                <div className="orderHeader">
                    <div>
                        <p className="orderLabel">
                            ORDER: #{order._id.slice(-6)}
                        </p>
                        <p className="orderDate">
                            {new Date(order.createdAt).toLocaleDateString("en-GB")}
                        </p>
                    </div>
                    <span
                        className={`order-status ${order.orderStatus.toLowerCase()}`}
                    >
                        {order.orderStatus}
                    </span>
                </div>
            </div>
            <div className="detailsGrid">

                {/* Left */}

                <div className="detailsLeft">
                    <div className="detailsCard">
                        <h2>Shipping Address</h2>
                        <div className="shippingInfo">
                            <p>
                                {order.shippingAddress.firstName}{" "}
                                {order.shippingAddress.lastName}
                            </p>

                            <p>{order.shippingAddress.phone}</p>

                            <p>
                                {order.shippingAddress.address}
                            </p>

                            <p>
                                {order.shippingAddress.city},{" "}
                                {order.shippingAddress.governorate}
                            </p>

                        </div>

                    </div>

                    {/* Products */}

                    <div className="detailsCard">

                        <h2>
                            Products ({order.orderItems.length})
                        </h2>

                        <div className="productsList">

                            {order.orderItems.map((item) => (

                                <div
                                    key={item.product}
                                    className="productRow"
                                >

                                    <img
                                        src={item.image}
                                        alt={item.name}
                                    />

                                    <div className="productInfo">

                                        <h3>{item.name}</h3>

                                        <p>
                                            Qty : {item.quantity}
                                        </p>

                                    </div>

                                    <div className="productPrice">

                                        EGP {item.price}

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

                {/* Right */}

                <div className="detailsRight">

                    {/* Payment */}

                    <div className="detailsCard">

                        <h2>Payment</h2>

                        <div className="paymentInfo">

                            <div className="summaryItem">

                                <span>Method</span>

                                <strong>
                                    {order.paymentMethod}
                                </strong>

                            </div>

                            <div className="summaryItem">

                                <span>Status</span>

                                <strong>
                                    {order.isPaid
                                        ? "Paid"
                                        : "Cash On Delivery"}
                                </strong>

                            </div>

                        </div>

                    </div>

                    {/* Summary */}

                    <div className="detailsCard orderSummary">

                        <h2>Summary</h2>

                        <div className="summaryItem">

                            <span>Items</span>

                            <span>
                                EGP {order.itemsPrice}
                            </span>
                        </div>
                        <div className="summaryItem">
                            <span>Shipping</span>
                            <span>EGP {order.shippingPrice}</span>
                        </div>
                        <div className="summaryDivider" />
                        <div className="summaryTotal">
                            <span>Total</span>
                            <span>EGP {order.totalPrice}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetails;