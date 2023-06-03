import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import { useGetCurrentPlayersCountQuery } from "../../../store/apis/restApi";

const GameCard = ({ img, gameName, playerCount, route, isLive, short }) => {
  const { data: currentPlayersCountData } = useGetCurrentPlayersCountQuery();

  return (
    <Link href={route}>
      <div
        className={`w-full ${
          short ? "h-[128px]" : "h-[284px]"
        } rounded-md overflow-hidden relative p-[2px] bg-gradient-to-b from-[#F47F4F] to-[#3E00FF]`}
      >
        <img
          src={img}
          alt=""
          className="w-full h-full object-cover rounded-md"
        />

        <div className="absolute bottom-[2px] h-[30px] w-full glass-1 rounded-t-lg flex items-center justify-between px-3 py-1 rounded-b-sm mx-[2px] left-1/2 -translate-x-1/2">
          <h5 className="font-semibold text-[18px] text-white ">{gameName}</h5>

          <div className="flex items-center space-x-1 text-white">
            <AiOutlineUser color="white" size={20} />
            <p className="text-[16px] font-semibold">{playerCount}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
