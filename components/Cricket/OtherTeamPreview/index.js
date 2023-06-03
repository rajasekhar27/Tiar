import { AiOutlineLeft } from "react-icons/ai";
import { useViewportSize } from "@mantine/hooks";
import { useDispatch, useSelector } from "react-redux";
import { useViewOtherTeamDetailsQuery } from "../../../store/apis/restApi";
import { useRouter } from "next/router";
import Modal from "../../UI/Modal";
import { closeOtherTeamPreviewPopup } from "../../../store/slices/games";
import { BsPencil } from "react-icons/bs";
import { setPlayerDetail } from "../../../store/slices/games";
import { setCurrentScreen } from "../../../store/slices/cricket";

const OtherTeamPreview = (props) => {
  const { height: viewportHeight } = useViewportSize();

  const router = useRouter();
  const dispatch = useDispatch();

  const popupStatus = useSelector(
    (state) => state.games.otherTeamPreviewPopup.status
  );
  const helperData = useSelector(
    (state) => state.games.otherTeamPreviewPopup.helperData
  );

  const { data: teamDetailsData } = useViewOtherTeamDetailsQuery(
    {
      slug: helperData?.slug,
    },
    {
      skip: helperData ? false : true,
    }
  );

  const handleEdit = () => {
    dispatch(closeOtherTeamPreviewPopup());
    dispatch(setCurrentScreen(3));
    router.push(
      `/games/cricket/${
        helperData?.matchSlug
          ? helperData?.matchSlug
          : teamDetailsData?.match?.slug
      }/edit-team/${teamDetailsData?.slug}`
    );
  };

  return (
    <Modal isOpen={popupStatus} parentClasses={"max-w-[450px]"}>
      <div className="bg-ownBlue1 flex justify-between items-center h-[60px] px-5">
        <div className="flex items-center text-ownOrange space-x-3 ">
          <AiOutlineLeft
            color="white"
            size={25}
            onClick={() => dispatch(closeOtherTeamPreviewPopup())}
          />
          <h5 className="font-semibold text-[18px]">Team Preview</h5>
        </div>

        {helperData?.edit && (
          <BsPencil size={25} color="white" onClick={handleEdit} />
        )}
      </div>

      <div style={{ height: `${viewportHeight - 60}px` }}>
        <Pitch slug={helperData?.slug} />
      </div>
    </Modal>
  );
};

