const Section = ({ title, hideText2, data }) => {
  return (
    <div className="text-black">
      <h1 className="text-[18px] font-semibold">{title}</h1>

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
      <img src={data.image} alt="" className="w-[141px] h-[85px]" />

      <p className="text-[12px] font-semibold mt-1">{data?.title}</p>
      {!hideText2 && <p className="text-[10px]">{data?.description}</p>}
    </div>
  );
};

export default Section;
