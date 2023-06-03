import { AiOutlineInfoCircle } from "react-icons/ai";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  addAllRounder,
  addBatsman,
  addBowler,
  addWicketKeeper,
  removeAllRounder,
  removeBatsman,
  removeBowler,
  removeWicketKeeper,
  setCredits,
  setExtraSpots,
  setPlayerInfoSlugs,
} from "../../../../store/slices/cricket";
import _ from "lodash";
import { useEffect } from "react";
import { useState } from "react";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const PlayerCard = ({ data, team1, team2, matchSlug }) => {
  const [metCriteria, setMetCriteria] = useState(true);

  const dispatch = useDispatch();
  const router = useRouter();

  const currentPlayersType = useSelector(
    (state) => state.cricket.currentPlayersType
  );
  const wicketKeepers = useSelector(
    (state) => state.cricket.players.wicketKeepers
  );
  const batsmen = useSelector((state) => state.cricket.players.batsmen);
  const allRounders = useSelector((state) => state.cricket.players.allRounders);
  const bowlers = useSelector((state) => state.cricket.players.bowlers);
  const credits = useSelector((state) => state.cricket.credits);
  const extraSpots = useSelector((state) => state.cricket.extraSpots);

  const totalPlayersAllowed = 11;
  const playersAllowedInTeam = 7;
  const wicketKeepersAllowed = 8; // 4
  const batsmenAllowed = 8; // 6
  const allRoundersAllowed = 8; // 4
  const bowlersAllowed = 8; // 6

  const minWicketkeepersAllowed = 1; // 1
  const minBatsmanAllowed = 1; // 3
  const minAllRoundersAllowed = 1; //1
  const minBowlersAllowed = 1; // 3

  const totalPlayer = [
    ...wicketKeepers,
    ...batsmen,
    ...allRounders,
    ...bowlers,
  ];

  const handleAddPlayer = (playerData) => {
    const totalPlayerCount = totalPlayer.length;

    const team1Players = totalPlayer.filter((p) => p.main_team_name === team1);
    const team2Players = totalPlayer.filter((p) => p.main_team_name === team2);

    const isPlayerTeam1 = playerData?.main_team_name === team1 ? true : false;

    const playersFilledInTeam = isPlayerTeam1
      ? team1Players.length
      : team2Players.length;

    const currentPlayersInRole =
      currentPlayersType === 1
        ? wicketKeepers
        : currentPlayersType === 2
        ? batsmen
        : currentPlayersType === 3
        ? allRounders
        : bowlers;

    const playersAllowedForRole =
      currentPlayersType === 1
        ? wicketKeepersAllowed
        : currentPlayersType === 2
        ? batsmenAllowed
        : currentPlayersType === 3
        ? allRoundersAllowed
        : bowlersAllowed;

    const playersFilledForRole =
      currentPlayersType === 1
        ? wicketKeepers.length
        : currentPlayersType === 2
        ? batsmen.length
        : currentPlayersType === 3
        ? allRounders.length
        : bowlers.length;

    const dispatchAdd =
      currentPlayersType === 1
        ? addWicketKeeper
        : currentPlayersType === 2
        ? addBatsman
        : currentPlayersType === 3
        ? addAllRounder
        : addBowler;

    const minAllowedPlayers =
      currentPlayersType === 1
        ? minWicketkeepersAllowed
        : currentPlayersType === 2
        ? minBatsmanAllowed
        : currentPlayersType === 3
        ? minAllRoundersAllowed
        : minBowlersAllowed;

    // ?? check if he is already added in to list
    if (currentPlayersInRole.filter((p) => p.id === playerData.id).length >= 1)
      return;

    console.log("check 1 passed");

    //?? Check if there is vacancy among 11 players
    if (totalPlayerCount >= totalPlayersAllowed) return;

    console.log("check 2 passed");

    // ?? check vacancy among the current role (eg: wicket keeper)
    if (playersFilledForRole >= playersAllowedForRole) return;

    console.log("check 3 passed");

    // ?? check vacancy among team
    if (playersFilledInTeam >= playersAllowedInTeam) return;

    console.log("check 4 passed");

    // ?? Check for credits availability
    if (credits < playerData?.credits) return;

    console.log("check 5 passed");

    console.log(playersFilledForRole, minAllowedPlayers);

    // //  ?? min player role reservation Check
    if (playersFilledForRole >= minAllowedPlayers) {
      console.log("check 6 passed");

      if (extraSpots <= 0) return;
      console.log("check 7 passed");

      dispatch(setExtraSpots(extraSpots - 1));
    }

    const data = {
      id: playerData?.id,
      name: playerData?.name,
      image_url: playerData?.image_url,
      role: playerData?.role,
      team_name: playerData?.team?.team_name,
      main_team_name: playerData?.main_team_name,
      team_image_url: playerData?.team?.image_url,
      credits: playerData?.credits,
      slug: playerData?.slug,
      captain_select: playerData?.captain_select,
      vicecaptain_select: playerData?.vicecaptain_select,
      points: playerData?.points,
    };

    console.log("check 8 passed");

    const finalCredits = credits - playerData?.credits;

    dispatch(setCredits(finalCredits));
    dispatch(dispatchAdd(data));
  };

  const handleRemovePlayer = (playerData) => {
    const dispatchRemove =
      currentPlayersType === 1
        ? removeWicketKeeper
        : currentPlayersType === 2
        ? removeBatsman
        : currentPlayersType === 3
        ? removeAllRounder
        : removeBowler;

    const finalCredits = credits + playerData?.credits;

    const minAllowedPlayers =
      currentPlayersType === 1
        ? minWicketkeepersAllowed
        : currentPlayersType === 2
        ? minBatsmanAllowed
        : currentPlayersType === 3
        ? minAllRoundersAllowed
        : minBowlersAllowed;

    const playersFilledForRole =
      currentPlayersType === 1
        ? wicketKeepers.length
        : currentPlayersType === 2
        ? batsmen.length
        : currentPlayersType === 3
        ? allRounders.length
        : bowlers.length;

    if (playersFilledForRole > minAllowedPlayers) {
      dispatch(setExtraSpots(extraSpots + 1));
    }

    dispatch(setCredits(finalCredits));
    dispatch(dispatchRemove(playerData?.id));
  };

  const isPlayerSelected = () => {
    switch (currentPlayersType) {
      case 1:
        return wicketKeepers?.filter((p) => p.id === data?.id).length === 0
          ? false
          : true;

      case 2:
        return batsmen?.filter((p) => p.id === data?.id).length === 0
          ? false
          : true;

      case 3:
        return allRounders?.filter((p) => p.id === data?.id).length === 0
          ? false
          : true;

      case 4:
        return bowlers?.filter((p) => p.id === data?.id).length === 0
          ? false
          : true;
    }
  };

  const checkPlayerSelectionCriteria = (playerData) => {
    const totalPlayerCount = totalPlayer.length;

    const team1Players = totalPlayer.filter((p) => p.main_team_name === team1);
    const team2Players = totalPlayer.filter((p) => p.main_team_name === team2);

    const isPlayerTeam1 = playerData?.main_team_name === team1 ? true : false;

    const playersFilledInTeam = isPlayerTeam1
      ? team1Players.length
      : team2Players.length;

    const currentPlayersInRole =
      currentPlayersType === 1
        ? wicketKeepers
        : currentPlayersType === 2
        ? batsmen
        : currentPlayersType === 3
        ? allRounders
        : bowlers;

    const playersAllowedForRole =
      currentPlayersType === 1
        ? wicketKeepersAllowed
        : currentPlayersType === 2
        ? batsmenAllowed
        : currentPlayersType === 3
        ? allRoundersAllowed
        : bowlersAllowed;

    const playersFilledForRole =
      currentPlayersType === 1
        ? wicketKeepers.length
        : currentPlayersType === 2
        ? batsmen.length
        : currentPlayersType === 3
        ? allRounders.length
        : bowlers.length;

    const minAllowedPlayers =
      currentPlayersType === 1
        ? minWicketkeepersAllowed
        : currentPlayersType === 2
        ? minBatsmanAllowed
        : currentPlayersType === 3
        ? minAllRoundersAllowed
        : minBowlersAllowed;

    // ?? check if he is already added in to list
    if (currentPlayersInRole.filter((p) => p.id === playerData.id).length >= 1)
      return false;

    //?? Check if there is vacancy among 11 players
    if (totalPlayerCount >= totalPlayersAllowed) return false;

    // ?? check vacancy among the current role (eg: wicket keeper)
    if (playersFilledForRole >= playersAllowedForRole) return false;

    // ?? check vacancy among team
    if (playersFilledInTeam >= playersAllowedInTeam) return false;

    // ?? Check for credits availability
    if (credits < playerData?.credits) return false;

    //  ?? min player role reservation Check
    if (playersFilledForRole >= minAllowedPlayers) {
      if (extraSpots <= 0) return false;
    }

    return true;
  };

  useEffect(() => {
    setMetCriteria(checkPlayerSelectionCriteria(data));
  }, [totalPlayer]);

  // ?? card animation
  const cardAnimation = {
    hidden: {
      y: "100vw",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
    },
    exit: {
      y: "100vw",
      opacity: 0,
    },
  };

  return (
    <div
      variants={cardAnimation}
      transition={{
        duration: 0.4,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`px-5 flex items-center space-x-3 justify-between border-y-[1px] border-ownBlue1 py-2 relative ${
        isPlayerSelected() && "bg-[#C0E7BC]"
      } ${!metCriteria && !isPlayerSelected() && "opacity-30"}`}
      onClick={() =>
        isPlayerSelected() ? handleRemovePlayer(data) : handleAddPlayer(data)
      }
    >
      {/* <AiOutlineInfoCircle /> */}

      <HiOutlineInformationCircle
        className="absolute left-2 top-2"
        size={20}
        color="gray"
      />

      <div
        className="flex flex-col items-center space-y-2"
        onClick={(e) => {
          e.stopPropagation();
          // router.push(`/games/cricket/player-info/${matchSlug}/${data?.slug}`);
          dispatch(
            setPlayerInfoSlugs({
              matchSlug: matchSlug,
              playerSlug: data?.slug,
            })
          );
        }}
      >
        <img
          onError={(e) =>
            !e.target.onerror
              ? (e.target.src = "/images/tiar_logo_3.svg")
              : null
          }
          src={data?.player_image ? data?.player_image : data?.team?.image_url}
          alt=""
          className="w-[50px] h-[50px] rounded-full object-contain"
        />

        <div
          className={`min-w-[43px] h-[22px] px-1 rounded-md font-semibold text-[14px] grid place-items-center text-white relative bg-gray-500`}
        >
          <img
            onError={(e) =>
              !e.target.onerror
                ? (e.target.src = "/images/tiar_logo_3.svg")
                : null
            }
            src={`${data?.team?.image_url}`}
            alt=""
            className="w-full h-full object-contain absolute opacity-20"
          />
          <p className="z-[1] uppercase whitespace-nowrap">
            {data?.main_team_name}
          </p>
        </div>
      </div>

      <div className="w-[120px]">
        <p className="font-bold text-[12px] flex items-center">{data?.name}</p>
        <p className="text-[10px]">
          Sel by{" "}
          {typeof data?.selected_by === "number"
            ? parseFloat(data?.selected_by).toFixed(1)
            : 0}
          %
        </p>

        <div className="mr-1 pt-2 flex items-center space-x-1">
          <div
            className={`w-[6px] h-[6px] ${
              data?.announced
                ? data?.line_up_status
                  ? "bg-green-500"
                  : "bg-red-500"
                : "bg-gray-400"
            } rounded-md`}
          ></div>
          <p className="text-[8px]">
            {!data?.announced ? "Lineup not announced" : ""}
          </p>
        </div>
      </div>

      <div>
        <p>{data?.points}</p>
      </div>

      <div>
        <p>
          {data?.credits?.toString().length <= 1
            ? `${data.credits}.0`
            : data?.credits}
        </p>
      </div>

      <div className="w-[25px] h-[25px] grid place-items-center">
        {isPlayerSelected() ? (
          <IoRemoveCircleOutline
            color="red"
            size={20}
            // onClick={() => dispatch(handleRemovePlayer()(data?.id))}
            // onClick={() => handleRemovePlayer(data)}
          />
        ) : (
          <IoAddCircleOutline
            color="#00B929"
            size={20}
            // onClick={() => handleAddPlayer(data)}
          />
        )}
      </div>
    </div>
  );
};

export default PlayerCard;
