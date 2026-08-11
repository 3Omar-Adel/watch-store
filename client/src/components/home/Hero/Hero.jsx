import "./Hero.css";
import { FaArrowRight } from "react-icons/fa";
import heroImage from "../../../assets/images/hero.png"
import { Link } from "react-router-dom";
import { memo } from "react";

function Hero() {
    return (
        <section className="hero">
            <div className="heroOverlay"></div>
            <div className="heroContent">
                <h1>
                    Every Second
                    <span> Defines Your Style.</span>
                </h1>
            </div>
        </section>
    );
}

export default memo(Hero) ;