import FiveDaysForecastSection from "./component/FiveDaysForecastSection";
import HeroSection from "./component/HeroSection";
import HourlyForecastSection from "./component/HourlyForecast";
import SearchBox from "./component/SearchBox";
import TopSection from "./component/TopSection";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center mx-auto min-h-screen w-full max-w-7xl pb-20">
      <TopSection />
      <SearchBox />
      <div className="flex items-start gap-5 mt-18">
        <div>
          <HeroSection />
          <FiveDaysForecastSection />
        </div>
        <HourlyForecastSection />
      </div>
    </div>
  );
}
