import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import ContestInfo from "../../../../../components/Cricket/ContestInfo";
import Loader from "../../../../../components/UI/Loader";

const ContestDetailsPage = (props) => {
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
      <ContestInfo />
    </div>
  );
};

export default ContestDetailsPage;
