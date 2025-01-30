import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Search from "../../pages/Search";
import Favorites from "../../pages/Favorites";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/favorites" element={<Favorites />} />
        </Routes>
    );
};

export default AppRoutes;
