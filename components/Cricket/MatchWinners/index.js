import { useViewportSize } from "@mantine/hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import Scrollbars from "react-custom-scrollbars-2";
import { BsChevronLeft } from "react-icons/bs";
import { FiBell } from "react-icons/fi";
import { IoTrophyOutline } from "react-icons/io5";
import { profileShuffle } from "../../../helpers/profileShuffle";
import {
  useGetUserProfileDetailsQuery,
  useGetWinnersOfMatchQuery,
} from "../../../store/apis/restApi";
import { getWalletType } from "../../../helpers/getWalletType";

const MatchWinners = ({ slug }) => {
  const router = useRouter();
  const { height: windowHeight } = useViewportSize();

  const { data: userData } = useGetUserProfileDetailsQuery();
  const { data: winnersData } = useGetWinnersOfMatchQuery({ slug: slug });

  return (
    <div>
      {/* Header */}
      <div className="px-5 border-b">
        <div className="flex justify-between items-center h-[30px] my-7 relative">
          <div>
            <BsChevronLeft color="white" onClick={() => router.back()} />
          </div>

          <div className="flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Link href="/">
              <img src="/images/tiar_logo_1.svg" alt="" className="h-[12px]" />
            </Link>
            <p className="font-semibold text-[18px] text-white">
              Fantasy Cricket
            </p>
          </div>

          <div className="flex space-x-3 items-center">
            <FiBell
              size={19}
              color="white"
              onClick={() => router.push("/notifications")}
            />
            <div className="w-[35px] h-[35px] overflow-hidden rounded-full">
              <img
                onError={(e) =>
                  !e.target.onerror
                    ? (e.target.src = "/images/tiar_logo_3.svg")
                    : null
                }
                src={
                  userData?.user_profile?.image
                    ? `${process.env.NEXT_PUBLIC_BACKEND_IMG_BASEURL}${userData?.user_profile?.image}`
                    : profileShuffle()
                }
                className="w-full h-full bg-white"
                alt=""
                onClick={() => router.push(`/profile`)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Match Card */}
      <div className="px-5 mt-5">
        <MatchCard data={winnersData} />
      </div>

      {/* Winners */}
      <div className="px-5 mt-5">
        <Scrollbars style={{ height: `${windowHeight - 250}px` }}>
          {winnersData?.winners?.map((w, idx) => (
            <WinnerCard key={idx} data={w} rank={idx + 1} />
          ))}
        </Scrollbars>
      </div>
    </div>
  );
};

const MatchCard = ({ data }) => {
  return (
    <div className="bg-white w-full rounded-md text-black overflow-hidden">
      <div className="flex text-[10px] px-3 justify-between py-2">
        <p className="text-[#787878]">{data?.description}</p>
        <p>{data?.date?.split("T")[0]}</p>
      </div>

      <div className="flex justify-between items-center px-3 bg-[#EFEFEF] py-2">
        <TeamView
          name={data?.team_1?.team_name}
          sName={data?.team_1?.team_s_name}
          img={data?.team_1?.image_url}
        />
        <p className="text-[10px]">VS</p>
        <TeamView
          right={true}
          name={data?.team_2?.team_name}
          sName={data?.team_2?.team_s_name}
          img={data?.team_2?.image_url}
        />
      </div>
    </div>
  );
};

const TeamView = ({ right, name, sName, img }) => {
  return (
    <div className="text-[14px] w-[40%] shrink-0">
      <h6 className={`${right && "text-end"}`}>{name}</h6>
      <div
        className={`flex  items-center space-x-2 ${
          right && "flex-row-reverse space-x-reverse"
        }`}
      >
        <img src={img} alt="" className="max-w-[33px]" />
        <h6 className="font-semibold">{sName}</h6>
      </div>
    </div>
  );
};

const WinnerCard = ({ data, rank }) => {
  const router = useRouter();
  const handleRedirect = (e) => {
    e.stopPropagation();
    router.push(`/profile/user/${data?.user?.slug}`);
  };

  return (
    <div
      className="bg-white w-full rounded-md overflow-hidden mb-2"
      onClick={handleRedirect}
    >
      <div className="flex items-center space-x-2 py-1 px-3">
        <div className="w-[55px] h-[55px] rounded-full overflow-hidden">
          <img
            src={
              data?.user?.user_profile?.image
                ? `${process.env.NEXT_PUBLIC_BACKEND_IMG_BASEURL}${data?.user?.user_profile?.image}`
                : profileShuffle()
            }
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          {/* <h6 className="text-[16px]">Sudheer54333</h6> */}
          <p className="text-[14px] text-ellipsis">
            {data?.user?.user_profile?.name}
          </p>
          {/* <p className="text-[12px] text-black/60">
            <span className="inline-block relative after:absolute after:right-0 after:bg-white after:content-['#######']">
              {data?.user?.phone_number}
            </span>
          </p> */}
          {/* <p className="text-[12px] text-black/60">Playing Since 2017</p> */}
        </div>
      </div>

      <div className="flex bg-ownOrange px-3 py-1 text-white justify-between">
        <div>
          <p className="text-[12px]">Rank</p>
          <p className="text-[18px]">#{rank}</p>
        </div>

        <div>
          <p className="text-[12px]">Amount Won</p>
          <p className="text-[18px] text-end">
            {data?.price} {getWalletType(data?.coin)?.coin}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2 px-3 py-1">
        <IoTrophyOutline />
        <p className="text-[12px]">
          Won with <span className="font-medium">{data?.won_with}</span>
        </p>
      </div>
    </div>
  );
};

export default MatchWinners;
