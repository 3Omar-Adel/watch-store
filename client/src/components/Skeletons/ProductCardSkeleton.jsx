import "./ProductCardSkeleton.css";

function ProductCardSkeleton() {
    return (
        <div className="productSkeleton">
            <div className="skeletonImage">
                <div className="skeletonHeart"></div>
            </div>
            <div className="skeletonInfo">
                <div className="skeletonBrand"></div>
                <div className="skeletonTitle"></div>
                <div className="skeletonTitle short"></div>
                <div className="skeletonPrice"></div>
            </div>
        </div>
    );
}

export default ProductCardSkeleton;