const Pitch = ({ slug }) => {
  const { data: teamDetailsData } = useViewOtherTeamDetailsQuery({
    slug: slug,
  });

  //useRouter
  const router = useRouter();

  //useDispatch
  const dispatch = useDispatch();

  const helperData = useSelector(
    (state) => state.games.otherTeamPreviewPopup.helperData
  );

  const wicketKeepers = teamDetailsData
    ? teamDetailsData?.players?.filter((p) => p?.role === "WK")
    : [];
  const batsmen = teamDetailsData
    ? teamDetailsData?.players?.filter((p) => p?.role === "BATSMAN")
    : [];
  const allRounders = teamDetailsData
    ? teamDetailsData?.players?.filter((p) => p?.role === "ALLROUNDER")
    : [];
  const bowlers = teamDetailsData
    ? teamDetailsData?.players?.filter((p) => p?.role === "BOWLER")
    : [];

  const totalPlayer = [
    ...wicketKeepers,
    ...batsmen,
    ...allRounders,
    ...bowlers,
  ];

  const playerArr = totalPlayer.map((item) => item?.slug);

  //function
  const handleRoute = () => {
    dispatch(setPlayerDetail(playerArr));
    dispatch(closeOtherTeamPreviewPopup());
    router.push(`/games/cricket/player-detail/${helperData?.matchSlug}`);
  };

  return (
    <div className="w-full h-full bg-[url('/images/pitch.png')] bg-center bg-no-repeat bg-cover relative flex flex-col items-center p-5">
      <div className="absolute w-full h-full top-0 bottom-0 left-0 right-0 bg-black/60 grid place-items-center">
        <img src="/images/tiar_logo_4.svg" alt="" className="opacity-20" />
      </div>

      <div className="flex items-center w-full text-white z-[1] justify-center">
        <div className="flex items-center space-x-2">
          <div className="flex items-center -space-x-2">
            <div className="min-w-[64px] h-[25px] bg-white text-black rounded-md grid place-items-center text-[10px] font-bold z-[-1]">
              <p className="uppercase">
                {teamDetailsData?.match?.team_1?.team_s_name}:{" "}
                <span>{teamDetailsData?.no_of_players?.team1}</span>
              </p>
            </div>
            <div className="w-[40px] h-[40px] bg-white p-2 rounded-full">
              <img
                src={teamDetailsData?.match?.team_1?.image_url}
                alt=""
                onError={(e) =>
                  !e.target.onerror
                    ? (e.target.src = "/images/tiar_logo_3.svg")
                    : null
                }
              />
            </div>
          </div>

          <p className="text-[13px] font-semibold uppercase">VS</p>

          <div className="flex items-center -space-x-2">
            <div className="w-[40px] h-[40px] bg-white p-2 rounded-full">
              <img
                src={teamDetailsData?.match?.team_2?.image_url}
                alt=""
                onError={(e) =>
                  !e.target.onerror
                    ? (e.target.src = "/images/tiar_logo_3.svg")
                    : null
                }
              />
            </div>
            <div className="z-[-1] min-w-[64px] h-[25px] bg-black text-white rounded-md grid place-items-center text-[10px] font-bold">
              <p className="uppercase">
                {teamDetailsData?.match?.team_2?.team_s_name}:{" "}
                <span>{teamDetailsData?.no_of_players?.team2}</span>
              </p>
            </div>
          </div>
        </div>

        {/* <div className="flex -space-x-2">
          <div className="min-w-[64px] h-[25px] bg-white text-black rounded-md grid place-items-center text-[10px] font-bold">
            <p className="uppercase">
              {teamDetailsData?.match?.team_1?.team_s_name}:{" "}
              <span>{teamDetailsData?.no_of_players?.team1}</span>
            </p>
          </div>
          <div className="min-w-[64px] h-[25px] bg-black text-white rounded-md grid place-items-center text-[10px] font-bold">
            <p className="uppercase">
              {teamDetailsData?.match?.team_2?.team_s_name}:{" "}
              <span>{teamDetailsData?.no_of_players?.team2}</span>
            </p>
          </div>
        </div> */}
      </div>

      <div className="z-[1] w-full h-full flex flex-col justify-between py-3">
        <PlayerRow
          type={"Wicket Keepers"}
          players={wicketKeepers}
          data={teamDetailsData}
          handleRoute={handleRoute}
        />
        <PlayerRow
          type={"Batters"}
          players={batsmen}
          data={teamDetailsData}
          handleRoute={handleRoute}
        />
        <PlayerRow
          type={"All Rounders"}
          players={allRounders}
          data={teamDetailsData}
          handleRoute={handleRoute}
        />
        <PlayerRow
          type={"Bowlers"}
          players={bowlers}
          data={teamDetailsData}
          handleRoute={handleRoute}
        />
      </div>

      <div className="z-[1] mt-5">
        <p className="text-[14px] text-white">
          Total Points :{" "}
          {teamDetailsData?.team_points ? teamDetailsData?.team_points : 0}
        </p>
      </div>
    </div>
  );
};

const PlayerRow = ({ type, players, data, handleRoute }) => {
  return (
    <div className="w-full flex flex-col space-y-3 items-center">
      <div className="rounded-md text-white p-1 font-medium text-[14px] px-3">
        <p>{type}</p>
      </div>

      <div className="flex justify-evenly w-full">
        {players?.map((p, idx) => {
          return (
            <div
              className="flex flex-col items-center space-y-2 relative"
              key={p.id}
              onClick={handleRoute}
            >
              {/* Captain Vice Captain Tags */}
              {(p.id === data?.captain || p.id === data?.vice_captain) && (
                <div className="absolute left-1 top-3 w-[18px] h-[18px] grid place-items-center text-[9px] bg-white rounded-full border border-black">
                  <p>{p.id === data?.captain ? "C" : "VC"}</p>
                </div>
              )}

              <img
                src={p.player_image}
                alt=""
                onError={(e) =>
                  !e.target.onerror
                    ? (e.target.src = "/images/tiar_logo_3.svg")
                    : null
                }
                className="w-[35px] h-[35px] rounded-full bg-cover"
              />

              <div
                className={`min-w-[30px] h-[16px] px-1 font-semibold text-[10px] grid place-items-center rounded-md uppercase ${
                  players.length <= 2
                    ? "bg-white"
                    : idx === 0 || idx === players.length - 1
                    ? "bg-black text-white"
                    : "bg-white"
                }`}
              >
                <p>{p.name.substring(0, 8)}</p>
                <p className="text-white">
                  Pts: {data?.team_player_points[p.id]}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OtherTeamPreview;
