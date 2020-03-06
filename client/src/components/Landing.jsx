import React from "react";
import { Menu } from "./landing/Menu";
import { Banner } from "./landing/Banner";

const Landing = props => {
  return (
    <div className="landing">
      <Menu />
      <Banner />
    </div>
  );
};

export default Landing;
