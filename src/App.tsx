// import { useState } from "react";
import { Routes, Route,  } from "react-router-dom";
// import BottomNav from "./components/BottomNav";
import Home from "./pages/Home";
import Favorite from "./pages/Favorites";

const App = () => {
  // const [activeIndex, setActiveIndex] = useState(0);
  // const navigate = useNavigate();

  // const swipeableViews = [
  //   { path: "/", label: "Menu", icon: "material-symbols:fastfood-outline-rounded" },
 
  //   { path: "/favorites", label: "Favorites", icon: "hugeicons:service" },

  // ];

  return (
    <div className="app bg-emerald-950/85">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorite />} />
      </Routes>
      {/* <BottomNav
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        swipeableViews={swipeableViews}
        navigate={navigate}
      /> */}
    </div>
  );
};

export default App;
