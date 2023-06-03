const HomeSection = ({ sectionName, data, title, img }) => {
  return (
    <div>
      <h1 className="text-white mb-2 mt-2 text-[18px] font-semibold">
        {sectionName}
      </h1>

      <div className="flex overflow-x-auto space-x-4 h-[115px] items-center">
        {data?.map((c, idx) => {
          return (
            <div
              className="w-[144px] h-[113px] flex-shrink-0 text-[10px] font-semibold rounded-md overflow-hidden"
              key={idx}
            >
              <img
                // src="https://pbs.twimg.com/media/FVDw_fUagAEjbHD?format=jpg&name=small"
                src={img(c)}
                onError={(e) =>
                  !e.target.onerror
                    ? (e.target.src = "/images/tiar_logo_3.svg")
                    : null
                }
                alt=""
                className="h-[85px] w-full"
              />
              <div className="h-[calc(113px-85px)] bg-white text-black flex items-center px-2">
                <p>{title(c)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomeSection;
