import { RiMoneyDollarCircleFill } from "react-icons/ri";
import ProgressBar from "@ramonak/react-progress-bar";

const UpcomingMatchCard = (props) => {
  return (
    <div className="w-full rounded-md bg-white flex overflow-hidden">
      <div className="w-[80%] p-2 flex flex-col space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <RiMoneyDollarCircleFill color="#E9983D" size={24} />
            <div>
              <p className="text-[10px] font-medium">Prize Pool</p>
              <p className="text-[12px] font-semibold text-ownOrange">$ 2500</p>
            </div>
          </div>

          <div className="text-[10px] flex flex-col justify-between items-end space-y-2">
            <p>
              Rounds: <span className="font-semibold">8</span>
            </p>
            <p>
              Time/Round: <span className="font-semibold">5mins</span>
            </p>
          </div>
        </div>

        <div>
          <ProgressBar
            completed={50}
            height={"5px"}
            isLabelVisible={false}
            bgColor={"black"}
          />
          <div className="flex items-center justify-between text-[12px] font-medium">
            <p>56</p>
            <p className="text-[#767890]">256</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-[12px] font-semibold">
          <div className="flex items-center space-x-1">
            <img src="/images/medal_2.svg" alt="" />
            <p>$1000</p>
          </div>
          <div className="flex items-center space-x-1">
            <img src="/images/medal_3.svg" alt="" />
            <p>$800</p>
          </div>
          <div className="flex items-center space-x-1">
            <img src="/images/medal_4.svg" alt="" />
            <p>$600</p>
          </div>
        </div>
      </div>

      <div className="w-[20%] bg-ownOrange h-[75%] rounded-bl-md p-2 space-y-2 flex flex-col justify-between text-white items-center">
        <p className="text-[12px] font-medium max-w-[60%] text-center">
          Entry Fee
        </p>
        <h5 className="text-[18px] font-semibold">$10</h5>
      </div>
    </div>
  );
};

export default UpcomingMatchCard;
