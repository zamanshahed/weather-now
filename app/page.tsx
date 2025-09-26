import ApiErrorSection from "./component/ApiErrorSection";
import FiveDaysForecastSection from "./component/FiveDaysForecastSection";
import HeroSection from "./component/HeroSection";
import HourlyForecastSection from "./component/HourlyForecast";
import SearchBox from "./component/SearchBox";
import TopSection from "./component/TopSection";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start mx-auto min-h-screen w-full max-w-7xl pb-20">
      <TopSection />
      <ApiErrorSection>
        <>
          <SearchBox />
          <div className="flex lg:flex-row flex-col lg:items-start items-center gap-5 md:mt-18 mt-8 w-full">
            <div className="w-full">
              <HeroSection />
              <FiveDaysForecastSection />
            </div>
            <HourlyForecastSection />
          </div>
        </>
      </ApiErrorSection>
    </div>
  );
}
