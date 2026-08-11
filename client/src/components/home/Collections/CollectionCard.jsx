import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
function CollectionCard({ title, image, path }) {
    return (
        <Link to={path} className="collectionCard">
            <div className="collectionImage">
                <img src={image} alt={title} />
            </div>

            <span>{title}</span>
        </Link>
        
    )
}
export default CollectionCard