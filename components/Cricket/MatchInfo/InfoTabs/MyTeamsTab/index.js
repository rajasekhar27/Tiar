import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {
  useGetAllTeamsByMatchSlugQuery,
  useGetMatchDetailsQuery,
} from "../../../../../store/apis/restApi";
import { openOtherTeamPreviewPopup } from "../../../../../store/slices/games";
import CreateTeam from "./CreateTeam";
import TeamCard from "./TeamCard";
import Scrollbars from "react-custom-scrollbars-2";
import { useViewportSize } from "@mantine/hooks";

const MyTeamsTab = ({ matchSlug, timeUp }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { height: windowHeight } = useViewportSize();

  const { data: teamsData } = useGetAllTeamsByMatchSlugQuery({
    slug: matchSlug,
  });

  console.log("TUP: ", timeUp);

  const { data: matchDetailsData } = useGetMatchDetailsQuery({
    slug: matchSlug,
  });

  return (
    <div>
      {teamsData && teamsData?.length === 0 ? (
        <CreateTeam matchSlug={matchSlug} />
      ) : (
        <Scrollbars
          style={{ height: `${windowHeight - 149 - 31 - 37 - 30}px` }}
        >
          <div className="flex flex-col items-center space-y-3 mt-5">
            {teamsData?.map((t, idx) => (
              <div
                onClick={() =>
                  dispatch(
                    openOtherTeamPreviewPopup({
                      slug: t?.slug,
                      edit: true,
                      matchSlug: matchSlug,
                    })
                  )
                }
                className="w-full"
              >
                <TeamCard
                  key={t.id}
                  title={t?.team_number}
                  points={t?.team_points}
                  wk={t?.no_of_wicketkeppers}
                  bat={t?.no_of_batsman}
                  ar={t?.no_of_all_rounders}
                  bowl={t?.no_of_bowlers}
                  captainName={t?.captain?.name}
                  captainImg={
                    t?.captain?.image_url
                      ? t?.captain?.image_url
                      : t?.captain?.team?.image_url
                  }
                  viceCaptainName={t?.vice_captain?.name}
                  viceCaptainImg={
                    t?.vice_captain?.image_url
                      ? t?.vice_captain?.image_url
                      : t?.vice_captain?.team?.image_url
                  }
                />
              </div>
            ))}
          </div>
        </Scrollbars>
      )}

      {matchDetailsData &&
        matchDetailsData?.match_status !== "ONGOING" &&
        matchDetailsData?.match_status !== "COMPLETED" &&
        matchDetailsData?.match_status !== "DISTRIBUTED" &&
        !timeUp && (
          <div className="w-full grid place-items-center">
            <button
              className="bg-ownOrange w-[142px] h-[37px] rounded-sm m-auto mt-2"
              onClick={() =>
                router.push(`/games/cricket/${matchSlug}/create-team`)
              }
            >
              Create Team
            </button>
          </div>
        )}
    </div>
  );
};

export default MyTeamsTab;
