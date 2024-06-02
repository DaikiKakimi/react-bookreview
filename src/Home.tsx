import Header from "./Header";
("use client");
import React from "react";
import "./index.css";
import DisplayReview from "./DisplayReview";

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <div className="flex h-screen flex-col items-center justify-center">
        <DisplayReview />
      </div>
    </>
  );
};

export default Home;
