import { Tab } from "@headlessui/react";
import {
  cricketConfig,
  odFantasyPoints,
  otherT20FantasyPoints,
  sixtyFantasyPoints,
  t10FantasyPoints,
  t20FantasyPoints,
  testFantasyPoints,
  theHundredFantasyPoints,
} from "../../../../data/gameInfoConfig";
import PointsInfo from "./PointsInfo";

const FantasyPointsSystem = (props) => {
  const types = [
    {
      id: 1,
      name: "T20",
    },
    {
      id: 2,
      name: "OD",
    },
    {
      id: 3,
      name: "TEST",
    },
    {
      id: 4,
      name: "T10",
    },
    {
      id: 5,
      name: "6ixty",
    },
    {
      id: 6,
      name: "Other T20",
    },
    {
      id: 7,
      name: "Other OD",
    },
  ];

  return (
    <Tab.Group as={"div"} className="mt-3 px-2">
      <Tab.List className={"bg-white grid grid-cols-7"}>
        {types?.map((t) => (
          <Tab key={t.id} className="border-x h-full">
            {({ selected }) => (
              <div
                className={`text-[12px] ${
                  selected && cricketConfig?.highlightColor
                } h-full grid place-items-center`}
              >
                <p>{t.name}</p>
              </div>
            )}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className={"p-5"}>
        <Tab.Panel>
          <PointsInfo data={t20FantasyPoints} />
        </Tab.Panel>
        <Tab.Panel>
          <PointsInfo data={odFantasyPoints} />
        </Tab.Panel>
        <Tab.Panel>
          <PointsInfo data={testFantasyPoints} />
        </Tab.Panel>
        <Tab.Panel>
          <PointsInfo data={t10FantasyPoints} />
        </Tab.Panel>
        <Tab.Panel>
          <PointsInfo data={sixtyFantasyPoints} />
        </Tab.Panel>
        <Tab.Panel>
          <PointsInfo data={theHundredFantasyPoints} />
        </Tab.Panel>
        <Tab.Panel>
          <PointsInfo data={otherT20FantasyPoints} />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default FantasyPointsSystem;
