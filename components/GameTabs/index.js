import { Tab } from "@headlessui/react";
import { useState } from "react";
import { TabPanel } from "react-headless-tabs";
import GameCards from "../GameCards";

const GameTabs = (props) => {
  //  ** Tabs Logic
  return (
    <Tab.Group as={"div"} className="text-white">
      <Tab.List className={"flex overflow-x-scroll space-x-5 text-[14px] px-3"}>
        <Tab>
          {({ selected }) => (
            <div
              className={`${
                selected ? "border-b-4 border-ownOrange" : ""
              } whitespace-nowrap pb-1 mx-3 focus:outline-none`}
            >
              All Games
            </div>
          )}
        </Tab>
        <Tab>
          {({ selected }) => (
            <div
              className={`${
                selected ? "border-b-4 border-ownOrange" : ""
              } whitespace-nowrap pb-1 mx-3 focus:!outline-none`}
            >
              Fantasy Sports
            </div>
          )}
        </Tab>
        <Tab>
          {({ selected }) => (
            <div
              className={`${
                selected ? "border-b-4 border-ownOrange" : ""
              } whitespace-nowrap pb-1 mx-3 focus:outline-none`}
            >
              Play to Win
            </div>
          )}
        </Tab>
      </Tab.List>

      <Tab.Panels>
        <Tab.Panel>
          <GameCards />
        </Tab.Panel>
        <Tab.Panel>
          <GameCards type={1} />
        </Tab.Panel>
        <Tab.Panel>
          <GameCards type={2} />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default GameTabs;
