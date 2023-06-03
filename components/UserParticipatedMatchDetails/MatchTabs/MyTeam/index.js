import { useDispatch } from "react-redux";
import { useGetAllTeamsByMatchSlugQuery } from "../../../../store/apis/restApi";
import { openOtherTeamPreviewPopup } from "../../../../store/slices/games";
import CreateTeam from "../../../Cricket/MatchInfo/InfoTabs/MyTeamsTab/CreateTeam";
import TeamCard from "../../../Cricket/MatchInfo/InfoTabs/MyTeamsTab/TeamCard";
import Scrollbars from "react-custom-scrollbars-2";
import { useViewportSize } from "@mantine/hooks";

const MyTeams = ({ slug, timeUp }) => {
  const dispatch = useDispatch();

  const { height: windowHeight } = useViewportSize();

  const { data: teamsData } = useGetAllTeamsByMatchSlugQuery({
    slug: slug,
  });

  return (
    <div>
      {teamsData && teamsData?.length === 0 ? (
        <CreateTeam matchSlug={slug} />
      ) : (
        <Scrollbars style={{ height: windowHeight - 34 - 35 - 136 - 20 }}>
          <div className="flex flex-col items-center space-y-3 mt-5 px-5">
            {teamsData?.map((t, idx) => (
              <div
                className="w-full"
                onClick={() =>
                  dispatch(
                    openOtherTeamPreviewPopup({
                      slug: t?.slug,
                      edit: timeUp ? false : true,
                    })
                  )
                }
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
                    t?.captain?.player_image
                      ? t?.captain?.player_image
                      : t?.captain?.team?.image_url
                  }
                  viceCaptainName={t?.vice_captain?.name}
                  viceCaptainImg={
                    t?.vice_captain?.player_image
                      ? t?.vice_captain?.player_image
                      : t?.vice_captain?.team?.image_url
                  }
                />
              </div>
            ))}
          </div>
        </Scrollbars>
      )}
    </div>
  );
};

export default MyTeams;
