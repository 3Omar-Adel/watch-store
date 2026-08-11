import "./OrderCardSkeleton.css";

function OrderCardSkeleton() {
    return (
        <div className="order-card">
            {/* Left */}
            <div className="order-left">
                <div className="images-stack">
                    <div
                        className="order-image skeleton"
                        style={{ left: "0px", zIndex: 3 }}
                    />
                    <div
                        className="order-image skeleton"
                        style={{ left: "22px", zIndex: 2 }}
                    />
                    <div
                        className="order-image skeleton"
                        style={{ left: "44px", zIndex: 1 }}
                    />
                </div>
                <div className="skeleton skeleton-name" />
                <div className="skeleton skeleton-count" />
            </div>
            {/* Center */}
            <div className="order-center">
                <div className="skeleton skeleton-status" />
            </div>
            {/* Right */}
            <div className="order-right">
                <div className="skeleton skeleton-id" />
                <div className="skeleton skeleton-date" />
            </div>
        </div>
    );
}

export default OrderCardSkeleton;