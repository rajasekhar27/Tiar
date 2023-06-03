import { BsChevronDown } from "react-icons/bs";
import { AiOutlineArrowUp } from "react-icons/ai";

const PlayerStat = ({ data }) => {
  return (
    <div className="w-full h-[94px] bg-white rounded-md p-3 mt-2">
      <div className="border-b-[2px] border-ownBlue1 flex justify-between py-1">
        <div className="flex text-[14px] space-x-3">
          <p className="font-medium">
            VS{" "}
            <span className="font-medium text-ownOrange">
              {data?.other_team?.team_s_name}
            </span>
          </p>
          <p>{data?.date.split("T")[0]}</p>
        </div>

        <div>
          <BsChevronDown />
        </div>
      </div>

      <div className="flex justify-between py-2">
        <div className="text-[10px]">
          <p className="text-ownOrange">Selected by</p>
          <p>{data?.selected_by}%</p>
        </div>

        <div className="text-[10px] text-center">
          <p className="text-ownOrange">Points</p>
          <p>{data?.points}</p>
        </div>
        <div className="text-[10px] text-center">
          <p className="text-ownOrange">Credits</p>
          <p className="flex items-center space-x-2">
            {data?.credits}{" "}
            <span>
              <AiOutlineArrowUp color="#00B929" />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlayerStat;
