import { RiMoneyDollarCircleFill } from "react-icons/ri";

const TournamentDashboard = (props) => {
  return (
    <div className="min-h-screen text-white">
      <div className="flex items-center justify-between px-5">
        <TopPositionCard />
        <div className="mb-20">
          <TopPositionCard />
        </div>
        <TopPositionCard />
      </div>

      <div>
        <table className="w-full text-[12px] font-medium">
          <tr className="bg-black/10">
            <th className="text-start pl-5">Rank</th>
            <th className="text-start">Name</th>
            <th className="text-start">Score</th>
            <th className="text-end pr-5">Winnings</th>
          </tr>

          {Array(10)
            .fill(10)
            .map((i, idx) => (
              <tr className=" bg-white/20" key={idx}>
                <td className="text-start pl-5 py-2">#4</td>
                <td className="text-start">Wardroids#111</td>
                <td className="text-start">138</td>
                <td className="text-end pr-5">₹ 1000</td>
              </tr>
            ))}
        </table>
      </div>
    </div>
  );
};

const TopPositionCard = () => {
  return (
    <div className=" flex flex-col items-center">
      <img src="/images/wardoids_frame_1.svg" alt="" />

      <h5 className="text-[14px] font-semibold">Wardroid #111</h5>
      <p className="text-[16px] font-light text-[#888888]">
        Score: <span className="font-semibold text-white">150</span>
      </p>
      <div className="flex items-center space-x-1 font-semibold text-[14px]">
        <RiMoneyDollarCircleFill color="#E9983D" size={20} />
        <p>1000</p>
      </div>
    </div>
  );
};

export default TournamentDashboard;
