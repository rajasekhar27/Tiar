import { fightClubsData } from "../../../data/hellsbayData";

const StatsTab = (props) => {
  return (
    <div className=" pb-[80px] px-5">
      <h5 className="font-semibold pt-3 text-[16px] mb-2 text-center mb-5">
        HFL Fight Clubs
      </h5>
      <div className="grid grid-cols-2 place-items-center gap-5 pt-2 m-auto">
        {fightClubsData?.map((c) => {
          return (
            <div
              key={c.id}
              className="w-[142px] h-[134px] rounded-xl glass-3 shadow-md grid place-items-center border-[3px]"
            >
              <img
                src={c.img}
                onError={(e) =>
                  !e.target.onerror
                    ? (e.target.src = "/images/tiar_logo_3.svg")
                    : null
                }
                alt=""
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatsTab;
