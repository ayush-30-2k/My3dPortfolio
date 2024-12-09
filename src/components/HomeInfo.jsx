import { Link } from "react-router-dom";

import { arrow } from "../assets/icons";
import { useEffect, useState } from "react";

const HomeInfo = ({ currentStage }) => {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNavbar(true);
    }, 1000); // 5000 milliseconds = 5 seconds

    return () => clearTimeout(timer);
  }, []);
  if (currentStage === 1)
    return (
      showNavbar && (
        <h1 className="sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5">
          Hi, I'm
          <span className="font-semibold mx-2 inline text-white">
            Ayush &nbsp;
          </span>
          <span className="flex justify-center">
            <img
              src="https://raw.githubusercontent.com/MartinHeinz/MartinHeinz/master/wave.gif"
              alt="Waving Hand"
              width="30"
              height="30"
            ></img>
          </span>
          A Software Engineer from India 🇮🇳
        </h1>
      )
    );

  if (currentStage === 2) {
    return (
      showNavbar && (
        <div className="info-box">
          <p className="font-medium sm:text-xl text-center">
            Worked with many Clients <br /> and picked up many skills along the
            way
          </p>

          <Link to="/about" className="neo-brutalism-white neo-btn learnMore">
            <p>Learn more</p>
            <img
              src={arrow}
              alt="arrow"
              className="w-4 h-4 object-contain arrowLink"
            />
          </Link>
        </div>
      )
    );
  }

  if (currentStage === 3) {
    return (
      showNavbar && (
        <div className="info-box">
          <p className="font-medium text-center sm:text-xl">
            Led multiple projects to success over the years. <br /> Curious
            about the impact?
          </p>

          <Link
            to="/projects"
            className="neo-brutalism-white neo-btn learnMore"
          >
            Visit my portfolio
            <img
              src={arrow}
              alt="arrow"
              className="w-4 h-4 object-contain arrowLink"
            />
          </Link>
        </div>
      )
    );
  }

  if (currentStage === 4) {
    return (
      showNavbar && (
        <div className="info-box">
          <p className="font-medium sm:text-xl text-center">
            Need a project done or looking for a dev? <br /> I'm just a few
            keystrokes away
          </p>

          <Link to="/contact" className="neo-brutalism-white neo-btn learnMore">
            Let's talk
            <img
              src={arrow}
              alt="arrow"
              className="w-4 h-4 object-contain arrowLink"
            />
          </Link>
        </div>
      )
    );
  }

  return null;
};

export default HomeInfo;
