import { RiTimerLine } from "react-icons/ri";

const LiveMatchesTab = (props) => {
  return (
    <div>
      <div className="px-5">
        <MatchCard
          parentClasses={
            "rounded-md border overflow-hidden border-ownOrange shadow-white"
          }
          parentStyles={{
            boxShadow: "0px 0px 15px 0px rgba(255,255,255,0.6)",
            // -webkit-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.6),
            // -moz-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.6)
          }}
        />
      </div>

      <div className="mt-3">
        {Array(10)
          .fill(10)
          .map((i, idx) => (
            <MatchCard parentClasses={"border-y border-gray-500"} key={idx} />
          ))}
      </div>
    </div>
  );
};

const MatchCard = ({ parentClasses, parentStyles }) => {
  return (
    <div
      className={`w-full min-h-[95px] bg-gradient-to-r to-[#FFFFFF] from-[#15143D] flex items-center px-2 ${parentClasses}`}
      style={parentStyles}
    >
      <div className="flex flex-col items-center space-y-1 flex-1">
        <div className="w-[48px] h-[48px] rounded-full overflow-hidden text-[16px] font-semibold">
          <img
            src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <p>Wardroids #111</p>
      </div>

      <div className="flex-1 flex items-center space-x-2 justify-center">
        <img src="/images/chess_piece_white.svg" alt="" className="h-[20px]" />
        <div className="flex items-center space-x-1">
          <RiTimerLine />
          <p className="text-[14px]">10:42</p>
        </div>
        <img src="/images/chess_piece_black.svg" alt="" className="h-[20px]" />
      </div>

      <div className="flex flex-col items-center space-y-1 flex-1 text-black">
        <div className="w-[48px] h-[48px] rounded-full overflow-hidden text-[16px] font-semibold">
          <img
            src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <p>Wardroids #111</p>
      </div>
    </div>
  );
};

export default LiveMatchesTab;
