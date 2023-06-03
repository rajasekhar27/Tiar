import { useLazyGetUserParticipatedContestsByMatchSlugQuery } from "../../../../store/apis/restApi";
import AuthInfiniteScrollComponent from "../../../Generic/AuthInfiniteScrollComponent/index";
import { useViewportSize } from "@mantine/hooks";
import ContestCard2 from "../../../Cricket/MatchInfo/InfoTabs/ContestsTab/ContetsCard2";
import Loader from "../../../UI/Loader";

const MyContests = ({ slug }) => {
  const { height: windowHeight } = useViewportSize();

  return (
    <div className=" px-5">
      <AuthInfiniteScrollComponent
        height={windowHeight - 34 - 35 - 136 - 20}
        lazyHook={useLazyGetUserParticipatedContestsByMatchSlugQuery}
        hookParams={{ slug: slug }}
        customEnd={<></>}
        customLoader={<Loader />}
        clearParent={true}
        parentClasses={"pt-5 flex flex-col space-y-3"}
        loopKey={(l) => l?.id}
      >
        <ContestCard2 myContestInfoRoute={true} matchSlug={slug} />
      </AuthInfiniteScrollComponent>
    </div>
  );
};

export default MyContests;
