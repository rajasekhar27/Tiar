import { useRouter } from "next/router";

import MatchWinners from "../../../../../components/Cricket/MatchWinners";

const WinnersOfMatchPage = (props) => {
  const router = useRouter();

  const { id } = router.query;

  return (
    <div>
      <MatchWinners slug={id} />
    </div>
  );
};

export default WinnersOfMatchPage;
