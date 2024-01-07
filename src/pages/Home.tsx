import "../hooks/init";

import React, { useEffect, useState } from "react";

import { About } from "../components/About";
import { DisplayCategory } from "../components/DisplayCategorie";
import { Footer } from "../components/Footer";
import { HeroSection } from "../components/HeroSection";
import { ProductsShowCase } from "../components/ProductsShowCase";
import { Services } from "../components/Services";
import { ShowcaseIntro } from "../components/Showcase";
import Works from "../components/Works";

export const Home = () => {
  return (
    <>
      {/* <Showcase limit={true} /> */}
      <Services />
      {/* <ShowcaseIntro></ShowcaseIntro> */}
      <ProductsShowCase limit={true} />
      {/* <Works /> */}
      {/* <ImagePanel /> */}
      {/* <About /> */}
    </>
  );
};
