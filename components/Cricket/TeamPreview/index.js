import { AiOutlineLeft } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { useViewportSize } from "@mantine/hooks";
import { setCurrentScreen } from "../../../store/slices/cricket";
import { useDispatch, useSelector } from "react-redux";
import { useGetMatchDetailsQuery } from "../../../store/apis/restApi";
import { useRouter } from "next/router";
import { useEffect } from "react";

const TeamPreview = (props) => {
  const { height: viewportHeight } = useViewportSize();

  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.overscrollBehaviorY = "contain";

    return () => (document.body.style.overscrollBehaviorY = "auto");
  }, []);

  const handleEdit = () => {
    dispatch(setCurrentScreen(3));
  };

  return (
    <div>
      <div className="bg-ownBlue1 flex justify-between items-center h-[60px] px-5">
        <div className="flex items-center text-ownOrange space-x-3">
          <AiOutlineLeft color="white" size={25} onClick={handleEdit} />
          <h5 className="font-semibold text-[18px]">Team Preview</h5>
        </div>

        {/* <BsPencil size={25} /> */}
      </div>

      <div style={{ height: `${viewportHeight - 60}px` }}>
        <Pitch />
      </div>
    </div>
  );
};

const Pitch = () => {
  const router = useRouter();

  const { id } = router.query;

  const { data: matchDetailsData } = useGetMatchDetailsQuery({
    slug: id,
  });

  const wicketKeepers = useSelector(
    (state) => state.cricket.players.wicketKeepers
  );
  const batsmen = useSelector((state) => state.cricket.players.batsmen);
  const allRounders = useSelector((state) => state.cricket.players.allRounders);
  const bowlers = useSelector((state) => state.cricket.players.bowlers);
  const captain = useSelector((state) => state.cricket.captain);
  const viceCaptain = useSelector((state) => state.cricket.viceCaptain);

  const totalPlayer = [
    ...wicketKeepers,
    ...batsmen,
    ...allRounders,
    ...bowlers,
  ];

  const team1Players = totalPlayer.filter(
    (p) => p.main_team_name === matchDetailsData?.team1
  );
  const team2Players = totalPlayer.filter(
    (p) => p.main_team_name === matchDetailsData?.team2
  );

  return (
    <div className="w-full h-full bg-[url('/images/pitch.png')] bg-center bg-no-repeat bg-cover relative flex flex-col items-center p-5">
      <div className="absolute w-full h-full top-0 bottom-0 left-0 right-0 bg-black/40 "></div>

      <div className="flex space-x-3 z-[1]">
        <div className="min-w-[64px] h-[25px] bg-black text-white rounded-md grid place-items-center text-[10px] font-bold">
          <p className="uppercase">
            {matchDetailsData?.team1}: <span>{team1Players.length}</span>
          </p>
        </div>
        <div className="min-w-[64px] h-[25px] bg-white text-black rounded-md grid place-items-center text-[10px] font-bold">
          <p className="uppercase">
            {matchDetailsData?.team2}: <span>{team2Players.length}</span>
          </p>
        </div>
      </div>

      <div className="z-[1] w-full h-full flex flex-col justify-between py-3">
        <PlayerRow
          type={"Wicket Keepers"}
          players={wicketKeepers}
          captain={captain}
          viceCaptain={viceCaptain}
        />
        <PlayerRow
          type={"Batters"}
          players={batsmen}
          captain={captain}
          viceCaptain={viceCaptain}
        />
        <PlayerRow
          type={"All Rounders"}
          players={allRounders}
          captain={captain}
          viceCaptain={viceCaptain}
        />
        <PlayerRow
          type={"Bowlers"}
          players={bowlers}
          captain={captain}
          viceCaptain={viceCaptain}
        />
      </div>
    </div>
  );
};

const PlayerRow = ({ type, players, captain, viceCaptain }) => {
  return (
    <div className="w-full flex flex-col space-y-3 items-center">
      <div className="bg-white rounded-md text-black p-1 font-medium text-[10px] px-3">
        <p>{type}</p>
      </div>

      <div className="flex justify-evenly w-full">
        {players?.map((p) => {
          return (
            <div
              className="flex flex-col items-center space-y-2 relative"
              key={p.id}
            >
              {(p.id === captain?.id || p.id === viceCaptain?.id) && (
                <div className="absolute rounded-full bg-white w-[15px] h-[15px] text-[10px] grid place-items-center -right-2 top-2">
                  {captain?.id === p.id ? "C" : "VC"}{" "}
                </div>
              )}

              <img
                src={p.image_url ? p.image_url : p.team_image_url}
                alt=""
                onError={(e) =>
                  !e.target.onerror
                    ? (e.target.src = "/images/tiar_logo_3.svg")
                    : null
                }
                className="w-[35px] h-[35px] rounded-full bg-cover"
              />

              <div
                className={`min-w-[30px] h-[16px] px-1 bg-gray-300 text-white font-semibold text-[10px] grid place-items-center rounded-md uppercase`}
              >
                <p>{p.main_team_name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamPreview;
