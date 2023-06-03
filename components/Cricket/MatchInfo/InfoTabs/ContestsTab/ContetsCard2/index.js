import { BsTrophy, BsCheck2Circle } from "react-icons/bs";
import ProgressBar from "@ramonak/react-progress-bar";
import { useRouter } from "next/router";
import { getWalletType } from "../../../../../../helpers/getWalletType";
import { toast } from "react-toastify";

const ContestCard2 = ({
  data,
  hideLink,
  hideEnter,
  myContestInfoRoute,
  matchSlug,
}) => {
  const router = useRouter();

  const remainingSpotsPercentage =
    ((data?.total_spots - data?.no_of_spots) / data?.total_spots) * 100;

  const handleRouteChange = () => {
    // if (!data?.user_spots_status) {
    //   toast.error("You have reached your spots limit!");
    //   return;
    // }

    if (!hideLink) {
      myContestInfoRoute
        ? router.push(`/games/my-contests/${matchSlug}/view/${data?.slug}`)
        : router.push(`/games/cricket/contest/${data?.slug}`);
    }
  };

  return (
    <div
      className={`bg-white w-full rounded-md overflow-hidden  animate__animated animate__flipInX`}
      // ${
      //   data?.user_spots_status === false && "opacity-50"
      // }
      onClick={handleRouteChange}
    >
      <div className="p-3 flex items-end space-x-3">
        <div
          className={`${
            hideEnter ? "w-full" : "w-[calc(100%-12px-80px)]"
          } flex flex-col justify-between h-full space-y-5`}
        >
          <div className="flex space-x-3">
            <img
              src={getWalletType(data?.coin)?.img}
              alt=""
              className="max-w-[20px] max-h-[20px]"
            />
            <div>
              <p className="text-[#9F9F9F] text-[10px]">Prize Pool</p>
              <p className="text-ownOrange text-[12px]">
                {data?.prize_pool_string}
              </p>
            </div>
          </div>

          <div className="">
            <ProgressBar
              completed={remainingSpotsPercentage}
              height={"5px"}
              isLabelVisible={false}
              bgColor={"#000000"}
            />
            <div className="flex justify-between text-[10px]">
              <p className="text-black">{data?.no_of_spots} spots left</p>
              <p className="text-gray-400">{data?.total_spots} spots</p>
            </div>
          </div>
        </div>

        {!hideEnter && (
          <div className="w-[80px] text-[#9F9F9F] h-[44px] rounded-md p-3 flex flex-col items-center justify-center text-[12px]">
            <p>Entry</p>
            <div className="flex items-center space-x-1">
              <img
                src={getWalletType(data?.coin)?.img}
                alt=""
                className="h-[12px]"
              />
              <p className="font-semibold">{data?.discount_entry_fee}</p>
            </div>
          </div>
        )}
      </div>

      <div className="w-full flex justify-between p-1 px-5 bg-[#DCDDDC]">
        <Stat
          stat={`${data?.first_prize_percentage} ${getWalletType(
            data?.coin
          )?.coin.toUpperCase()}`}
        >
          <div className="w-[12px] h-[12px] rounded-full border border-black">
            <p className="text-[6px] text-ownGreen2">1st</p>
          </div>
        </Stat>
        <Stat stat={`${data?.winnings_percentage}%`}>
          <BsTrophy color="#B18512" size={10} />
        </Stat>
        <Stat stat={`Upto ${data?.entries}`}>
          <div className="w-[12px] h-[12px] rounded-full border border-black grid place-items-center">
            <p className="text-[6px] text-black">
              {data?.type === "SINGLE" ? "S" : "M"}
            </p>
          </div>
        </Stat>
        <Stat stat={data?.price_pool_type}>
          {data?.price_pool_type === "GUARANTEE" && (
            <BsCheck2Circle color="#097907" />
          )}
        </Stat>
      </div>

      <div className="text-[12px] flex justify-between px-5 items-center bg-ownOrange/50 py-1 text-black">
        <h6 className="uppercase">
          {data?.leaderboard?.name} ({data?.leaderboard?.team})
        </h6>
        <div className="flex items-center space-x-1">
          <p className="text-[#424242]">Points {data?.leaderboard?.points}</p>
          <p>Rank #{data?.leaderboard?.rank}</p>
        </div>
      </div>
    </div>
  );
};

const Stat = ({ children, stat }) => {
  return (
    <div className="flex items-center space-x-1">
      {children}
      <p className="text-[10px] text-black">{stat}</p>
    </div>
  );
};

export default ContestCard2;
