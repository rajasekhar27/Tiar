import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loader from "../../components/UI/Loader";

import WardroidsV2 from "../../components/Wardroidsv2";

const WardroidsPage = (props) => {
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
      <WardroidsV2 />
    </div>
  );
};

export default WardroidsPage;
