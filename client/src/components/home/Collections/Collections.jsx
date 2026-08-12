import "./Collections.css";
import "./CollectionCard"
import CollectionCard from "./CollectionCard";
import men from "../../../assets/images/collections/mens_watch.png"
import women from "../../../assets/images/collections/womens.png"
import unisex from "../../../assets/images/collections/unisex.png"
import luxury from "../../../assets/images/collections/luxury.png"
import sports from "../../../assets/images/collections/sports.png"
import digital from "../../../assets/images/collections/digital.png"
import classic from "../../../assets/images/collections/classic.png"
import smart from "../../../assets/images/collections/smart.png"


function Collections() {
        const collectionsData = [
            {
                id: 1,
                title: "Men's",
                image: men,
                path: "/shop?gender=men"
            },
            {
                id: 2,
                title: "Women's",
                image: women,
                path: "/shop?gender=women"
            },
            {
                id: 3,
                title: "Unisex",
                image: unisex,
                path: "/shop?category=unisex",
            },
            {
                id: 4,
                title: "Luxury",
                image: luxury,
                path: "/shop?category=Luxury",
            },
            {
                id: 5,
                title: "Sports Watches",
                image: sports,
                path: "/shop?category=Sports",
            },
            {
                id: 6,
                title: "Digital Watches",
                image: digital,
                path: "/shop?category=Digital "
            },
            {
                id: 7,
                title: "Classic Watches",
                image: classic,
                path: "/shop?category=Classic"
            },
            {
                id: 8,
                title: "Smart Watches",
                image: smart,
                path: "/shop?category=Smart",
            },


        ]
    return (
        <section className="collectionsWrapper">
            <div id="collections" className="collections">
                {collectionsData.map((item) => (
                    <CollectionCard
                        key={item.id}
                        {...item}
                    />
                ))}
            </div>
        </section>
    )
}
export default Collections;