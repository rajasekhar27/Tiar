import { useState } from "react";
import WelcomeScreen2 from "./WelcomeScreen2";
import WelcomeScreen3 from "./WelcomeScreen3";

const WelcomeScreens = ({ handleCurrentScreen }) => {
  const [current, setCurrent] = useState(0);

  const items = [<WelcomeScreen2 />, <WelcomeScreen3 />];

  const handleNext = () => {
    if (items.length - 1 === current) {
      handleCurrentScreen(3);
      return;
    }

    setCurrent(current + 1);
  };

  const handleSkip = () => {
    handleCurrentScreen(3);
  };

  return (
    <div className="relative">
      {items[current]}

      <div className="absolute bottom-0 py-8 flex items-center justify-between w-full px-5">
        <p className="flex-1 text-[16px] text-white" onClick={handleSkip}>
          Skip
        </p>
        <div className="flex-[2] flex items-center space-x-2 justify-center">
          {Array(items.length)
            .fill(items.length)
            .map((i, idx) => (
              <div
                className={`w-[10px] h-[10px] rounded-full ${
                  current === idx ? "bg-ownOrange" : "bg-white"
                }`}
              ></div>
            ))}
        </div>
        <div className="flex-1 flex justify-end">
          <button
            className="bg-white text-ownOrange text-[20px] font-semibold rounded-md px-2"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreens;
