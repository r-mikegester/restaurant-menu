'use client';

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Drawer } from "vaul";
import ProductList from "../components/ProductList"; // Adjust the path as per your project structure
import { products } from "../data/products"; // Import products data

const Home = () => {
  const [greeting, setGreeting] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [mainDrawerHeight, setMainDrawerHeight] = useState<number>(
    window.innerHeight * 0.7
  ); // Default to 70%
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting("Good morning, kumpadre!");
    } else if (currentHour < 18) {
      setGreeting("Good afternoon, kumpadre!");
    } else {
      setGreeting("Good evening, kumpadre!");
    }
  }, []);

  const handleFavoriteChange = (productId: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(productId)
        ? prevFavorites.filter((id) => id !== productId)
        : [...prevFavorites, productId]
    );
  };

  const favoriteProducts = products.filter((product) =>
    favorites.includes(product.id)
  );

  const handleMainDrawerDrag = (event: React.TouchEvent | React.MouseEvent) => {
    const windowHeight = window.innerHeight;
    const clientY =
      "touches" in event ? event.touches[0].clientY : event.clientY;
    const newHeight = windowHeight - clientY;

    if (newHeight >= windowHeight * 0.5 && newHeight <= windowHeight * 0.7) {
      setMainDrawerHeight(newHeight);
    }
  };

  const stopMainDrawerDrag = () => {
    setIsDragging(false);

    // Snap to nearest height: 50% or 70%
    const windowHeight = window.innerHeight;
    if (mainDrawerHeight < windowHeight * 0.6) {
      setMainDrawerHeight(windowHeight * 0.5); // Snap to 50%
    } else {
      setMainDrawerHeight(windowHeight * 0.7); // Snap to 70%
    }
  };

  const handleOutsideClick = () => {
    setMainDrawerHeight(window.innerHeight * 0.85); // Snap back to 85%
  };

  return (
    <div className="bg-emerald-950/85 h-[100svh] w-full relative">
      {/* Header Section */}
      <div className="flex flex-col sticky top-0">
        <div className="h-20 w-full p-4 pb-0 flex">
          <div className="flex items-center justify-between space-x-2 h-auto w-full">
            <h1 className="font-bold text-white text-3xl text-left">Kumpadre</h1>
            <div className="h-10 rounded-full w-16 text-center">
              {/* Favorites Button with Drawer */}
              <Drawer.Root>
                <Drawer.Trigger asChild>
                  <button className="btn-circle z-50 hover:bg-base-100 btn p-2 hover:scale-105">
                    <Icon icon="hugeicons:service" className="w-full h-full text-white" />
                  </button>
                </Drawer.Trigger>
                <Drawer.Portal>
                  <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                  <Drawer.Content className="bg-gray-100 h-fit rounded-t-3xl fixed bottom-0 left-0 right-0 outline-none">
                    <div className="p-6 bg-white h-[85svh] rounded-t-3xl overflow-y-scroll">
                      <h1 className="font-medium text-2xl">Favorites</h1>
                      {favoriteProducts.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          No favorites yet.
                        </p>
                      ) : (
                        <ul className="space-y-4">
                          {favoriteProducts.map((product) => (
                            <li key={product.id} className="p-4 border rounded-lg">
                              <div className="flex items-center space-x-4">
                                <img
                                  src={product.image}
                                  alt={product.title}
                                  className="w-16 h-16 rounded-lg object-cover"
                                />
                                <div>
                                  <h2 className="font-bold">{product.title}</h2>
                                  <p className="text-sm">{product.description}</p>
                                  <p className="text-emerald-950/85 font-semibold">
                                    {product.price}
                                  </p>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </Drawer.Content>
                </Drawer.Portal>
              </Drawer.Root>
            </div>
          </div>
        </div>
      </div>

      {/* Greeting Section */}
      <div className="h-40 w-full sticky top-24 flex items-center justify-center z-0">
        <div className="p-4 rounded-xl">
          <h1 className="text-white text-4xl md:text-5xl font-bold tracking-wide animate-fade-in">
            {greeting}
          </h1>
        </div>
      </div>

      {/* Main Content with Snapping Drawer */}
      <div
        className="fixed inset-0 z-20 bg-transparent"
        onClick={handleOutsideClick}
      >
        <div
          className="bg-white rounded-t-3xl fixed bottom-0 left-0 right-0 z-30 overflow-y-scroll"
          style={{ height: `${mainDrawerHeight}px` }}
          onMouseDown={() => setIsDragging(true)}
          onMouseMove={(e) => isDragging && handleMainDrawerDrag(e)}
          onMouseUp={stopMainDrawerDrag}
          onTouchStart={() => setIsDragging(true)}
          onTouchMove={(e) => isDragging && handleMainDrawerDrag(e)}
          onTouchEnd={stopMainDrawerDrag}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
          <div className="p-6">
            <ProductList onFavoriteChange={handleFavoriteChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
