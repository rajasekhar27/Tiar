import { RiMoneyDollarCircleFill } from "react-icons/ri";

const WinnersCard = (props) => {
  return (
    <div className="w-full rounded-md bg-white border-2 border-ownOrange p-2 font-medium pb-3">
      <div className="text-[10px] flex items-center">
        <div className="w-[33.3333%]">
          <p>
            Match Id: <span className="text-[#08C508]">023456</span>
          </p>
        </div>

        <div className="w-[33.3333%] text-center text-[#787878]">
          <p>Chess Tournament</p>
        </div>

        <div className="w-[33.3333%] text-end">
          <p>12 Sep,2022</p>
        </div>
      </div>

      <div className="flex items-center justify-between my-2">
        <div className="flex items-center space-x-2">
          <img src="/images/chess_logo_1.svg" alt="" />
          <div>
            <p className="text-[10px] font-medium">Prize Pool</p>
            <div className="flex items-center space-x-1 mt-1">
              <RiMoneyDollarCircleFill color="#E9983D" size={20} />
              <p className="text-[16px] font-semibold">1000</p>
            </div>
          </div>
        </div>

        <div className="text-[10px] flex flex-col space-y-2 items-end">
          <p>
            Rounds: <span className="font-semibold">8</span>
          </p>
          <p>
            Time/Round: <span className="font-semibold">5mins</span>
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3 justify-center">
        <RankCard rank={1} />
        <RankCard rank={2} />
        <RankCard rank={3} />
      </div>
    </div>
  );
};

const RankCard = ({ rank }) => {
  const rankColors = {
    1: " from-[#E89B05] to-[#D39B0C]",
    2: " from-[#D2E2E7] to-[#96B0B8]",
    3: " from-[#D07C30] to-[#723E0D]",
  };

  return (
    <div
      className={`rounded-md w-[95px] bg-gradient-to-br ${rankColors[rank]} flex flex-col overflow-hidden`}
    >
      <div className="flex-auto px-2 py-1">
        <h5 className="text-[14px] font-medium">Rank #{rank}</h5>
        <p className="text-ellipsis max-w-[90px] overflow-hidden text-[11px]">
          Premtej235781
        </p>

        <div className="w-[50px] h-[50px] rounded-full overflow-hidden m-auto my-1">
          <img
            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
      </div>

      <div className="bg-gradient-to-b to-[#35398E] from-[#7e82cf] text-center py-1">
        <p className="text-white font-semibold text-[14px]">Won $2.25</p>
      </div>
    </div>
  );
};

export default WinnersCard;
