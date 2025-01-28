import Carousel from "../components/utils/Carousel";
import { useGreeting } from "../shared/hooks/useGreetings"; // Correct import

const Home = () => {
    const greeting = useGreeting(); // Call the hook to get the greeting message

    return (
        <div className="flex flex-col items-center justify-center w-full h-screen md:flex-row md:p-6 bg-gradient-to-tr from-gray-200 via-green-200 to-emerald-300 ">
            <div className="flex items-center justify-center w-full pt-10 md:pt-0 md:h-full h-fit">
                <h1 className="p-4 text-5xl font-bold text-left text-gray-700 md:text-7xl">{greeting}</h1>
            </div>
            <div className="w-full h-full pb-16">
                <Carousel />
            </div>
        </div>
    );
};

export default Home;
