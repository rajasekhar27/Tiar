import { useState } from "react";
import { useEffect } from "react";
import { Transition } from "@headlessui/react";

const DesktopPreview = ({ children }) => {
  const [slide, setSlide] = useState(1);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide(getRandomInt(1, 10));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hidden md:flex min-h-screen w-full">
      <div className="max-w-[450px] w-full bg-ownBlue1">{children}</div>
      <div className="fixed bottom-0 right-0 top-0 left-0 z-[-2] flex">
        <div className="w-[450px]"></div>
        <div className="w-[calc(100vw-450px)]">
          <img
            src={`/images/desktop_banners/${slide}.jpeg`}
            alt=""
            className="w-full h-full object-cover animate-pulse"
          />
        </div>
      </div>
    </div>
  );
};

export default DesktopPreview;
