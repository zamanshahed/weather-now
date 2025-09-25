import Image from "next/image";
import React from "react";

type Props = {};

export default function TopSection({}: Props) {
  return (
    <div className="flex justify-between w-full">
      <div className="gap-2.5 flex items-center">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
        <h1 className="text-white text-2xl font-semibold">Weather Today</h1>
      </div>
      <select className="bg-transparent border-none text-white">
        <option className="bg-[#1E1B4B]">Unit</option>
        <option className="bg-[#1E1B4B]" value="C">
          C
        </option>
        <option className="bg-[#1E1B4B]" value="F">
          F
        </option>
      </select>
    </div>
  );
}
