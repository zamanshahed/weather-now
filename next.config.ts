import type { NextConfig } from "next";

//note: we don't want any console logs in production
if (process.env.NODE_ENV === "production") {
  console.log = () => {};
  console.debug = () => {};
  console.info = () => {};
  console.warn = () => {};
}

const nextConfig: NextConfig = {
  images: {
    domains: ["openweathermap.org"],
  },
};

export default nextConfig;
