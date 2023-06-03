import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import PointSystem from "../../../../../../components/Cricket/PointSystem";
import TeamPreview from "../../../../../../components/Cricket/TeamPreview";
import TeamSelection from "../../../../../../components/Cricket/TeamSelection";
import CaptainsSelection from "../../../../../../components/Cricket/TeamSelection/CaptainsSelection";
import { setTeam } from "../../../../../../store/slices/cricket";
import { useGetTeamQuery } from "../../../../../../store/apis/restApi";
import Loader from "../../../../../../components/UI/Loader";
import PlayerInfo from "../../../../../../components/Cricket/PlayerInfo";

const TeamEdit = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { status } = useSession();
  const { slug } = router.query;

  const currentScreen = useSelector((state) => state.cricket.currentScreen);
  const playerSlug = useSelector(
    (state) => state.cricket.playerInfoSlugs.playerSlug
  );
  const matchSlug = useSelector(
    (state) => state.cricket.playerInfoSlugs.matchSlug
  );

  const { data: getTeamData } = useGetTeamQuery({
    slug: slug,
  });

  useEffect(() => {
    if (!getTeamData) return;

    const team = {
      captain: getTeamData?.captain,
      viceCaptain: getTeamData?.vice_captain,
      wicketKeepers: getTeamData?.wicket_keeper,
      batsmen: getTeamData?.batsman,
      allRounders: getTeamData?.allrounder,
      bowlers: getTeamData?.bowler,
      credits: getTeamData?.credits,
    };

    dispatch(setTeam(team));
  }, [getTeamData]);

  if (status === "unauthenticated") {
    router.push("/auth");
  }

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <div>
      {/* {currentScreen === 1 && <CreateTeamIntro />} */}
      {currentScreen === 2 && <PointSystem />}
      {currentScreen === 3 && <TeamSelection />}
      {currentScreen === 4 && <TeamPreview />}
      {currentScreen === 5 && <CaptainsSelection edit={true} />}
      {currentScreen === 6 && (
        <PlayerInfo
          redirect={false}
          playerSlug={playerSlug}
          matchSlug={matchSlug}
        />
      )}
    </div>
  );
};

export default TeamEdit;
