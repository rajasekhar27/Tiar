import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import WelcomeScreens from "../../components/Welcome";

const AuthIntro = dynamic(() => import("../../components/auth/AuthIntro"), {
  ssr: false,
});
const WelcomeScreen1 = dynamic(
  () => import("../../components/Welcome/WelcomeScreen1"),
  {
    ssr: false,
  }
);

const Auth = (props) => {
  const [currentScreen, setCurrentScreen] = useState(1);

  const handleCurrentScreen = (screen) => {
    setCurrentScreen(screen);
  };

  // return (
  //   <>
  //     {currentScreen === 1 && (
  //       <WelcomeScreen1 handleCurrentScreen={handleCurrentScreen} />
  //     )}
  //     {currentScreen === 2 && (
  //       <WelcomeScreens handleCurrentScreen={handleCurrentScreen} />
  //     )}
  //     {currentScreen === 3 && (
  //       <AuthIntro handleCurrentScreen={handleCurrentScreen} />
  //     )}
  //   </>
  // );

  return (
    <>
      <div className="min-h-screen grid place-items-center text-white">
        <div className="flex flex-col items-center space-y-20">
          <img src="/images/tiar_logo_1.svg" alt="" />

          <div className="flex flex-col items-center space-y-5">
            <Link href={"/auth/register"}>
              <button className="w-[150px] h-[37px] bg-ownOrange rounded-sm">
                Register
              </button>
            </Link>

            <div className="text-[12px] text-center">
              <p>Already A User?</p>
              <Link href={"/auth/login"}>
                <p className="font-semibold text-ownOrange">Log In</p>
              </Link>
            </div>
          </div>
        </div>

        <img
          src="/images/tiar_logo_2.svg"
          alt=""
          className="fixed left-0 bottom-0 z-[-1]"
        />
      </div>
    </>
  );
};

export default Auth;
