import { Tab } from "@headlessui/react";
import { useRouter } from "next/router";
import MyContests from "./MyContests";
import MyTeam from "./MyTeam";
import ScoreCard from "./ScoreCard";
import Stats from "./Stats";
import Winnings from "./Winnings";

const MatchTabs = ({ timeUp }) => {
  const router = useRouter();

  const { id } = router.query;

  return (
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
              My Contests
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
              My Teams
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
        {/* <Tab className="">
          {({ selected }) => (
            <p className={`${selected && "font-semibold"}`}>Winnings</p>
          )}
        </Tab> */}
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
          <MyContests slug={id} />
        </Tab.Panel>
        <Tab.Panel>
          <MyTeam slug={id} timeUp={timeUp} />
        </Tab.Panel>
        <Tab.Panel>
          <ScoreCard slug={id} />
        </Tab.Panel>
        {/* <Tab.Panel>
          <Winnings slug={slug} />
        </Tab.Panel> */}
        <Tab.Panel>
          <Stats slug={id} />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default MatchTabs;
