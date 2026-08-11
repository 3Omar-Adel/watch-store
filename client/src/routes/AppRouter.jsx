import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Shop from "../pages/Shop/Shop";
import Collections from "../components/home/Collections/Collections";
import Cart from "../pages/Cart/Cart";
import Wishlist from "../pages/Wishlist/Wishlist";
import Profile from "../pages/Profile/Profile";
import Addresses from "../pages/Adresses/Addresses";
import Checkout from "../pages/Checkout/Checkout";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";
import Orders from "../pages/Orders/Orders";
import OrderDetails from "../pages/Orders/OrderDetails";
// admin
import AdminRoute from "../components/ProtectedRoutes/AdminRoute";
import AdminLayout from "../admin/layout/AdminLayout";
import AdminPage from "../admin/pages/AdminPage";
import AppTheme from "../theme/AppTheme";
import { ThemeContextProvider } from "../context/ThemeContext";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="Shop" element={<Shop />} />
                    <Route path="Collections" element={<Collections />} />
                    <Route path="Cart" element={<Cart />} />
                    <Route path="Wishlist" element={<Wishlist />} />
                    <Route path="Profile" element={<Profile />} />
                    <Route path="/addresses" element={<Addresses />} />
                    <Route path="/Checkout" element={<Checkout />} />
                    <Route path="/order-success" element={<OrderSuccess />} />
                    <Route path="/Orders" element={<Orders />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/orders/:id" element={<OrderDetails />} />
                </Route>
                <Route element={<AdminRoute />}>
                    <Route
                        path="/admin"
                        element={
                            <ThemeContextProvider>
                                <AppTheme>
                                    <AdminLayout />
                                </AppTheme>
                            </ThemeContextProvider>
                        }
                    >
                        <Route index element={<AdminPage />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
export default AppRouter;