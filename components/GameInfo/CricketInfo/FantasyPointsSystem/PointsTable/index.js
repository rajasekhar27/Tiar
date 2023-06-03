import { cricketConfig } from "../../../../../data/gameInfoConfig";

const PointsTable = ({ points }) => {
  return (
    <div>
      {points?.map((d, idx) => (
        <div
          key={d.id}
          className={`flex justify-between items-center pl-3 text-[10px] ${
            idx % 2 === 0 && "bg-[#F7F7F7]"
          }`}
        >
          <div>
            <p className="">{d.name}</p>
            {d.subTitle && <p className="text-[8px]">{d.subTitle}</p>}
          </div>

          <div
            className={`w-[50px] h-full grid place-items-center py-2 border-y text-white`}
            style={{
              backgroundColor: d?.secondaryColor
                ? cricketConfig?.pointTableColors.secondary
                : cricketConfig?.pointTableColors.primary,
            }}
          >
            <p>{d.points}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PointsTable;
