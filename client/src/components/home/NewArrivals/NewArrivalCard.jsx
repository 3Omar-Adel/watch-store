import { Link } from "react-router-dom";

function NewArrivalCard({ product }) {

    return (
        <Link
            to={`/product/${product._id}`}
            className="arrivalCard"
        >
            <div className="arrivalImage">
                <img
                    src={product.images?.[0]?.url}
                    alt={product.name}
                />
            </div>

            <div className="arrivalInfo">
                <h3>{product.name}</h3>

            </div>
        </Link>
    );
}

export default NewArrivalCard;