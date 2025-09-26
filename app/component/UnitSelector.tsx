import Image from "next/image";
import * as React from "react";

interface UnitSelectorProps {
  value: "metric" | "imperial";
  onChange: (unit: "metric" | "imperial") => void;
}

const UnitSelector: React.FC<UnitSelectorProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2.5 select-none bg-[#262540] hover:outline-2 outline-offset-1 rounded-lg md:px-4 md:py-3 md:text-base text-sm px-2.5 py-2 text-white font-medium cursor-pointer"
      >
        <Image
          src={"/icons/units-icon.svg"}
          alt="unit-selector-icon"
          width={16}
          height={16}
        />
        <span>
          <span>Units</span>
          <span className="ml-2">
            ({value === "metric" ? "Metric" : "Imperial"})
          </span>
        </span>
        <Image
          src={"/icons/down-arrow.svg"}
          alt="unit-selector-icon"
          width={12}
          height={18}
          className={`${isOpen ? "rotate-180" : ""} transition-transform duration-300`}
        />
      </button>
      {isOpen && (
        <div className="absolute top-14 right-0 z-50">
          <UnitSelectorDropdown
            value={value}
            onChange={(value) => {
              onChange(value);
              setIsOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default UnitSelector;

const UnitSelectorDropdown: React.FC<UnitSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="w-[214px] p-2 space-y-2 rounded-xl text-white border border-[#3C3B5E] bg-[#262540] shadow-lg font-medium">
      <button
        onClick={() => onChange(value === "metric" ? "imperial" : "metric")}
        className="hover:bg-[#302F4A] hover:outline-2 outline-offset-1 p-2.5 rounded-lg w-full text-left cursor-pointer"
      >
        Switch to {value === "metric" ? "Imperial" : "Metric"}
      </button>

      {/* Temperature */}
      <div>
        <h4 className="text-[#ACACB7] px-2.5 text-sm rounded-lg w-full text-left">
          Temperature
        </h4>
        <p
          className={`${value === "metric" ? "bg-[#302F4A]" : ""} flex items-center justify-between p-2.5 my-2 rounded-lg w-full text-left`}
        >
          <span>Celsius (°C)</span>
          {value === "metric" ? <UnitCheckMarkIcon /> : null}
        </p>
        <p
          className={`${value === "imperial" ? "bg-[#302F4A]" : ""} flex items-center justify-between p-2.5 rounded-lg w-full text-left`}
        >
          <span>Fahrenheit (°F)</span>
          {value === "imperial" ? <UnitCheckMarkIcon /> : null}
        </p>
      </div>

      {/* wind speed */}
      <div>
        <h4 className="text-[#ACACB7] px-2.5 text-sm rounded-lg w-full text-left">
          Wind Speed
        </h4>
        <p
          className={`${value === "metric" ? "bg-[#302F4A]" : ""} flex items-center justify-between p-2.5 my-2 rounded-lg w-full text-left`}
        >
          <span>km/h</span>
          {value === "metric" ? <UnitCheckMarkIcon /> : null}
        </p>
        <p
          className={`${value === "imperial" ? "bg-[#302F4A]" : ""} flex items-center justify-between p-2.5 rounded-lg w-full text-left`}
        >
          <span>mph</span>
          {value === "imperial" ? <UnitCheckMarkIcon /> : null}
        </p>
      </div>

      {/* Precipitation */}
      <div>
        <h4 className="text-[#ACACB7] px-2.5 text-sm rounded-lg w-full text-left">
          Precipitation
        </h4>
        <p
          className={`${value === "metric" ? "bg-[#302F4A]" : ""} flex items-center justify-between p-2.5 my-2 rounded-lg w-full text-left`}
        >
          <span>Millimeters (mm)</span>
          {value === "metric" ? <UnitCheckMarkIcon /> : null}
        </p>
        <p
          className={`${value === "imperial" ? "bg-[#302F4A]" : ""} flex items-center justify-between p-2.5 rounded-lg w-full text-left`}
        >
          <span>Inches(in)</span>
          {value === "imperial" ? <UnitCheckMarkIcon /> : null}
        </p>
      </div>
    </div>
  );
};

const UnitCheckMarkIcon = () => {
  return (
    <Image src={"/icons/check.svg"} alt="checkmark" width={14} height={17} />
  );
};
