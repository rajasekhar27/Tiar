import { IoMenu } from "react-icons/io5";
import { RiArrowGoForwardFill, RiArrowGoBackFill } from "react-icons/ri";
import { MdOutlineTimer } from "react-icons/md";
import { BsChatSquareText } from "react-icons/bs";
import { Chessboard } from "react-chessboard";
import { useViewportSize } from "@mantine/hooks";

const GameArena = (props) => {
  const { width: windowWidth } = useViewportSize();

  return (
    <div className="text-white px-5 flex flex-col min-h-screen pb-[60px]">
      <h1 className="text-center text-[24px] font-medium my-5">Live Chess</h1>

      <div className="flex-auto flex flex-col justify-center space-y-10 ">
        {/* Chess Board */}
        <div>
          <Chessboard
            id="BasicBoard"
            boardWidth={(windowWidth < 450 ? windowWidth : 450) - 40}
          />
        </div>

        <div className="flex flex-initial max-h-min items-center justify-evenly w-full">
          <PlayerCard />
          <h1 className="text-[40px] font-semibold italic text-ownOrange">
            VS
          </h1>
          <PlayerCard />
        </div>
      </div>

      {/* Options tab */}
      <div className="fixed bottom-0 left-0 rounded-t-lg bg-white/20 w-full h-[60px] flex items-center justify-evenly max-w-[450px]">
        <div className="flex flex-col items-center">
          <IoMenu size={30} />
          <p className="text-[10px] font-medium">Options</p>
        </div>
        <div className="flex flex-col items-center">
          <BsChatSquareText size={25} />
          <p className="text-[10px] font-medium">Chat</p>
        </div>
        <div className="flex flex-col items-center">
          <RiArrowGoBackFill size={25} />
          <p className="text-[10px] font-medium">Last Move</p>
        </div>
        <div className="flex flex-col items-center">
          <RiArrowGoForwardFill size={25} />
          <p className="text-[10px] font-medium">Current</p>
        </div>
      </div>
    </div>
  );
};

const PlayerCard = () => {
  return (
    <div className="flex flex-col items-center space-y-1 ">
      <h5 className="text-[14px] font-semibold text-[#AEAEAE]">
        Wardroid #111
      </h5>

      <img src="/images/wardoids_frame_1.svg" alt="" />

      <div className="flex items-center space-x-1">
        <MdOutlineTimer color={"#AEAEAE"} />

        <p className="text-[14px] font-semibold text-[#AEAEAE]">09:12</p>
      </div>
    </div>
  );
};

export default GameArena;
