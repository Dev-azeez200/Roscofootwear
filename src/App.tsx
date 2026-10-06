import { Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/Mainlayout";
import AdminLayout from "./Layout/AdminLayout";
import Home from "./Pages/Home.tsx";
import Shop from "./Pages/Shop.tsx";
import Cart from "./Pages/Cart.tsx";
import Collections from "./Pages/Collections.tsx";
import Men from "./Pages/Men.tsx";
import Women from "./Pages/Women.tsx";
import AboutUs from "./Pages/AboutUs.tsx";
import Wishlist from "./Pages/Wishlist.tsx";
import ViewProduct from "./Pages/ViewProduct.tsx";

// Admin pages
import Overview from "./Pages/admin/Overview.tsx";
import Order from "./Pages/admin/Order.tsx";
import Product from "./Pages/admin/Product.tsx";
import Performance from "./Pages/admin/Performance.tsx";
import Settings from "./Pages/admin/Settings.tsx";
import Custormars from "./Pages/admin/Custormars.tsx";



function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/viewproduct" element={<ViewProduct />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="overview" element={<Overview />} />
        <Route path="order" element={<Order />} />
        <Route path="product" element={<Product />} />
        <Route path="Performance" element={<Performance />} />
        <Route path="settings" element={<Settings />} />
        <Route path="custormars" element={<Custormars />} />
      </Route>
    </Routes>
  );
}

export default App;
