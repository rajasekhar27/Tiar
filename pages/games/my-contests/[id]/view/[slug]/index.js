import { useRouter } from "next/router";
import { AiOutlineLeft, AiOutlineQuestionCircle } from "react-icons/ai";
import { Tab } from "@headlessui/react";

import { useGetMatchDetailsQuery } from "../../../../../../store/apis/restApi";
import WinningTab from "../../../../../../components/Cricket/ContestInfo/ContestInfoTabs/WinningTab";
import LeaderboardTab from "../../../../../../components/Cricket/ContestInfo/ContestInfoTabs/LeaderboardTab";
import ScoreCard from "../../../../../../components/UserParticipatedMatchDetails/MatchTabs/ScoreCard";
import Stats from "../../../../../../components/UserParticipatedMatchDetails/MatchTabs/Stats";

const MyContestViewPage = (props) => {
  const router = useRouter();

  const { id, slug } = router.query;

  const { data: matchDetailsData } = useGetMatchDetailsQuery({
    slug: id,
  });

  return (
    <div>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <AiOutlineLeft color="white" onClick={() => router.back()} />

          <div className="flex items-center space-x-3 text-white">
            <div className="w-[40px] h-[30px]">
              <img
                src={matchDetailsData?.team1_flag}
                alt=""
                className="w-full h-full object-cover"
                onError={(e) =>
                  !e.target.onerror
                    ? (e.target.src = "/images/tiar_logo_3.svg")
                    : null
                }
              />
            </div>

            <p>vs</p>

            <div className="w-[40px] h-[30px]">
              <img
                onError={(e) =>
                  !e.target.onerror
                    ? (e.target.src = "/images/tiar_logo_3.svg")
                    : null
                }
                src={matchDetailsData?.team2_flag}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <AiOutlineQuestionCircle color="white" />
        </div>

        <div className="flex justify-between items-center mt-3">
          <div>
            <p className="uppercase text-[#888888]">
              {matchDetailsData?.team1}
            </p>
            <h6 className="text-[20px] text-white">
              {matchDetailsData?.team1_score?.score}/
              {matchDetailsData?.team1_score?.wickets}{" "}
              <span className="text-[#888888] text-[10px]">
                ({matchDetailsData?.team1_score?.overs})
              </span>
            </h6>
          </div>

          <div>
            <p
              className={`text-[12px] ${
                matchDetailsData?.match_status === "COMPLETED"
                  ? "text-[#04DC00]"
                  : "text-ownOrange"
              }`}
            >
              {matchDetailsData?.match_status}
            </p>
          </div>

          <div className="text-end">
            <p className="uppercase text-[#888888]">
              {" "}
              {matchDetailsData?.team2}
            </p>
            <h6 className="text-[20px] text-white">
              {matchDetailsData?.team2_score?.score}/
              {matchDetailsData?.team2_score?.wickets}{" "}
              <span className="text-[#888888] text-[10px]">
                ({matchDetailsData?.team2_score?.overs})
              </span>
            </h6>
          </div>
        </div>
      </div>

      <div className="border-t-[0.2px] border-white/50 text-white text-[12px] py-2 grid place-items-center">
        <p>{matchDetailsData?.status}</p>
      </div>

      <Tab.Group>
        <Tab.List
          as="div"
          className={
            "flex space-x-3  justify-evenly whitespace-nowrap overflow-x-auto text-[12px] px-3 py-2 bg-[#3D3B5E] text-white"
          }
        >
          <Tab className={"focus:outline-none"}>
            {({ selected }) => (
              <p
                className={`${
                  selected &&
                  "font-semibold underline underline-offset-[5px] decoration-ownOrange decoration-4"
                }`}
              >
                Winnings
              </p>
            )}
          </Tab>
          <Tab className={"focus:outline-none"}>
            {({ selected }) => (
              <p
                className={`${
                  selected &&
                  "font-semibold underline underline-offset-[5px] decoration-ownOrange decoration-4"
                }`}
              >
                Leaderboard
              </p>
            )}
          </Tab>
          <Tab className={"focus:outline-none"}>
            {({ selected }) => (
              <p
                className={`${
                  selected &&
                  "font-semibold underline underline-offset-[5px] decoration-ownOrange decoration-4"
                }`}
              >
                Scorecard
              </p>
            )}
          </Tab>
          <Tab className={"focus:outline-none"}>
            {({ selected }) => (
              <p
                className={`${
                  selected &&
                  "font-semibold underline underline-offset-[5px] decoration-ownOrange decoration-4"
                }`}
              >
                Stats
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
              topBarHeight={85}
              contestId={slug}
              matchStatus={matchDetailsData?.match_status}
            />
          </Tab.Panel>
          <Tab.Panel>
            <ScoreCard slug={id} />
          </Tab.Panel>
          <Tab.Panel>
            <Stats slug={id} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default MyContestViewPage;
