import FiveDaysForecastSection from "./component/FiveDaysForecastSection";
import HeroSection from "./component/HeroSection";
import SearchBox from "./component/SearchBox";
import TopSection from "./component/TopSection";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center mx-auto min-h-screen w-full max-w-7xl">
      <TopSection />
      <SearchBox />
      <HeroSection />
      <FiveDaysForecastSection />
    </div>
  );
}
