import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import MatchInfo from "../../../../components/Cricket/MatchInfo";
import Loader from "../../../../components/UI/Loader";

const MatchInfoPage = (props) => {
  const router = useRouter();

  const { status } = useSession();

  if (status === "unauthenticated") {
    router.push("/auth");
  }

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <div>
      <MatchInfo />
    </div>
  );
};

export default MatchInfoPage;
