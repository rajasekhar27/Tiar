import { Tab } from "@headlessui/react";
import { games } from "../../data/gameInfoConfig";
import { Fragment } from "react";
import CricketInfo from "./CricketInfo";

const GameInfo = (props) => {
  return (
    <div>
      <Tab.Group>
        <Tab.List className="bg-white flex space-x-4 justify-evenly overflow-x-auto">
          {games.map((g) => (
            <Tab as={Fragment}>
              {({ selected }) => (
                <div
                  className={`py-1 flex flex-col items-center ${
                    selected && "border-b-2 border-red-500"
                  }`}
                >
                  {g.isImg ? (
                    <img src={selected ? g.iconHighlight : g.icon} />
                  ) : selected ? (
                    g.iconHighlight
                  ) : (
                    g.icon
                  )}
                  <p
                    className={`text-[10px] font-medium ${
                      selected && "text-ownOrange"
                    }`}
                  >
                    {g.name}
                  </p>
                </div>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <CricketInfo />
          </Tab.Panel>
          <Tab.Panel>Content 2</Tab.Panel>
          <Tab.Panel>Content 3</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default GameInfo;
