import "./OrderDetailsSkeleton.css";

function OrderDetailsSkeleton() {
    return (
        <div className="order-details-container"

            style={{
                width: "75%",
                margin: "140px auto 50px",
            }}
        >

            <div className="backSkeleton skeleton"></div>

            <div className="headerSkeleton">

                <div>
                    <div className="labelSkeleton skeleton"></div>
                    <div className="titleSkeleton skeleton"></div>
                    <div className="dateSkeleton skeleton"></div>
                </div>

                <div className="statusSkeleton skeleton"></div>

            </div>

            {/* Shipping */}

            <div className="sectionSkeleton">

                <div className="sectionTitle skeleton"></div>

                <div className="line skeleton w70"></div>
                <div className="line skeleton w35"></div>
                <div className="line skeleton w90"></div>
                <div className="line skeleton w55"></div>
                <div className="line skeleton w40"></div>

            </div>

            {/* Status */}

            <div className="sectionSkeleton">

                <div className="sectionTitle skeleton"></div>

                <div className="statusSkeleton skeleton"></div>

            </div>

            {/* Products */}

            <div className="sectionSkeleton">

                <div className="sectionTitle skeleton"></div>

                {[1, 2, 3].map((item) => (

                    <div
                        className="productSkeleton"
                        key={item}
                    >

                        <div className="productImageSkeleton skeleton"></div>

                        <div className="productInfoSkeleton">

                            <div className="line skeleton w80"></div>

                            <div className="line skeleton w35"></div>

                        </div>

                        <div className="priceSkeleton skeleton"></div>

                    </div>

                ))}

            </div>

            {/* Payment */}

            <div className="sectionSkeleton">

                <div className="sectionTitle skeleton"></div>

                <div className="line skeleton w30"></div>

            </div>

            {/* Summary */}

            <div className="sectionSkeleton">

                <div className="sectionTitle skeleton"></div>

                {[1, 2, 3].map((item) => (

                    <div
                        key={item}
                        className="summarySkeleton"
                    >
                        <div className="line skeleton w25"></div>
                        <div className="line skeleton w15"></div>
                    </div>

                ))}

            </div>

        </div>
    );
}

export default OrderDetailsSkeleton;