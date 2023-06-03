import { getWalletType } from "../../../../helpers/getWalletType";

const TournamentChess = (props) => {
  return (
    <div className="text-white px-5 flex flex-col space-y-5 mt-5">
      <div className="flex items-center space-x-2 bg-white/20 rounded-md px-3 py-2 justify-between">
        <img
          src="/images/chess_logo_1.svg"
          alt=""
          srcset=""
          className="w-[29px]"
        />
        <p className="text-[18px] font-semibold">Play Chess Tournaments</p>

        <img
          src="/images/chess_logo_1.svg"
          alt=""
          srcset=""
          className="w-[29px] invisible"
        />
      </div>

      <div className="flex items-center space-x-3 justify-center py-5">
        <TournamentCard />
        <TournamentCard />
      </div>

      <div className="grid place-items-center">
        <button className="border-ownOrange border rounded-xl w-[254px] h-[32px] grid place-items-center font-semibold text-[18px]">
          VIEW ALL
        </button>
      </div>
    </div>
  );
};

const TournamentCard = (props) => {
  return (
    <div className="relative w-[144px] h-[93px] bg-[url('/images/frame_17.png')] bg-cover flex justify-between items-center px-2 text-[16px] font-semibold">
      <img src="/images/chess_piece_black.svg" alt="" />
      <p>4 Rounds</p>
      <img src="/images/chess_piece_white.svg" alt="" />

      <div className="w-[29px] h-[29px] absolute bg-white rounded-md top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black flex flex-col items-center">
        <p className="text-[10px] font-medium">14</p>
        <p className="text-[8px]">WED</p>
      </div>

      <div className="w-[102px] h-[22px] rounded-md overflow-hidden bg-ownOrange absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center ">
        <div
          className="bg-[#E10E16] w-1/2 text-white text-[10px] font-medium grid place-items-center h-full"
          style={{ clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)" }}
        >
          <p>MEGA</p>
        </div>

        <div className="w-1/2 grid place-items-center">
          <div className="font-medium text-[10px] text-white flex items-center space-x-1">
            <img
              src={getWalletType("eth")?.img}
              alt=""
              className="max-h-[10px]"
            />
            <p>10</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentChess;
