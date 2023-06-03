import { Tab } from "@headlessui/react";
import { useRouter } from "next/router";
import LeaderboardTab from "./LeaderboardTab";
import NFTRewardsTab from "./NFTRewardsTab";
import WinningTab from "./WinningTab";

const ContestInfoTabs = ({ topBarHeight, slug, matchStatus, showNFTTab }) => {
  return showNFTTab ? (
    <Tab.Group as={"div"} className="text-white w-full">
      <Tab.List
        className={
          "flex overflow-x-scroll justify-evenly text-[14px] px-5 border-y border-gray-300 py-2"
        }
      >
        <Tab>
          {({ selected }) => (
            <p
              className={`${
                selected &&
                "bg-gradient-to-r from-[#F97F4E] to-[#E00A14] px-2 rounded-md"
              } whitespace-nowrap pb-1 mx-3 focus:outline-none`}
            >
              Winnings
            </p>
          )}
        </Tab>

        <Tab>
          {({ selected }) => (
            <p
              className={`${
                selected &&
                "bg-gradient-to-r from-[#F97F4E] to-[#E00A14] px-2 rounded-md"
              } whitespace-nowrap pb-1 mx-3 focus:outline-none`}
            >
              NFT Rewards
            </p>
          )}
        </Tab>

        <Tab>
          {({ selected }) => (
            <p
              className={`${
                selected &&
                "bg-gradient-to-r from-[#F97F4E] to-[#E00A14] px-2 rounded-md"
              } whitespace-nowrap pb-1 mx-3 focus:outline-none`}
            >
              Leaderboard
            </p>
          )}
        </Tab>
      </Tab.List>

      <Tab.Panels>
        <Tab.Panel>
          <WinningTab contestId={slug} />
        </Tab.Panel>

        <Tab.Panel>
          <NFTRewardsTab contestId={slug} />
        </Tab.Panel>

        <Tab.Panel>
          <LeaderboardTab
            topBarHeight={topBarHeight}
            contestId={slug}
            matchStatus={matchStatus}
          />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  ) : (
    <Tab.Group as={"div"} className="text-white w-full">
      <Tab.List
        className={
          "flex overflow-x-scroll justify-evenly text-[14px] px-5 border-y border-gray-300 py-2"
        }
      >
        <Tab>
          {({ selected }) => (
            <p
              className={`${
                selected &&
                "bg-gradient-to-r from-[#F97F4E] to-[#E00A14] px-2 rounded-md"
              } whitespace-nowrap py-[2px] mx-3 focus:outline-none`}
            >
              Winnings
            </p>
          )}
        </Tab>

        <Tab>
          {({ selected }) => (
            <p
              className={`${
                selected &&
                "bg-gradient-to-r from-[#F97F4E] to-[#E00A14] px-2 rounded-md"
              } whitespace-nowrap py-[2px] mx-3 focus:outline-none`}
            >
              Leaderboard
            </p>
          )}
        </Tab>
      </Tab.List>

      <Tab.Panels>
        <Tab.Panel>
          <WinningTab contestId={slug} />
        </Tab.Panel>

        <Tab.Panel>
          <LeaderboardTab
            topBarHeight={topBarHeight}
            contestId={slug}
            matchStatus={matchStatus}
          />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default ContestInfoTabs;
