const WelcomeScreen2 = (props) => {
  return (
    <div className="py-10 px-5 flex flex-col items-center text-white justify-evenly min-h-screen bg-[url('/images/banner_48.png')]">
      <img src="/images/tiar_logo_5.svg" alt="" />

      <img src="/images/card_1.svg" alt="" className="w-full" />
      <img src="/images/card_2.svg" alt="" className="w-full" />

      <div className="w-full">
        <p>Select Your Contest Select Your Contest</p>
        <p>Select Your Contest Select Your Contest</p>
      </div>

      <h3 className="text-[35px] font-bold font-montserrat mb-3">
        Select Your Contest
      </h3>
    </div>
  );
};

export default WelcomeScreen2;
