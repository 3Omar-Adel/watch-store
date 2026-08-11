import Collections from "../components/home/Collections/Collections";
import Hero from "../components/home/Hero/Hero";
import SearchFilter from "../components/home/SearchFilter/SearchFilter";
import FeaturedProducts from "../components/home/FeatuedProducts/FeaturedProducts";
import Footer from "../components/home/Footer/Footer";
import NewArrivals from "../components/home/NewArrivals/NewArrivals";
import LuxuryBanner from "../components/home/LuxuryBanner/LuxuryBanner";
import WhyChooseUs from "../components/home/WhyChooseUs/WhyChooseUs";
function Home() {
    return (
        <>
            <Hero />
            <Collections />
            <NewArrivals />
            <WhyChooseUs />
            {/* <LuxuryBanner /> */}
            <FeaturedProducts />
            <Footer />

        </>
    )
}
export default Home;