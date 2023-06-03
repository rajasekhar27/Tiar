import { RiMoneyDollarCircleFill } from "react-icons/ri";

const CompletedMatchCard = (props) => {
  return (
    <div className="w-full bg-white rounded-md overflow-hidden">
      <div className="bg-gradient-to-r from-[#F97F4E] via-[#F97F4E]  to-[#F5545C] p-1 px-2 flex items-center justify-between">
        <p className="text-[10px] font-medium">
          Your Rank:{" "}
          <span className="text-white text-[16px] font-semibold">1</span>
        </p>

        <div className="flex items-center space-x-1 text-[12px] font-semibold">
          <p>Your Winnings: </p>
          <RiMoneyDollarCircleFill color="white" size={20} />
          <p>$1000</p>
        </div>
      </div>

      <div className="p-1 px-2 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <RiMoneyDollarCircleFill color="#E9983D" size={24} />
          <div>
            <p className="text-[10px] font-medium">Prize Pool</p>
            <p className="text-[12px] font-semibold text-ownOrange">$ 2500</p>
          </div>
        </div>

        <div className="text-[10px] flex flex-col justify-between items-end space-y-3">
          <p>
            Rounds Played: <span className="font-semibold">8</span>
          </p>
          <p>
            Match Id: <span className="font-semibold">023428</span>
          </p>
        </div>
      </div>

      <p className="text-[10px] text-[#8C8C8C] m-1 mx-2">
        12/08/2022, 10:49 PM
      </p>
    </div>
  );
};

export default CompletedMatchCard;
