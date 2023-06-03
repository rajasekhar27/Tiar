import { BsChevronLeft } from "react-icons/bs";
import { useRouter } from "next/router";
import { FiHeart } from "react-icons/fi";
import { BiShareAlt } from "react-icons/bi";

const Wardroids = (props) => {
  const router = useRouter();

  return (
    <div className="p-5 text-white pb-[85px]">
      {/* Heading */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <BsChevronLeft color="white" onClick={() => router.back()} />
          <p className="text-[18px] font-semibold">Latest Release</p>
        </div>

        <div className="flex space-x-3 items-center">
          <FiHeart />
          <BiShareAlt />
        </div>
      </div>

      <div className="flex items-center justify-between my-3">
        <div className="flex items-center space-x-5 text-[18px] font-semibold">
          <img
            src="/images/wardroids_1.png"
            alt=""
            className="w-[70px] h-[70px] rounded-full object-cover"
          />
          <h5>Wardroids</h5>
        </div>

        <button className="w-[72px] h-[26px] bg-ownOrange rounded-full text-[14px]">
          Whitelist
        </button>
      </div>

      <div className="my-5">
        <p className="text-[14px]">
          NFTs that give ownership of 6 boxing team franchises competing in
          Hellsbay Fight League featuring 36 professional boxers. Wardroids are
          a unique collection of 9000 cybernetic warriors.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-y-3 gap-x-5">
        <StatCard title={"Total Supply"} stat={"9000"} />
        <StatCard title={"Category"} stat={"Utility"} />
        <StatCard title={"Price"} stat={"$ 500"} />
        <StatCard title={"Utility"} stat={"Ownership & P2W"} />
      </div>

      {/* Official Links */}
      <div className="mt-5">
        <h5 className="text-[18px] font-semibold">Official Links</h5>

        <div className="flex justify-between my-2">
          <a
            href="https://tiar.io/"
            target={"_blank"}
            rel={"noreferrer"}
            className="w-[70px] h-[18px] rounded-full glass-1 grid place-items-center text-[11px]"
          >
            Website
          </a>
          <a
            href="https://discord.com/invite/qv8sNb57mW"
            target={"_blank"}
            rel={"noreferrer"}
            className="w-[70px] h-[18px] rounded-full glass-1 grid place-items-center text-[11px]"
          >
            Discord
          </a>
          <a
            href="https://twitter.com/tiarevolution?s=11"
            target={"_blank"}
            rel={"noreferrer"}
            className="w-[70px] h-[18px] rounded-full glass-1 grid place-items-center text-[11px]"
          >
            Twitter
          </a>
          <div className="w-[70px] h-[18px] rounded-full glass-1 grid place-items-center text-[11px]">
            Opensea
          </div>
        </div>
      </div>

      {/* NFT Sneak Peak */}
      <div className="">
        <h5 className="text-[18px] font-semibold mt-5 mb-2">NFT Sneak Peaks</h5>

        <div className="grid m-auto grid-cols-3 gap-2">
          <div className="w-[100px] h-[100px]  rounded-md overflow-hidden bg-white p-[1px]">
            <img
              src="/images/nft_2.png"
              alt=""
              className="w-full h-full object-cover rounded-md"
            />
          </div>

          <div className="w-[100px] h-[100px]  rounded-md p-[1px] bg-white">
            <img
              src="/images/nft_4.png"
              alt=""
              className="w-full h-full object-cover rounded-md"
            />
          </div>

          <div className="w-[100px] h-[100px]  rounded-md p-[1px] bg-white">
            <img
              src="/images/nft_6.png"
              alt=""
              className="w-full h-full object-cover rounded-md"
            />
          </div>

          <div className="w-[100px] h-[100px] rounded-md p-[1px] bg-white">
            <img
              src="/images/nft_1.jpeg"
              alt=""
              className="w-full h-full object-cover rounded-md"
            />
          </div>

          <div className="w-[100px] h-[100px]  rounded-md p-[1px] bg-white">
            <img
              src="/images/nft_3.jpeg"
              alt=""
              className="w-full h-full object-cover rounded-md"
            />
          </div>

          <div className="w-[100px] h-[100px] rounded-md bg-white p-[1px]">
            <img
              src="/images/nft_5.jpeg"
              alt=""
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, stat }) => {
  return (
    <div className="p-3 rounded-md bg-[url('/images/frame_2.svg')]">
      <h5 className="text-[12px] font-semibold">{title}</h5>
      <h3 className="text-[20px] text-ownOrange font-bold">{stat}</h3>
    </div>
  );
};

export default Wardroids;
