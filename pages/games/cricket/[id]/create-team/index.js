import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import PlayerInfo from "../../../../../components/Cricket/PlayerInfo";
import PointSystem from "../../../../../components/Cricket/PointSystem";
import TeamPreview from "../../../../../components/Cricket/TeamPreview";
// import TeamSelection from "../../../../../components/Cricket/TeamSelection";
import CaptainsSelection from "../../../../../components/Cricket/TeamSelection/CaptainsSelection";
import { reset } from "../../../../../store/slices/cricket";
import Loader from "../../../../../components/UI/Loader";

const TeamSelection = dynamic(
  () => import("../../../../../components/Cricket/TeamSelection"),
  { ssr: false }
);

// import CreateTeamIntro from "../../../../../components/Cricket/MatchInfo/InfoTabs/MyTeamsTab/CreateTeam/CreateTeamIntro";

const CreateTeam = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { status } = useSession();

  const currentScreen = useSelector((state) => state.cricket.currentScreen);
  const playerSlug = useSelector(
    (state) => state.cricket.playerInfoSlugs.playerSlug
  );
  const matchSlug = useSelector(
    (state) => state.cricket.playerInfoSlugs.matchSlug
  );

  useEffect(() => {
    dispatch(reset());
  }, []);

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
      {currentScreen === 5 && <CaptainsSelection />}
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

export default CreateTeam;
