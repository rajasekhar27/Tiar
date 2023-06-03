import ProgressBar from "@ramonak/react-progress-bar";
import moment from "moment/moment";
import { useGetCareerStatsQuery } from "../../../store/apis/restApi";

const CareerStats = (props) => {
  const { data: careerStatsData } = useGetCareerStatsQuery();

  return (
    <div>
      <h1 className="text-[16px] font-semibold text-white my-3">
        Career Stats
      </h1>

      <div className="career-stats-grid">
        <div className="bg-[url('/images/frame_16.svg')] h-[62px] p-3 career-stat-1">
          <p className="text-[12px] text-ownOrange">Win Rate</p>

          <div className="flex items-center space-x-3 pr-5">
            <p className="text-[12px] font-semibold text-white">
              {careerStatsData?.win_rate}%
            </p>
            <div className="w-full">
              <ProgressBar
                completed={
                  careerStatsData?.win_rate ? careerStatsData?.win_rate : 0
                }
                height={"7px"}
                isLabelVisible={false}
                bgColor={"#FB6D3A"}
                baseBgColor={"#F1C8B7"}
              />
            </div>
          </div>
        </div>

        <div className="bg-[url('/images/frame_19.svg')] w-full h-[62px] p-3 career-stat-2">
          <p className="text-[12px] text-ownOrange">Fantasy Contests</p>
          <p className="text-[12px] text-white">
            {careerStatsData?.fantasy_contests_played}
          </p>
        </div>

        <div className="bg-[url('/images/frame_19.svg')] w-full h-[62px] p-3 career-stat-3">
          <p className="text-[12px] text-ownOrange">Chess Games</p>
          <p className="text-[12px] text-white">
            {careerStatsData?.chess_games_played}
          </p>
        </div>

        <div className="bg-[url('/images/frame_19.svg')] w-full h-[62px] p-3 career-stat-4">
          <p className="text-[12px] text-ownOrange">Time Spent</p>
          <p className="text-[12px] text-white">
            {careerStatsData?.time_spent} Hrs
          </p>
        </div>

        <div className="bg-[url('/images/frame_18.svg')] h-[62px] p-3 career-stat-5">
          <p className="text-[12px] text-ownOrange">Playing Since</p>
          <p className="text-[12px] text-white">
            {careerStatsData?.playing_since &&
              moment(careerStatsData?.playing_since).format("Do MMM YYYY")}
          </p>
        </div>

        <div className="bg-[url('/images/frame_19.svg')] h-[62px] p-3 career-stat-6">
          <p className="text-[12px] text-ownOrange">NFT's Won</p>
          <p className="text-[12px] text-white">{careerStatsData?.nft_won}</p>
        </div>
      </div>
    </div>
  );
};

export default CareerStats;
