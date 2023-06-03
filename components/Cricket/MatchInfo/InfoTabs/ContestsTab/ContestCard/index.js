import { FaEthereum } from "react-icons/fa";
import { GiTrophyCup } from "react-icons/gi";
import ProgressBar from "@ramonak/react-progress-bar";
import { useRouter } from "next/router";
import { openUserSelectedTeamsPopup } from "../../../../../../store/slices/games";
import { useDispatch } from "react-redux";
import { BsCheck2Circle } from "react-icons/bs";
import { getWalletType } from "../../../../../../helpers/getWalletType";

const ContestCard = ({
  data,
  hideLink,
  otherData,
  showViewTeams,
  join,
  joinClick,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // const remainingSpotsPercentage =
  //   (data?.no_of_spots / data?.total_spots) * 100;

  const remainingSpotsPercentage =
    ((data?.total_spots - data?.no_of_spots) / data?.total_spots) * 100;

  const handleRouteChange = () => {
    if (!hideLink) {
      router.push(`/games/cricket/contest/${data?.slug}`);
    }
  };

  const handleViewTeams = (e) => {
    e.stopPropagation();
    if (!otherData) return;
    dispatch(openUserSelectedTeamsPopup(otherData?.slug));
  };

  return (
    <div
      className="h-[125px] w-full bg-white rounded-md overflow-hidden flex text-black"
      onClick={handleRouteChange}
    >
      <div className="w-full flex flex-col justify-between p-3 ">
        <div className="flex justify-between">
          <div className="flex ">
            <img
              src={getWalletType(data?.coin)?.img}
              alt=""
              className="h-[25px] w-[25px]"
            />
            <div className="">
              <p className="text-[8px]">Prize Pool</p>
              <p className="text-[12px] text-ownOrange font-semibold">
                {data?.prize_pool_string}
              </p>
            </div>
          </div>

          {showViewTeams && (
            <p
              className="text-[10px] whitespace-nowrap text-green-500 font-bold"
              onClick={(e) => handleViewTeams(e)}
            >
              View My Teams
            </p>
          )}
        </div>

        <div>
          <ProgressBar
            completed={remainingSpotsPercentage}
            height={"5px"}
            isLabelVisible={false}
            bgColor={"#FB6D3A"}
          />
          <div className="flex justify-between text-[10px]">
            <p className="text-ownOrange">{data?.no_of_spots} spots left</p>
            <p className="text-gray-400">{data?.total_spots} spots</p>
          </div>
        </div>

        <div className="flex space-x-3 items-center">
          <Stat
            icon={<FaEthereum color="green" />}
            description={data?.winnings?.price}
          />
          <Stat
            icon={<GiTrophyCup color="orange" />}
            description={`${data?.winnings_percentage}%`}
          />
          <Stat
            icon={
              <div className="text-[10px] rounded-full w-[15px] h-[15px] border border-black grid place-items-center">
                <p>{data?.type === "SINGLE" ? "S" : "M"}</p>
              </div>
            }
            description={`upto ${data?.entries}`}
          />

          <Stat
            icon={
              // <div className="text-[10px] rounded-full w-[15px] h-[15px] border border-black grid place-items-center">
              //   <p>{data?.type === "SINGLE" ? "S" : "M"}</p>
              // </div>
              <>
                {data?.price_pool_type === "GUARANTEE" && (
                  <BsCheck2Circle color="green" />
                )}
              </>
            }
            description={`${data?.price_pool_type}`}
          />
        </div>
      </div>

      <div
        className="h-4/5 bg-ownOrange p-3 rounded-bl-md w-[60px] flex flex-col items-center text-[12px]"
        onClick={joinClick ? joinClick : () => {}}
      >
        {join ? (
          <>{join}</>
        ) : (
          <>
            <p>Entry</p>
            <p>Fee</p>
          </>
        )}
        <p className="uppercase text-[10px] flex items-center line-through whitespace-nowrap">
          {/* <span>
            <TbCurrencyRupee />
          </span> */}
          {data?.actual_entry_fee} {data?.coin}
        </p>
        <p className="uppercase font-semibold text-[12px] flex items-center whitespace-nowrap">
          {/* <span>
            <TbCurrencyRupee />
          </span> */}
          {data?.discount_entry_fee} {data?.coin}
        </p>
      </div>
    </div>
  );
};

const Stat = ({ icon, description }) => {
  return (
    <div className="flex items-center space-x-2">
      {icon}
      <p className="text-[9px]">{description}</p>
    </div>
  );
};

export default ContestCard;
