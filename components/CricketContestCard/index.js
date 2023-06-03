const CricketContestCard = ({
  parentClassName,
  highestPoints,
  date,
  teamName,
  team1Img,
  team2Img,
  team1Name,
  team2Name,
  teamsCreated,
  status,
  enteredContests,
}) => {
  return (
    <div
      className={`bg-white h-[130px] rounded-md w-full flex flex-col justify-between ${parentClassName}`}
    >
      <div className="px-3 pt-3">
        <div className="flex justify-between items-center space-x-2">
          <div className="text-[12px] flex items-center space-x-4">
            <div className="flex items-center ">
              <div className="font-bold rounded-full w-[35px] h-[35px] p-2 bg-white mr-2 shadow-md shadow-black/20">
                <img
                  src={team1Img}
                  onError={(e) =>
                    !e.target.onerror
                      ? (e.target.src = "/images/tiar_logo_3.svg")
                      : null
                  }
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-black">{team1Name}</p>
            </div>

            <div className="">
              <p className="text-[#A5A5A5]">vs</p>
            </div>

            <div className="flex items-center">
              <div className="font-bold rounded-full w-[35px] h-[35px] p-2 bg-white mr-2 shadow-md shadow-black/20">
                <img
                  src={team2Img}
                  onError={(e) =>
                    !e.target.onerror
                      ? (e.target.src = "/images/tiar_logo_3.svg")
                      : null
                  }
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-black">{team2Name}</p>
            </div>
          </div>

          <div className="text-[10px] rounded p-4 py-1 bg-[#F97F4E]/30 text-black">
            <p>Cricket</p>
          </div>
        </div>

        <div className="text-[10px] flex justify-between items-center opacity-60 text-black py-1">
          <p>{status}</p>
          <p className="whitespace-nowrap">{date}</p>
        </div>
      </div>

      <div>
        <div className="bg-[#F97F4E]/30 flex px-3 py-1 justify-between text-black">
          <div>
            <p className="text-[10px]">Highest Points</p>
            <p className="text-[12px] font-semibold">
              {highestPoints}{" "}
              <span className="text-[8px] ml-2">({teamName})</span>
            </p>
          </div>

          <div className="flex">
            <div className="mr-3">
              <p className="text-[10px]">Entered Contests</p>
              <p className="text-[12px] font-semibold">{enteredContests}</p>
            </div>

            <div>
              <p className="text-[10px]">Teams Created</p>
              <p className="text-[12px] font-semibold">{teamsCreated}</p>
            </div>
          </div>
        </div>

        {/* <div className="px-3 py-1 text-black">
          <p className="text-[8px]">Dream Team: 1000pts</p>
        </div> */}
      </div>
    </div>
  );
};

export default CricketContestCard;
