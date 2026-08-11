import "./Collections.css";
import "./CollectionCard"
import CollectionCard from "./CollectionCard";
import men from "../../../assets/images/collections/men.jfif"
import women from "../../../assets/images/collections/women.jfif"
import Luxury from "../../../assets/images/collections/Luxury.jfif"
import Gloria from "../../../assets/images/collections/3.jfif"


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
            title: "Luxury",
            image: Luxury,
            path: "/shop?category=Luxury",
        },
        {
            id: 4,
            title: "Sports Watches",
            image: Gloria,
            path: "/shop?category=Sports",
        },
        {
            id: 5,
            title: "Digital Watches",
            image: men,
            path: "/shop?category=Digital "
        },
        {
            id: 6,
            title: "Classic Watches",
            image: women,
            path: "/shop?category=Classic"
        },
        {
            id: 7,
            title: "Smart Watches",
            image: Luxury,
            path: "/shop?category=Smart",
        },
        {
            id: 8,
            title: "Luxury",
            image: Luxury,
            path: "/shop?category=luxury",
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