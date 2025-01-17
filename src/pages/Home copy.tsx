'use client';

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Drawer } from "vaul";
import ProductList from "../components/ProductList"; // Adjust the path as per your project structure
import { products } from "../data/products"; // Import products data

const Home = () => {
  const [greeting, setGreeting] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);

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

  return (
    <div className="bg-emerald-950/85 h-[100svh] w-full">
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
                    <div className="p-6 bg-white h-[85svh] rounded-t-3xl">
                      {/* Drawer Content */}
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

      {/* Main Content */}
      <div className="flex flex-col sticky top-40">
        <div className="bg-white h-[85svh] md:h-[80svh] w-screen z-30 mt-40 sticky top-0 rounded-t-3xl overflow-y-scroll">
          {/* Search Bar */}
          <div className="w-full h-auto">
            <div className="h-20 w-full p-4 pb-0 flex justify-between space-x-3 items-center">
              <div className="bg-slate-200 border-2 border-gray-300 text-emerald-950/85 h-14 rounded-2xl w-full text-left p-4 px-4">
                Search
              </div>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="border-b-2 bg-white border-b-gray-200 rounded-b-3xl shadow-md w-full sticky top-0">
            <div className="items-center place-items-center grid grid-cols-3 grid-rows-1 gap-4 p-4">
              <button className="w-full btn h-full bg-emerald-950/85 rounded-2xl flex items-center justify-center py-2 md:space-x-1 text-white">
                <Icon icon="lucide-lab:burger" width="24" height="24" className="h-10 w-10" />
                <h1>Burgers</h1>
              </button>
              <button className="w-full btn h-full bg-emerald-950/85 rounded-2xl flex items-center justify-center py-2 md:space-x-1 text-white">
                <Icon icon="ph:bowl-food" width="24" height="24" className="h-10 w-10" />
                <h1>Meals</h1>
              </button>
              <button className="w-full btn h-full bg-emerald-950/85 rounded-2xl flex items-center justify-center py-2 md:space-x-1 text-white">
                <Icon icon="carbon:drink-02" width="24" height="24" className="h-10 w-10" />
                <h1>Drinks</h1>
              </button>
            </div>
          </div>

          {/* Product List */}
          <ProductList onFavoriteChange={handleFavoriteChange} />
        </div>
      </div>
    </div>
  );
};

export default Home;
