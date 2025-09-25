import Image from "next/image";
import * as React from "react";

export type dayString =
  | "Saturday"
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday";
interface DaySelectorProps {
  value: dayString;
  onChange: (value: dayString) => void;
  dayList: dayString[];
}

const DaySelector: React.FC<DaySelectorProps> = ({
  value,
  onChange,
  dayList,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between select-none bg-[#3C3B5E] hover:outline-2 outline-offset-1 rounded-lg px-4 py-3 text-white font-medium cursor-pointer min-w-[140px]"
      >
        {value}
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
          <div className="w-[214px] p-2 space-y-2 rounded-xl text-white border border-[#3C3B5E] bg-[#262540] shadow-lg font-medium">
            {dayList?.map((day: dayString, index: number) => (
              <button
                key={day + "_" + index}
                onClick={() => {
                  onChange(day);
                  setIsOpen(false);
                }}
                className={`hover:bg-[#302F4A] hover:outline-2 outline-offset-1 p-2.5 rounded-lg w-full text-left cursor-pointer ${value === day ? "bg-[#302F4A]" : ""}`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DaySelector;
