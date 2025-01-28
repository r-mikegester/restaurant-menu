import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Search from "../../pages/Search";
import Favorites from "../../pages/Favorites";
import Misc from "../../pages/Misc";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/misc" element={<Misc />} />
        </Routes>
    );
};

export default AppRoutes;
