import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useGetWardroidsWhitelistCountQuery } from "../../store/apis/restApi";
import { openWhitelistConfirmationPopup } from "../../store/slices/whitelist";

const WardroidsV2 = (props) => {
  const videoRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!videoRef) return;

    videoRef.current.play();
  }, [videoRef]);

  const { data: wardroidsWhitelistCountData } =
    useGetWardroidsWhitelistCountQuery();

  const handleWhitelist = () => {
    dispatch(openWhitelistConfirmationPopup());
  };

  return (
    <div className="">
      {/* <div className="p-5 w-full relative">
        <div className="absolute bottom-5">
          <BsChevronLeft
            color="white"
            onClick={() => router.back()}
            size="30"
          />
        </div>

        <div className="flex flex-col items-center">
          <img src="/images/wardroids_3.png" alt="" className="rounded-full" />
          <img src="/images/wardroids_4.png" alt="" />
        </div>
      </div> */}

      <div className="relative">
        {/* <div className="absolute top-5 z-[1]">
          <BsChevronLeft
            color="white"
            onClick={() => router.back()}
            size="30"
          />
        </div> */}

        <video
          autoPlay
          muted
          ref={videoRef}
          loop
          className="rounded-b-3xl border-b-2 border-ownOrange shadow-md shadow-ownOrange w-full"
        >
          <source src="/videos/wardroids_teaser.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="p-5 text-white">
        <div className="w-full grid place-items-center my-3 mb-4">
          <img src="/images/wardroids_symbol.svg" alt="" className="h-[33px]" />
          <img src="/images/wardroids_5.png" alt="" className="h-[26px]" />

          <h5 className="text-ownOrange font-bold text-[20px] mt-3">
            {wardroidsWhitelistCountData
              ? `${wardroidsWhitelistCountData?.filled} / ${wardroidsWhitelistCountData?.total_count} Claimed!`
              : "X / X Claimed!"}
          </h5>

          <a
            href="https://discord.com/invite/qv8sNb57mW"
            rel="noopener noreferrer"
            target="_blank"
          >
            <button
              className="text-white bg-[url('/images/frame_12.svg')] w-[219px] h-[35px] font-semibold text-[18px] m-auto mt-2"
              // onClick={handleWhitelist}
            >
              Get Whitelisted Now
            </button>
          </a>
        </div>

        <div>
          <p className="text-[14px]">
            NFTs that give ownership of 6 boxing team franchises competing in
            Hellsbay Fight League featuring 36 professional boxers. Wardroids
            are a unique collection of 9000 cybernetic warriors.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 mt-3">
          <StatCard title={"Total Supply"} stat={"9000"} />
          <StatCard title={"Category"} stat={"Utility"} reverse={true} />
          <StatCard title={"Price"} stat={"$ 500"} />
          <StatCard title={"Utility"} stat={"Ownership"} reverse={true} />
        </div>

        <div className="mt-10">
          <p className="text-[18px]">How it Works?</p>
          <InstructionCard step={1} title="Buy Wardroids NFT">
            <div className="flex m-auto space-x-3">
              <div className="h-[80px] w-[80px] bg-green-50 rounded-md">
                <img
                  src="/images/nft_3.jpeg"
                  alt=""
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="h-[80px] w-[80px] bg-green-50 rounded-md">
                <img
                  src="/images/nft_6.png"
                  alt=""
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="h-[80px] w-[80px] bg-green-50 rounded-md">
                <img
                  src="/images/nft_1.jpeg"
                  alt=""
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            </div>
          </InstructionCard>

          <InstructionCard
            step={2}
            reverse={true}
            title="Select the fighters in your team"
          >
            <div className="flex m-auto space-x-3">
              <div className="w-[64px] h-[74px] bg-green-50 rounded-full overflow-hidden">
                <img
                  src="/images/boxer_1.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-[64px] h-[74px] bg-green-50 rounded-full overflow-hidden">
                <img
                  src="/images/boxer_2.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-[64px] h-[74px] bg-green-50 rounded-full overflow-hidden">
                <img
                  src="/images/boxer_3.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </InstructionCard>

          <InstructionCard step={3} title="Support your team as an owner">
            <div className="grid grid-cols-3  m-auto gap-3">
              <div className="h-[80px] w-[80px] grid place-items-center">
                <img src="/images/teams/hyderabad_white.svg" alt="" />
              </div>
              <div className="h-[80px] w-[80px] grid place-items-center">
                <img src="/images/teams/mumbai_white.svg" alt="" />
              </div>
              <div className="h-[80px] w-[80px] grid place-items-center">
                <img src="/images/teams/banglore_white.svg" alt="" />
              </div>
              <div className="h-[80px] w-[80px] grid place-items-center">
                <img src="/images/teams/chennai_white.svg" alt="" />
              </div>
              <div className="h-[80px] w-[80px] grid place-items-center">
                <img src="/images/teams/delhi_white.svg" alt="" />
              </div>
              <div className="h-[80px] w-[80px] grid place-items-center">
                <img src="/images/teams/kolkata_white.svg" alt="" />
              </div>
            </div>
          </InstructionCard>

          <InstructionCard
            step={4}
            reverse={true}
            title="Claim Returns from the Fight League"
          >
            <div className="flex m-auto space-x-3">
              <div className="w-[50px] h-[50px]  rounded-full">
                <img
                  src="/images/crypto_coin_logos/bitcoin.svg"
                  alt=""
                  className="w-full h-full"
                />
              </div>
              <div className="w-[50px] h-[50px]  rounded-full">
                <img
                  src="/images/crypto_coin_logos/ethereum_2.svg"
                  alt=""
                  className="w-full h-full"
                />
              </div>
              <div className="w-[50px] h-[50px]  rounded-full">
                <img
                  src="/images/crypto_coin_logos/solana_2.svg"
                  alt=""
                  className="w-full h-full"
                />
              </div>
              <div className="p-2 w-[50px] h-[50px] bg-white rounded-full">
                <img
                  src="/images/crypto_coin_logos/polygon-matic.svg"
                  alt=""
                  className="w-full h-full"
                />
              </div>
            </div>
          </InstructionCard>
        </div>

        {/* NFT Sneak Peak */}
        <div className="">
          <h5 className="text-[18px] mt-5 mb-2">NFT Sneak Peaks</h5>

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

        <div className="mb-[80px] mt-5">
          <p className="my-3 text-[18px]">Official Links</p>
          <div className="flex items-center justify-between w-full">
            <CardLink
              title={"Website"}
              img={"/images/tiar_logo_1.svg"}
              link="https://tiar.io/"
            />
            <CardLink
              title={"Discord"}
              img={"/images/discord.svg"}
              link="https://discord.com/invite/qv8sNb57mW"
            />
            <CardLink
              title={"Twitter"}
              img={"/images/twitter.svg"}
              link="https://twitter.com/tiarevolution?s=11"
            />
            <CardLink
              title={"Medium"}
              img={"/images/medium.svg"}
              link="https://tiarevolution.medium.com/"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, stat, reverse }) => {
  return (
    <div
      className={`p-3 rounded-md ${
        reverse
          ? "bg-[url('/images/frame_6.svg')]"
          : "bg-[url('/images/frame_5.svg')]"
      }`}
    >
      <h5 className="text-[12px] font-semibold">{title}</h5>
      <h3 className="text-[20px] text-ownOrange font-bold">{stat}</h3>
    </div>
  );
};

