import { Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/Mainlayout";
import Home from "./Pages/Home.tsx";

import Shop from "./Pages/Shop.tsx";
import Cart from "./Pages/Cart.tsx";
import Collections from "./Pages/Collections.tsx";
import Men from "./Pages/Men.tsx";
import Women from "./Pages/Women.tsx";
import AboutUs from "./Pages/AboutUs.tsx";

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
      </Route>
    </Routes>
  );
}

export default App;
