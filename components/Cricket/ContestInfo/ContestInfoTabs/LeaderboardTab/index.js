import { FiUsers } from "react-icons/fi";
import Scrollbars from "react-custom-scrollbars-2";
import { useViewportSize } from "@mantine/hooks";
import {
  useGetContestLeaderboardQuery,
  useGetUserLeaderboardPositionQuery,
} from "../../../../../store/apis/restApi";
import { useDispatch, useSelector } from "react-redux";
import { openOtherTeamPreviewPopup } from "../../../../../store/slices/games";
import { useEffect } from "react";
import { useState } from "react";
import moment from "moment";
import { profileShuffle } from "../../../../../helpers/profileShuffle";

const LeaderboardTab = ({ topBarHeight, contestId, matchStatus }) => {
  const { height: windowHeight } = useViewportSize();
  const [updateTime, setUpdateTime] = useState(null);

  const { data: leaderboardData, isFetching } = useGetContestLeaderboardQuery(
    {
      slug: contestId,
    },
    {
      pollingInterval: 120000, // 2 min
    }
  );

  const { data: userLeaderboardPositionData } =
    useGetUserLeaderboardPositionQuery(
      {
        slug: contestId,
      },
      {
        pollingInterval: 120000, // 2 min
      }
    );

  useEffect(() => {
    if (!leaderboardData) return;
    if (!isFetching) {
      setUpdateTime(new Date(Date.now()));
    }
  }, [isFetching]);

  return (
    <>
      <div className="px-5 text-white">
        <div className="flex justify-between my-2">
          <p className="text-[10px]">
            {isFetching
              ? "Fetching Leaderboard Data"
              : `Updated ${moment(updateTime).fromNow()}`}
          </p>
          <div className="flex space-x-2">
            <FiUsers />
            {/* <BsDownload /> */}
          </div>
        </div>

        <div className="flex justify-between">
          <p className="text-[15px] text-ownOrange my-2">
            All teams (<span>{leaderboardData?.leaderboard?.length}</span>)
          </p>

          <div className="flex text-[14px] text-[#909090] space-x-3">
            <p>Points</p>
            <p>#Rank</p>
          </div>
        </div>
      </div>

      <div
        style={{
          height: `${windowHeight - topBarHeight - 150 - 50 - 60 - 50}px`,
        }}
        className=""
      >
        <Scrollbars style={{ height: "100%" }}>
          {leaderboardData?.leaderboard?.map((i, idx) => {
            return (
              <UserCard
                key={i.id}
                data={i}
                idx={idx}
                matchStatus={matchStatus}
              />
            );
          })}
        </Scrollbars>
      </div>

      {userLeaderboardPositionData &&
        userLeaderboardPositionData?.final !== null && (
          <div className="fixed bottom-0 left-0 bg-white/20  flex items-center justify-between  px-5 w-full rounded-t-md md:max-w-[450px] ">
            <div className="my-3 flex space-x-2 items-center">
              <div className="w-[30px] h-[30px] bg-white rounded-full overflow-hidden">
                <img
                  src={
                    userLeaderboardPositionData?.final?.image
                      ? `${process.env.NEXT_PUBLIC_BACKEND_IMG_BASEURL}${userLeaderboardPositionData?.final?.image}`
                      : profileShuffle()
                  }
                  alt=""
                  onError={(e) =>
                    !e.target.onerror
                      ? (e.target.src = "/images/tiar_logo_3.svg")
                      : null
                  }
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="text-[12px] text-ownOrange font-semibold">
                {userLeaderboardPositionData?.final?.name}{" "}
                {/* <span className="font-bold">
              ( {leaderboardData?.teams?.team_number} )
            </span> */}
              </p>
            </div>

            <div className="flex justify-between text-[12px] space-x-10">
              <p className="text-white/60">
                {userLeaderboardPositionData?.final?.points}
              </p>
              <p className="text-white">
                {userLeaderboardPositionData?.final?.rank < 10
                  ? `0${userLeaderboardPositionData?.final?.rank}`
                  : userLeaderboardPositionData?.final?.rank}
              </p>
            </div>
          </div>
        )}
    </>
  );
};

const UserCard = ({ data, idx, matchStatus }) => {
  const dispatch = useDispatch();

  const ownerSlug = useSelector((state) => state.auth.user?.owner_slug);

  // UPCOMING = "UPCOMING"
  // TODAY_MATCH = "TODAY_MATCH"
  // ONGOING = "ONGOING"
  // COMPLETED = "COMPLETED"
  // POINTS_DISTRIBUTED = "POINTS_DISTRIBUTED"
  // DISTRIBUTED = "DISTRIBUTED"

  return (
    <div className="flex items-center justify-between bg-[#000000]/20 px-5 mt-1 text-white">
      <div
        className="my-3 flex space-x-2 items-center"
        onClick={() =>
          ownerSlug === data?.user?.slug
            ? dispatch(openOtherTeamPreviewPopup({ slug: data?.teams?.slug }))
            : matchStatus === "UPCOMING"
            ? ""
            : matchStatus === "TODAY_MATCH"
            ? ""
            : dispatch(openOtherTeamPreviewPopup({ slug: data?.teams?.slug }))
        }
      >
        <div className="w-[30px] h-[30px] bg-white rounded-full overflow-hidden shrink-0">
          <img
            src={
              data.user?.user_profile?.image
                ? `${process.env.NEXT_PUBLIC_BACKEND_IMG_BASEURL}${data.user?.user_profile?.image}`
                : profileShuffle()
            }
            alt=""
            onError={(e) =>
              !e.target.onerror
                ? (e.target.src = "/images/tiar_logo_3.svg")
                : null
            }
            className="object-cover w-full h-full"
          />
        </div>
        <p className="text-[12px]">
          {data?.user?.user_profile?.name}{" "}
          <span className="font-bold">( {data?.teams?.team_number} )</span>
        </p>
      </div>

      <div className="flex justify-between text-[12px] space-x-10">
        <p className="text-white/60 ">{data?.points}</p>
        <p>{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</p>
      </div>
    </div>
  );
};

export default LeaderboardTab;
