const TeamCard = ({
  title,
  points,
  wk,
  bat,
  ar,
  bowl,
  captainName,
  captainImg,
  viceCaptainName,
  viceCaptainImg,
}) => {
  return (
    <div
      className="h-[124px] bg-green-50 rounded-md bg-[url('/images/pitch_2.png')] bg-center bg-cover bg-no-repeat overflow-hidden flex flex-col justify-between w-full  animate__animated animate__flipInX"
      style={{ backgroundSize: "120%" }}
    >
      <div className="bg-black/50 font-semibold py-1 px-5">
        <p className="text-[14px] text-white">Team {title}</p>
      </div>

      <div className="flex justify-between px-5 text-white">
        <div>
          <p className="text-[8px] font-semibold">POINTS</p>
          <p className="font-semibold text-[10px]">{points}</p>
        </div>

        <div className="flex space-x-3">
          <div className="flex flex-col items-center relative">
            <div className="absolute left-0 top-0 rounded-full w-[15px] h-[15px] bg-white text-black border border-black text-[8px] grid place-items-center font-bold">
              <p>C</p>
            </div>
            <img
              src={captainImg}
              alt=""
              onError={(e) =>
                !e.target.onerror
                  ? (e.target.src = "/images/tiar_logo_3.svg")
                  : null
              }
              className="max-w-[45px] max-h-[33px]"
            />
            <div className="bg-white text-black text-[8px] font-semibold text-center rounded-sm px-2">
              <p>{captainName}</p>
            </div>
          </div>

          <div className="flex flex-col items-center relative">
            <div className="absolute left-0 top-0 rounded-full w-[15px] h-[15px] bg-white text-black border border-black text-[8px] grid place-items-center font-bold">
              <p>VC</p>
            </div>
            <img
              src={viceCaptainImg}
              alt=""
              onError={(e) =>
                !e.target.onerror
                  ? (e.target.src = "/images/tiar_logo_3.svg")
                  : null
              }
              className="max-w-[45px] max-h-[33px]"
            />
            <div className="bg-black text-white text-[8px] font-semibold text-center rounded-sm px-2">
              <p>{viceCaptainName}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-1 text-black flex justify-between text-[8px] font-semibold px-5">
        <p className="text-[10px] text-black/50">
          WK <span className="text-[12px] text-black">{wk}</span>
        </p>
        <p className="text-[10px] text-black/50">
          BAT <span className="text-[12px] text-black">{bat}</span>
        </p>
        <p className="text-[10px] text-black/50">
          AR <span className="text-[12px] text-black">{ar}</span>
        </p>
        <p className="text-[10px] text-black/50">
          BOWL <span className="text-[12px] text-black">{bowl}</span>
        </p>
      </div>
    </div>
  );
};

export default TeamCard;
