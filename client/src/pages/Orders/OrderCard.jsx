import { useNavigate } from "react-router-dom";

function OrderCard({ order }) {
    const navigate = useNavigate();

    const firstItem = order.orderItems[0];

    return (
        <div
            className="order-card"
            onClick={() => navigate(`/orders/${order._id}`)}
        >
            {/* left */}
            <div className="order-left">
                <div className="images-stack">
                    {order.orderItems.slice(0, 3).map((item, index) => (
                        <img
                            key={item.product || index}
                            src={item.image}
                            alt={item.name}
                            className="order-image"
                            style={{
                                left: `${index * 22}px`,
                                zIndex: 10 - index,
                            }}
                        />
                    ))}

                    {order.orderItems.length > 3 && (
                        <div
                            className="more-images"
                            style={{
                                left: `${3 * 22}px`,
                                zIndex: 1,
                            }}
                        >
                            +{order.orderItems.length - 3}
                        </div>
                    )}
                </div>
                <h3 className="order-name">
                    {firstItem.name}
                </h3>
                {order.orderItems.length > 1 && (
                    <p className="order-count">
                        +{order.orderItems.length - 1} more items
                    </p>
                )}
            </div>
            {/* center */}
            <div className="order-center">
                
                <span
                    className={`order-status ${order.orderStatus.toLowerCase()}`}
                >
                    {order.orderStatus}
                </span>
            </div>
            {/* right */}
            <div className="order-right">
                <p className="order-date">
                    Order on :{new Date(order.createdAt).toLocaleDateString("en-GB")}
                </p>
                <p className="order-id">
                    Order ID: #{order._id.slice(-6)}
                </p>
            </div>
        </div>
    );
}

export default OrderCard;