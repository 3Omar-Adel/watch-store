import "./LuxuryBanner.css";
import { Link } from "react-router-dom";
import Banner from "../../../assets/images/Banner/image.png";

function LuxuryBanner() {
    return (
        <section className="luxuryBanner">
            <div className="bannerContent">
                <span className="bannerTag">
                    PREMIUM COLLECTION
                </span>

                <h2>
                    Crafted for Those Who
                    <span> Value Every Second.</span>
                </h2>

                <p>
                    Explore an exclusive collection of premium
                    watches designed with timeless elegance,
                    exceptional craftsmanship, and unmatched
                    precision. Elevate your everyday style with
                    a watch that truly reflects your personality.
                </p>

                <Link
                    to="/shop"
                    className="bannerBtn"
                >
                    Explore Collection
                </Link>
            </div>

            <div className="bannerImage">
                <img
                    src={Banner}
                    alt="Luxury Watch"
                />
            </div>
        </section>
    );
}

export default LuxuryBanner;