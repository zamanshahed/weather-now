import HeroCard from "./component/HeroCard";
import HeroSection from "./component/HeroSection";
import SearchBox from "./component/SearchBox";
import TopSection from "./component/TopSection";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center mx-auto min-h-screen w-full max-w-7xl">
      <TopSection />
      <div className="mt-18">
        <SearchBox />
      </div>
      <HeroSection />
    </div>
  );
}
