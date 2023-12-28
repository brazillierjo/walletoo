"use client";

import { Hero } from "@/src/components/Home/Hero";
import { Privacy } from "@/src/components/Home/Privacy";
import { Services } from "@/src/components/Home/Services";

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Services />
      <Privacy />
    </>
  );
};

export default Home;
