import Link from "next/link";
import AliceCarousel from "react-alice-carousel";

const AuthIntro = (props) => {
  const handleDragStart = (e) => e.preventDefault();

  const responsive = {
    0: { items: 2 },
    // 568: { items: 2 },
    // 1024: { items: 3 },
  };

  const items = [
    <img src="/images/intro-card-1.svg" onDragStart={handleDragStart} />,
    <img src="/images/intro-card-2.svg" onDragStart={handleDragStart} />,
    <img src="/images/intro-card-3.svg" onDragStart={handleDragStart} />,
    <img src="/images/intro-card-4.svg" onDragStart={handleDragStart} />,
    <img src="/images/intro-card-5.svg" onDragStart={handleDragStart} />,
    <img src="/images/intro-card-6.svg" onDragStart={handleDragStart} />,
    <img src="/images/intro-card-7.svg" onDragStart={handleDragStart} />,
  ];

  return (
    <div className="flex flex-col items-center py-10 px-5 justify-between min-h-screen bg-[url('/images/banner_45.png')]">
      <div>
        <img src="/images/tiar_logo_5.svg" alt="" />
      </div>

      <div className="w-full text-center flex flex-col space-y-3">
        <AliceCarousel
          mouseTracking
          items={items}
          responsive={responsive}
          autoPlay
          infinite
          disableDotsControls
          disableButtonsControls
          disableSlideInfo
          autoPlayInterval={1200}
        />

        <h3 className="text-[32px] font-bold font-montserrat text-white">
          Play & Win Crypto
        </h3>
        <Link href={"/auth/register"}>
          <button className="border border-ownOrange w-full rounded-md bg-white text-ownOrange font-semibold py-2">
            Register
          </button>
        </Link>
        <p className="text-[14px] text-white">
          Already a player?{" "}
          <Link href={"/auth/login"}>
            <span className="font-semibold">Log-in</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthIntro;
