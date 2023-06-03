const HellsbayFights = (props) => {
  return (
    <div className="block-swipe-tabs">
      <h1 className="text-[16px] font-semibold">IBC Boxing News</h1>

      <div className="flex overflow-x-auto py-3 space-x-3">
        <a
          target={"_blank"}
          rel="noreferrer"
          onError={(e) =>
            !e.target.onerror
              ? (e.target.src = "/images/tiar_logo_3.svg")
              : null
          }
          href={
            "https://www.indianboxingcouncil.com/nt-lalbiakkima-loses-jayson-vayson/"
          }
          className="shrink-0"
        >
          <div className="flex-shrink-0 rounded-md">
            <img
              src={
                "https://www.indianboxingcouncil.com/wp-content/uploads/2022/06/Jayson-Vayson-Winner.jpeg"
              }
              alt=""
              className="w-[141px] h-[85px] rounded-md"
            />

            <p className="text-[12px] font-semibold mt-1">
              NT Lalbiakkima loses...
            </p>
            {/* <p className="text-[8px]">WBC India</p> */}
          </div>
        </a>

        <a
          target={"_blank"}
          rel="noreferrer"
          href="https://www.indianboxingcouncil.com/mizo-boxer-nt-lalbiakkima-vs-jayson-vayson-wbc/"
          className="shrink-0"
        >
          <div className="flex-shrink-0 rounded-md">
            <img
              onError={(e) =>
                !e.target.onerror
                  ? (e.target.src = "/images/tiar_logo_3.svg")
                  : null
              }
              src={
                "https://www.indianboxingcouncil.com/wp-content/uploads/2022/06/Dwarka-11-June-1.jpg"
              }
              alt=""
              className="w-[141px] h-[85px] rounded-md"
            />

            <p className="text-[12px] font-semibold mt-1">
              Mizo boxer NT Lalbia...
            </p>
            {/* <p className="text-[8px]">WBC Asia</p> */}
          </div>
        </a>

        <a
          target={"_blank"}
          rel="noreferrer"
          href="https://www.indianboxingcouncil.com/sabari-j-enters-wbc-world-rankings/"
          className="shrink-0"
        >
          <div className="flex-shrink-0">
            <img
              onError={(e) =>
                !e.target.onerror
                  ? (e.target.src = "/images/tiar_logo_3.svg")
                  : null
              }
              src={
                "https://www.indianboxingcouncil.com/wp-content/uploads/2022/06/Boxer-Champion-800-%C3%97-800px-300x180.jpg"
              }
              alt=""
              className="w-[141px] h-[85px] rounded-md"
            />

            <p className="text-[12px] font-semibold mt-1 ">
              Indian pro boxer Saba...
            </p>
            {/* <p className="text-[8px]">IBC</p> */}
          </div>
        </a>

        <a
          target={"_blank"}
          rel="noreferrer"
          href="https://www.indianboxingcouncil.com/satnam-singh-crowned-wbc-india-champion-at-fightclub-by-upb/"
          className="shrink-0"
        >
          <div className="flex-shrink-0">
            <img
              onError={(e) =>
                !e.target.onerror
                  ? (e.target.src = "/images/tiar_logo_3.svg")
                  : null
              }
              src={
                "https://www.indianboxingcouncil.com/wp-content/uploads/2022/03/Awaiting-the-Results.jpeg"
              }
              alt=""
              className="w-[141px] h-[85px] rounded-md"
            />

            <p className="text-[12px] font-semibold mt-1 ">
              Satnam Singh crowned...
            </p>
            {/* <p className="text-[8px]">IBC</p> */}
          </div>
        </a>
      </div>
    </div>
  );
};

export default HellsbayFights;
