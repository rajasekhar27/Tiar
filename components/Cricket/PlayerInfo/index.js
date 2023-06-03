import { AiOutlineLeft } from "react-icons/ai";
import { useViewportSize } from "@mantine/hooks";
import { useEffect, useState, useRef } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import PlayerStat from "./PlayerStat";
import {
  useGetPlayerDetailsQuery,
  useGetPlayerRecentlyPlayedMatchesQuery,
} from "../../../store/apis/restApi";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setCurrentScreen } from "../../../store/slices/cricket";

const PlayerInfo = ({ playerSlug, matchSlug, redirect }) => {
  const [topBarHeight, setTopBarHeight] = useState(0);
  const [bottomBarHeight, setBottomBarHeight] = useState(0);

  const { height: windowHeight } = useViewportSize();

  const topBarRef = useRef(null);
  const bottomBarRef = useRef(null);

  const router = useRouter();
  const dispatch = useDispatch();

  const { data: playerData } = useGetPlayerDetailsQuery({
    slug: playerSlug,
    matchSlug: matchSlug,
  });

  const { data: matchesData } = useGetPlayerRecentlyPlayedMatchesQuery({
    slug: playerSlug,
    matchSlug: matchSlug,
  });

  useEffect(() => {
    if (topBarRef?.current) {
      setTopBarHeight(topBarRef?.current?.clientHeight);
    }

    if (bottomBarRef?.current) {
      setBottomBarHeight(bottomBarRef?.current?.clientHeight);
    }
  }, [topBarRef, bottomBarRef]);

  return (
    <div className="px-5">
      {/* Top Bar */}
      <div className="text-white" ref={topBarRef}>
        <div className="flex items-center text-ownOrange space-x-3 my-5">
          <AiOutlineLeft
            color="white"
            size={25}
            onClick={() =>
              redirect ? router.back() : dispatch(setCurrentScreen(3))
            }
          />
          <h5 className="font-semibold text-[18px]">Player Info</h5>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img
              src={playerData?.image_url}
              alt=""
              onError={(e) =>
                !e.target.onerror
                  ? (e.target.src = "/images/tiar_logo_3.svg")
                  : null
              }
              className="w-[80px] h-[80px] rounded-full"
            />
            <div className="flex bg-[#183875] p-1 font-semibold text-[14px] rounded-md space-x-2">
              <p>{playerData?.team?.team_s_name}</p>
              <p>-</p>
              <p>{playerData?.role}</p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <p>Points</p>
            <p>{playerData?.points}</p>
          </div>

          <div className="flex flex-col items-center">
            <p>Credits</p>
            <p>{parseFloat(playerData?.credits)?.toFixed(2)}</p>
          </div>
        </div>

        <div className="mt-3">
          <h5 className="font-semibold text-[14px]">{playerData?.name}</h5>
          {playerData?.played_last_match && (
            <p className="font-medium text-[9px]">
              <span className="text-ownOrange  text-[12px]">
                Played last match
              </span>{" "}
              (Indicative information as per official sources)
            </p>
          )}
        </div>

        <div className="mt-3">
          <h5 className="font-semibold text-[14px]">In your teams</h5>
          <p className="font-medium text-[12px] text-ownOrange">
            You have not added this player in any team
          </p>
        </div>

        <p className="font-semibold text-[14px] my-2">
          Match wise Fantasy Stats
        </p>
      </div>

      <div
        className=""
        style={{ height: `${windowHeight - topBarHeight - 50}px` }}
      >
        <Scrollbars style={{ height: "100%" }}>
          {matchesData?.results?.map((i, idx) => (
            <PlayerStat key={idx} data={i} />
          ))}
        </Scrollbars>
      </div>

      {/* Bottom Bar */}
      {/* <div
        className="grid place-items-center text-white fixed py-10 bottom-0 w-full bg-ownBlue1"
        ref={bottomBarRef}
      >
        <button className="w-[150px] h-[37px] bg-ownOrange rounded-md">
          Add to my Team
        </button>
      </div> */}
    </div>
  );
};

export default PlayerInfo;
