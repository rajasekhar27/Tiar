import { BiChevronRight } from "react-icons/bi";

const Section = ({ title, hideText2, data }) => {
  return (
    <div className="text-black">
      <div className="flex items-center justify-between pr-3">
        <h1 className="text-[18px] font-semibold">{title}</h1>
        <BiChevronRight size={20} />
      </div>

      <div className="flex overflow-x-auto py-3 space-x-3">
        {data?.map((i, idx) => {
          return <SectionCard key={i.id} data={i} hideText2={hideText2} />;
        })}
      </div>
    </div>
  );
};

const SectionCard = ({ hideText2, data }) => {
  return (
    <div className="flex-shrink-0">
      <img
        src={data?.image}
        onError={(e) =>
          !e.target.onerror ? (e.target.src = "/images/tiar_logo_3.svg") : null
        }
        alt=""
        className="w-[141px] h-[85px]"
      />

      <p className="text-[12px] font-semibold mt-1">
        {data?.title}
        {/* {data?.player_1?.team?.team_s_name} vs{" "}
        {data?.player_2?.team?.team_s_name} */}
      </p>
      {!hideText2 && <p className="text-[10px]">{data?.venue_info?.title}</p>}
    </div>
  );
};

export default Section;
