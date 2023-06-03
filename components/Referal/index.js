import { BsChevronLeft } from "react-icons/bs";
import { useRouter } from "next/router";
import { FaRegCopy } from "react-icons/fa";
import { MdOutlineShare } from "react-icons/md";
import { useClipboard } from "@mantine/hooks";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import AuthInfiniteScrollComponent from "../Generic/AuthInfiniteScrollComponent";
import { useLazyGetReferralLeaderboardQuery } from "../../store/apis/restApi";
import { useViewportSize } from "@mantine/hooks";
import { profileShuffle } from "../../helpers/profileShuffle";
import Loader from "../UI/Loader";
import { useSelector } from "react-redux";

const Referal = (props) => {
  const router = useRouter();

  const clipboard = useClipboard({ timeout: 500 });

  const { data } = useSession();
  const { height: windowHeight } = useViewportSize();

  const token = useSelector((state) => state.auth.accessToken);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Refer a Friend",
          // url: "www.tiar.io",
          // text: `I have gifted you $5 to start playing fantasy cricket on TIAR App. Think you can beat me?\n\n1. Download the TIAR App from here: "www.tiar.io"\n2. Use my invite code ${data?.user?.referal_code}\n3. Get $5 as Crypto Bonus\n\nLet the games begin!`,
          text: `I have gifted you $5 to start playing fantasy cricket on TIAR App. Think you can beat me?\n\n1. Download the TIAR App on Android: https://tiar.io/files/android.apk or on IOS: https://app.tiar.io\n2. Use my invite code ${data?.user?.referal_code}\n3. Get $5 as Crypto Bonus.\n\nLet the games begin!`,
        })
        .then(() => {
          console.log("Thanks for sharing!");
        })
        .catch(console.error);
    } else {
      // fallback
      toast.warning(
        "Looks Like Sharing is not supported in your device.use copy instead"
      );
    }
  };

  const handleCopy = () => {
    clipboard.copy(data?.user?.referal_code);
    toast.success("Copied Referral Code Successfully");
  };

  return (
    <div className="p-5 text-white  relative min-h-screen">
      {/* Img */}
      <img
        src="/images/tiar_logo_2.svg"
        alt=""
        className="fixed bottom-0 left-0 z-[-1]"
      />

      {/* Heading */}
      <div className="w-full relative">
        <div className="absolute">
          <BsChevronLeft color="white" onClick={() => router.back()} />
        </div>

        <img
          src="/images/tiar_logo_1.svg"
          alt=""
          className="max-w-[60px] m-auto"
          onClick={() => router.push("/")}
        />
      </div>

      {/* Referal */}
      <div className="my-5">
        <h5 className="text-ownOrange text-[18px] font-semibold">
          Refer a friend
        </h5>
        {/* <p className="text-[12px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, totam!
          consectetur adipisicing elit. Odit, quasi. Lorem ipsum dolor sit amet.
        </p> */}
      </div>

      {/* Code */}
      <div>
        <h4 className="text-[30px] tracking-[15px]">
          {data?.user?.referal_code}
        </h4>
        <div className="flex space-x-5 mt-2">
          <div
            className="flex text-[12px] items-center space-x-2"
            onClick={handleCopy}
          >
            <FaRegCopy
              size={20}
              color={clipboard.copied ? "white" : "#F97F4E"}
            />
            <p>Copy</p>
          </div>

          <div
            className="flex text-[12px] items-center space-x-2"
            onClick={handleShare}
          >
            <MdOutlineShare className="text-ownOrange" size={20} />
            <p>Share</p>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="mt-4">
        <p className="text-[14px] font-semibold my-2">Leaderboard</p>

        {token && (
          <AuthInfiniteScrollComponent
            height={windowHeight - (20 + 81 + 73 + 21 + 100)}
            itemSize={15}
            lazyHook={useLazyGetReferralLeaderboardQuery}
            customEnd={<></>}
            customLoader={Loader}
          >
            <LeaderBoardCard />
          </AuthInfiniteScrollComponent>
        )}
      </div>
    </div>
  );
};

const LeaderBoardCard = ({ data, idx }) => {
  if (idx === 0) {
    return (
      <LeaderBoardCard1
        name={data?.owner?.name}
        img={data?.owner?.image}
        times={data?.no_of_times}
        rank={idx + 1}
        slug={data?.owner_slug}
      />
    );
  }

  if (idx === 1) {
    return (
      <LeaderBoardCard1
        name={data?.owner?.name}
        img={data?.owner?.image}
        times={data?.no_of_times}
        rank={idx + 1}
        slug={data?.owner_slug}
      />
    );
  }

  if (idx === 2) {
    return (
      <LeaderBoardCard1
        name={data?.owner?.name}
        img={data?.owner?.image}
        times={data?.no_of_times}
        rank={idx + 1}
        slug={data?.owner_slug}
      />
    );
  }

  return (
    <LeaderBoardCard2
      name={data?.owner?.name}
      img={data?.owner?.image}
      times={data?.no_of_times}
      rank={idx + 1}
      slug={data?.owner_slug}
    />
  );
};

const LeaderBoardCard1 = ({ name, times, rank, img, slug }) => {
  const router = useRouter();

  return (
    <div
      className={`${
        rank === 1
          ? "border-[#E9BB45]"
          : rank === 2
          ? "border-white"
          : "border-[#85523D]"
      } border rounded-md flex justify-between p-3 text-[12px] items-center glass-1`}
      onClick={() => router.push(`/profile/user/${slug}`)}
    >
      <div className=" flex items-center space-x-2 ">
        <img src="/images/medal_1.svg" alt="" />
        <p>Top {rank}</p>
        <img
          onError={(e) =>
            !e.target.onerror
              ? (e.target.src = "/images/tiar_logo_3.svg")
              : null
          }
          src={
            img
              ? `${process.env.NEXT_PUBLIC_BACKEND_IMG_BASEURL}${img}`
              : profileShuffle()
          }
          alt=""
          className="w-[27px] h-[27px] object-cover bg-white rounded-full"
        />
        <p>#{name}</p>
      </div>

      <div>
        <p>
          Referred: <span className="font-semibold">{times}</span>
        </p>
      </div>
    </div>
  );
};

const LeaderBoardCard2 = ({ name, times, rank, img, slug }) => {
  const router = useRouter();

  return (
    <div
      className="bg-white rounded-md mt-2 text-black flex justify-between items-center px-3 py-1 text-[12px]"
      onClick={() => router.push(`/profile/user/${slug}`)}
    >
      <div className=" flex items-center space-x-2 ">
        <p>{rank?.toString().length <= 1 ? `0${rank}` : rank}.</p>
        <img
          onError={(e) =>
            !e.target.onerror
              ? (e.target.src = "/images/tiar_logo_3.svg")
              : null
          }
          src={
            img
              ? `${process.env.NEXT_PUBLIC_BACKEND_IMG_BASEURL}${img}`
              : profileShuffle()
          }
          alt=""
          className="w-[27px] h-[27px] object-cover bg-white rounded-full border border-black"
        />
        <p>#{name}</p>
      </div>

      <div>
        <p>
          Referred: <span className="font-semibold">{times}</span>
        </p>
      </div>
    </div>
  );
};

export default Referal;
