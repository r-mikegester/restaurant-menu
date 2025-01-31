import Carousel from "../components/utils/Carousel";
import SplitText from "../components/utils/SplitText";
import { useGreeting } from "../shared/hooks/useGreetings";

const Home = () => {
    const greeting = useGreeting(); 

    const handleAnimationComplete = () => {
        console.log('All letters have animated!');
    };

    return (
        <div className="items-center justify-center w-full h-svh md:flex-row md:p-6 bg-gradient-to-tr from-gray-200 via-green-200 to-emerald-300 ">
            <div className="flex flex-col md:flex-row justify-center items-center w-full h-full">
            <div className="flex items-center justify-center w-full md:pt-0 md:h-full h-fit">
                <SplitText
                    text={greeting}
                    className="p-4 text-5xl font-bold text-left text-gray-700 md:text-7xl"
                    delay={150}
                    animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                    animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                    threshold={0.2}
                    rootMargin="-50px"
                    onLetterAnimationComplete={handleAnimationComplete}
                />
                
            </div>
            
            <div className="md:w-full md:h-full w-96 h-96 md:pb-16">
                <Carousel />
            </div>
            </div>

        </div>
    );
};

export default Home;
