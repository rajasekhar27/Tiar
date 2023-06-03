const HomeTiles = ({ heading }) => {
  return (
    <div className="my-7 text-white">
      <h1 className="mb-2 font-semibold text-[18px]">{heading}</h1>

      <div className="flex space-x-5">
        {new Array(2).fill(2).map((b, idx) => {
          return (
            <div key={idx} className="w-[143px] h-[132px] bg-ownOrange"></div>
          );
        })}
      </div>
    </div>
  );
};

export default HomeTiles;
