import LiveMatchesTab from "./LiveMatchesTab";
import TournamentOverviewTab from "./TournamentOverviewTab";
import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import { FaChess } from "react-icons/fa";
import { FiMap } from "react-icons/fi";

const TournamentInfoTabs = (props) => {
  return (
    <div className="text-white mt-5">
      <Tab.Group>
        <Tab.List className={"flex justify-evenly space-x-3 items-center"}>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={`font-medium text-[12px] flex items-center space-x-2 focus:outline-none ${
                  selected &&
                  "bg-gradient-to-r from-[#F97F4E] to-[#E00A14] rounded-lg px-3 py-1"
                }`}
              >
                <span>
                  <FaChess />
                </span>{" "}
                <span>Live Matches</span>
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={`font-medium text-[12px] flex items-center space-x-2 focus:outline-none ${
                  selected &&
                  "bg-gradient-to-r from-[#F97F4E] to-[#E00A14] rounded-lg px-3 py-1"
                }`}
              >
                <span>
                  <FiMap />
                </span>{" "}
                <span>Overview</span>
              </button>
            )}
          </Tab>
        </Tab.List>

        <Tab.Panels className={"mt-3"}>
          <Tab.Panel>
            <LiveMatchesTab />
          </Tab.Panel>
          <Tab.Panel>
            <TournamentOverviewTab />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default TournamentInfoTabs;
