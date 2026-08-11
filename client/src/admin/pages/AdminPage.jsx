import Dashboard from "../components/Dashboard/Dashboard";
import ProductsPage from "../components/Products/ProductsPage"; 
import DashboardCharts from "../components/StatisticsCircle/DashboardCharts";
import OrdersPage from "../components/Orders/OrdersPage";


function AdminPage() {
    return (
        <>
            <div className="adminPage">
                <section id="dashboard">
                    <Dashboard />
                </section>
                <section id="overview">
                    <DashboardCharts />
                </section>
                <section id="products">
                    <ProductsPage />
                </section>
                <section id="orders">
                    <OrdersPage />
                </section>
            </div>
        </>
    );
}

export default AdminPage;