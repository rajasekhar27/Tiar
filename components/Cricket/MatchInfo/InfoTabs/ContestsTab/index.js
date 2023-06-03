import { useRouter } from "next/router";
import {
  useGetMatchDetailsQuery,
  useLazyGetMatchContestsBySlugQuery,
} from "../../../../../store/apis/restApi";
import ContestCard from "./ContestCard1";
import { useViewportSize } from "@mantine/hooks";
import Loader from "../../../../UI/Loader";
import AuthInfiniteScrollComponent from "../../../../Generic/AuthInfiniteScrollComponent";

const ContestsTab = ({ matchSlug, timeUp }) => {
  const router = useRouter();

  const { height: windowHeight } = useViewportSize();

  const { data: matchDetailsData } = useGetMatchDetailsQuery({
    slug: matchSlug,
  });

  return (
    <div className="pb-[90px]">
      <AuthInfiniteScrollComponent
        height={windowHeight - (128 + 30 + 80 + 10 + 30)}
        lazyHook={useLazyGetMatchContestsBySlugQuery}
        hookParams={{ slug: matchSlug }}
        customEnd={<></>}
        customLoader={<Loader />}
        clearParent={true}
        parentClasses={"pt-5 flex flex-col space-y-3"}
        loopKey={(l) => l?.id}
      >
        <ContestCard />
      </AuthInfiniteScrollComponent>

      <div className="fixed bottom-0 w-full left-0 right-0 flex justify-center items-center bg-ownBlue1 h-[80px] px-5 text-[12px] md:max-w-[450px]">
        {/* <button
          className="bg-transparent border-[1px] border-ownOrange w-[142px] h-[37px] rounded-sm invisible"
          onClick={() => router.push("/games/my-contests")}
        >
          My Contests
        </button> */}

        {matchDetailsData &&
          matchDetailsData?.match_status !== "ONGOING" &&
          matchDetailsData?.match_status !== "COMPLETED" &&
          matchDetailsData?.match_status !== "DISTRIBUTED" &&
          !timeUp && (
            <button
              className="bg-ownOrange w-[142px] h-[37px] rounded-sm maut"
              onClick={() =>
                router.push(`/games/cricket/${matchSlug}/create-team`)
              }
            >
              Create Team
            </button>
          )}
      </div>
    </div>
  );
};

export default ContestsTab;
