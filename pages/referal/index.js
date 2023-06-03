import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Referal from "../../components/Referal";
import Loader from "../../components/UI/Loader";

const ReferalPage = (props) => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/auth");
  }

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <div>
      <Referal />
    </div>
  );
};

export default ReferalPage;
