const WelcomeScreen3 = (props) => {
  return (
    <div className="py-10 px-5 flex flex-col items-center text-white justify-evenly min-h-screen bg-[url('/images/banner_47.png')]">
      <img src="/images/tiar_logo_5.svg" alt="" />

      <img src="/images/card_3.svg" alt="" className="w-full max-h-[277px]" />
      {/* <img src="/images/card_2.svg" alt="" className="w-full" /> */}

      <div className="w-full">
        <p>Create Your Team Create Your Team</p>
        <p>Create Your Team Create Your Team</p>
      </div>

      <h3 className="text-[35px] font-bold font-montserrat mb-3">
        Create Your Contest
      </h3>
    </div>
  );
};

export default WelcomeScreen3;
