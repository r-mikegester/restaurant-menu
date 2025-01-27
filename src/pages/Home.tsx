import One from "../components/Carousel";

interface HomeProps {
  greeting: string;
}


const Home: React.FC<HomeProps> = ({ greeting }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full md:flex-row md:p-6 ">
      <div className="flex items-center justify-center w-full pt-10 md:pt-0 md:h-full h-fit">
        <h1 className="p-4 text-5xl font-bold text-left text-gray-700 md:text-7xl">{greeting}</h1>
      </div>
      <div className="w-full h-full">
        <One />
      </div>
    </div>
  );
};

export default Home;