const InstructionCard = ({ reverse, step, title, children }) => {
  return (
    <div
      className={`p-3 rounded-sm flex flex-col space-y-2 my-3 ${
        reverse
          ? "bg-[url('/images/frame_8.svg')] items-end"
          : "bg-[url('/images/frame_7.svg')]"
      }`}
    >
      <div
        className={`flex items-center -space-x-4 ${
          reverse ? "flex-row-reverse space-x-reverse" : "flex"
        }`}
      >
        <div className="z-[1] w-[46px] h-[46px] bg-ownBlue1 rounded-full text-ownOrange grid place-items-center text-[18px] border border-ownOrange">
          <p className="z-10">{step}</p>
        </div>

        <div className="w-[20px] h-[30px] bg-ownBlue1 z-[1]"></div>

        <div
          className={
            "w-[110px] h-[32px] bg-ownBlue1 grid place-items-center rounded-md border-ownOrange border"
          }
        >
          <p>Step {step}</p>
        </div>
      </div>

      <p className="text-[14px]">{title}</p>

      {children}
    </div>
  );
};

const CardLink = ({ img, title, link }) => {
  return (
    <a href={link} target={"_blank"} rel="noreferrer">
      <div className="flex flex-col items-center justify-between h-[56px]">
        <img src={img} alt="" className="max-w-[70px] max-h-[30px]" />
        <div className="w-[70px] h-[18px] rounded-full text-[11px] bg-[#272A4B] grid place-items-center border border-ownOrange">
          <p>{title}</p>
        </div>
      </div>
    </a>
  );
};

export default WardroidsV2;
