import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import { useGetCurrentPlayersCountQuery } from "../../store/apis/restApi";

const GameCard = ({ img, gameName, playerCount, route, isLive }) => {
  const { data: currentPlayersCountData } = useGetCurrentPlayersCountQuery();

  return (
    <Link href={route}>
      <div
        className={`flex flex-col bg-white overflow-hidden text-black items-center rounded-md pb-1`}
      >
        <div className="h-[110px] w-full relative">
          <img src={img} alt="" className="w-full h-full object-cover" />

          {!isLive && (
            <div className="absolute bottom-0 left-0 right-0 w-full glass-1 text-white rounded-t-md py-1 text-center">
              <p className="text-[12px]">Coming soon</p>
            </div>
          )}
        </div>
        <div className="flex w-full justify-between px-3">
          <h6 className="text-[12px] mt-2 font-semibold">{gameName}</h6>
          {isLive && (
            <div className="flex items-center space-x-1">
              <AiOutlineUser size={17} color={"#F97F4E"} />
              <p className="text-[12px] pt-1">
                {currentPlayersCountData?.number_of_members_paricipated}
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
