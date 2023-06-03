import SwipeButton from "../../UI/SwipeButton";

const WelcomeScreen1 = ({ handleCurrentScreen }) => {
  return (
    <div className="min-h-screen py-10 px-5 text-white flex flex-col bg-[url('/images/banner_46.svg')] bg-no-repeat bg-cover">
      <div className="flex-auto grid place-items-center">
        <img src="/images/tiar_logo_5.svg" alt="" />
      </div>
      <div className="">
        <h3 className="text-[34px] font-montserrat font-bold mb-4">
          Winning has a new destination
        </h3>

        <SwipeButton
          title="Swipe to get started"
          onSwipeDone={() => handleCurrentScreen(2)}
          overlayText={`UNLOCK`}
        />
      </div>
    </div>
  );
};

export default WelcomeScreen1;
