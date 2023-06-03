import { useViewportSize } from "@mantine/hooks";
import { getWalletType } from "../../../../../helpers/getWalletType";
import {
  useGetContestWinningQuery,
  useLazyGetAllContestWinningsQuery,
} from "../../../../../store/apis/restApi";
import AuthInfiniteScrollComponent from "../../../../Generic/AuthInfiniteScrollComponent";

const WinningTab = ({ contestId }) => {
  const { height: windowHeight } = useViewportSize();

  const { data: winningData } = useGetContestWinningQuery(
    {
      slug: contestId,
    },
    { skip: !contestId }
  );

  return (
    <div className="">
      {/* <p className="text-[10px] my-2">
        Be the first in your network to join this contest
      </p> */}

      <div className="text-[12px] mt-5 text-white">
        <div className="flex justify-between font-bold pb-1 bg-black/20 px-5">
          <p>Rank</p>
          <p>Winnings</p>
        </div>

        <AuthInfiniteScrollComponent
          lazyHook={useLazyGetAllContestWinningsQuery}
          hookParams={{ slug: contestId }}
          parentClasses={"space-y-0"}
          height={windowHeight - 303 - 160}
          customEnd={<></>}
        >
          <WinningsCard />
        </AuthInfiniteScrollComponent>

        {/* {winningData?.winnings?.map((w, idx) => {
          return (
            <div
              className={`flex justify-between mt-1 py-3 px-5  ${
                idx === 0
                  ? "bg-white/20"
                  : idx === 1
                  ? "bg-white/10"
                  : idx === 2
                  ? "bg-white/5"
                  : "bg-black/20"
              }`}
              key={w.id}
            >
              <div className="flex space-x-1">
                {idx === 0 && <img src="/images/badge_1.svg" alt="" />}
                {idx === 1 && <img src="/images/badge_2.svg" alt="" />}
                {idx === 2 && <img src="/images/badge_3.svg" alt="" />}
                <p>{idx <= 2 ? w?.rank_1 : `#${w?.rank_1}`}</p>
              </div>

              <div className="flex items-center space-x-2">
                <p>{w?.price}</p>
              </div>
            </div>
          );
        })} */}
      </div>
    </div>
  );
};

const WinningsCard = ({ data, idx }) => {
  return (
    <div
      className={`flex justify-between mt-1 py-3 px-5  ${
        idx === 0
          ? "bg-white/20"
          : idx === 1
          ? "bg-white/10"
          : idx === 2
          ? "bg-white/5"
          : "bg-black/20"
      }`}
      key={data.id}
    >
      <div className="flex space-x-1">
        {idx === 0 && <img src="/images/badge_1.svg" alt="" />}
        {idx === 1 && <img src="/images/badge_2.svg" alt="" />}
        {idx === 2 && <img src="/images/badge_3.svg" alt="" />}
        <p>{idx <= 2 ? data?.rank_1 : `#${data?.rank_1}`}</p>
      </div>

      <div className="flex items-center space-x-2">
        <p>{data?.price}</p>
      </div>
    </div>
  );
};

export default WinningTab;
