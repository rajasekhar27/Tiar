import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import Events from "../../../components/duplicate/Events";
import {
  boxingNfts,
  firstWbc,
  hflIntroduction,
} from "../../../data/articleData";
import Loader from "../../../components/UI/Loader";

const ArticlePage = (props) => {
  const router = useRouter();
  const { status } = useSession();

  const { id } = router.query;

  const articleViewer = (id) => {
    switch (id) {
      case "1":
        return hflIntroduction;

      case "2":
        return boxingNfts;

      case "3":
        return firstWbc;

      default:
        break;
    }
  };

  if (status === "unauthenticated") {
    router.push("/auth");
  }

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <div>
      <Events data={articleViewer(id)} />
    </div>
  );
};

export default ArticlePage;
