import Link from "next/link";

const GamingContests = (props) => {
  return (
    <div>
      <h1 className="text-white mb-2 mt-2 text-[16px] font-semibold">
        Fantasy Gaming contests
      </h1>

      <div className="flex overflow-x-auto space-x-4 items-center">
        {/* <Card
          title="2022 Asia Cup: Win 5 ETH Everyday"
          img={"/images/banner_38.png"}
          link={"/games/cricket"}
        />

        <Card
          title="Caribbean Premier League"
          img={"/images/banner_37.jpeg"}
          link={"/games/cricket"}
        /> */}

        <Card
          title="ICC T20 World cup 2022"
          img={"/images/banner_39.jpeg"}
          link={"/games/cricket"}
        />

        <Card
          title="The FIFA World Cup Qatar 2022"
          img={"/images/banner_40.jpeg"}
          link={"/games"}
        />

        <Card
          title="Win Crypto and NFT's"
          img={"/images/banner_5.png"}
          link={"/games/cricket"}
        />

        {/* <Link href="/games/cricket">
          <div className="w-[144px] h-[113px] flex-shrink-0 text-[10px] font-semibold rounded-md overflow-hidden bg-[url('/images/frame_3.svg')] p-[1.2px]">
            <img
              src="/images/banner_5.png"
              alt=""
              className="h-[85px] w-full"
            />
            <div className="h-[calc(113px-85px)] flex items-center px-2 rounded-t-md glass-1 text-white">
              <p>Win Crypto Everyday: Crick Fantasy</p>
            </div>
          </div>
        </Link>  */}
      </div>
    </div>
  );
};

const Card = ({ img, title, link }) => {
  return (
    <Link href={link}>
      <div className="relative w-[200px] h-[123px] bg-[url('/images/frame_3.svg')] overflow-hidden rounded-md p-1 flex-shrink-0 text-[10px] font-semibold">
        <img src={img} alt="" className="w-full h-full" />

        <div className="absolute bottom-0 left-0 w-full glass-1 text-white p-2 rounded-t-md">
          <p>{title}</p>
        </div>
      </div>
    </Link>
  );
};

export default GamingContests;
