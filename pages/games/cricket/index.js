import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import UpcomingMatches from "../../../components/Cricket/UpcomingMatches";
import Loader from "../../../components/UI/Loader";

const Cricket = (props) => {
  const router = useRouter();

  const { status } = useSession();

  if (status === "unauthenticated") {
    router.push("/auth");
  }

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <div className="">
      <UpcomingMatches />
    </div>
  );
};

export default Cricket;
