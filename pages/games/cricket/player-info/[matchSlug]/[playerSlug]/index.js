import { useRouter } from "next/router";

import PlayerInfo from "../../../../../../components/Cricket/PlayerInfo";

const PlayerDetails = (props) => {
  const router = useRouter();

  const { matchSlug, playerSlug } = router.query;

  return <PlayerInfo playerSlug={playerSlug} matchSlug={matchSlug} />;
};

export default PlayerDetails;
