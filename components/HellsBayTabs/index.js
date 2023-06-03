import { Tab } from "@headlessui/react";
import NewsFeedTab from "./NewsFeedTab";
import StatsTab from "./StatsTab";
import StoreTab from "./StoreTab";
import EventsTab from "./EventsTab/index.js";
import { Fragment } from "react";
import BoxersTab from "./BoxersTab";
import WardroidsV2 from "../Wardroidsv2";

// import { Tabs, Tab } from "@tarragon/swipeable-tabs";

const HellsBayTabs = (props) => {
  return (
    <Tab.Group as={"div"} className="text-white" defaultIndex={2}>
      <Tab.List
        className={
          "flex overflow-x-scroll space-x-5 text-[14px] px-3 justify-evenly w-full"
        }
      >
        <Tab as={Fragment}>
          {({ selected }) => (
            <div
              className={`${
                selected ? "border-b-4 border-ownPurple1" : ""
              } whitespace-nowrap pb-1 focus:outline-none focus:ring-0`}
            >
              Feed
            </div>
          )}
        </Tab>
        <Tab as={Fragment}>
          {({ selected }) => (
            <div
              className={`${
                selected ? "border-b-4 border-ownPurple1" : ""
              } whitespace-nowrap pb-1 focus:outline-none focus:ring-0`}
            >
              Videos
            </div>
          )}
        </Tab>

        <Tab as={Fragment}>
          {({ selected }) => (
            <div
              className={`${
                selected ? "border-b-4 border-ownPurple1" : ""
              } whitespace-nowrap pb-1 focus:outline-none focus:ring-0`}
            >
              Wardroids
            </div>
          )}
        </Tab>

        <Tab as={Fragment}>
          {({ selected }) => (
            <div
              className={`${
                selected ? "border-b-4 border-ownPurple1" : ""
              } whitespace-nowrap pb-1 focus:outline-none focus:ring-0`}
            >
              Clubs
            </div>
          )}
        </Tab>

        <Tab as={Fragment}>
          {({ selected }) => (
            <div
              className={`${
                selected ? "border-b-4 border-ownPurple1" : ""
              } whitespace-nowrap pb-1 focus:outline-none focus:ring-0`}
            >
              Fighters
            </div>
          )}
        </Tab>

        {/* <Tab as={Fragment}>
          {({ selected }) => (
            <div
              className={`${
                selected ? "border-b-4 border-ownPurple1" : ""
              } whitespace-nowrap pb-1 focus:outline-none focus:ring-0`}
            >
              Store
            </div>
          )}
        </Tab> */}
      </Tab.List>

      <Tab.Panels>
        <Tab.Panel>
          <NewsFeedTab />
        </Tab.Panel>
        <Tab.Panel>
          <EventsTab />
        </Tab.Panel>
        <Tab.Panel>
          {/* <StoreTab /> */}
          <WardroidsV2 />
        </Tab.Panel>
        <Tab.Panel>
          <StatsTab />
        </Tab.Panel>
        <Tab.Panel>
          <BoxersTab />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

// const HellsBayTabs = (props) => {
//   const [selectedTab, setSelectedTab] = useState("Feed");

//   const changeTab = (updatedTab) => {
//     setSelectedTab(updatedTab.label);
//   };

//   return (
//     <div className="text-white">
//       <Tabs
//         value={selectedTab}
//         onChange={changeTab}
//         tabBarCSS={``}
//         styleProps={{
//           barColor: "transparent",
//           selectedHeaderTextColor: "#FFFFFF",
//           activeInkBarColor: "#B15FE8",
//           inkBarColor: "#0A0C32",
//           size: "small",
//           // headerTextColor: "hsla(0,0%,100%,.45)",
//           // tabPosition: "top",
//         }}
//         blacklistedElement={{
//           identifierType: "className",
//           identifierName: "block-swipe-tabs",
//         }}
//       >
//         <Tab label="Feed" key={0}>
//           <NewsFeedTab />
//         </Tab>
//         <Tab label="Videos" key={1}>
//           <EventsTab />
//         </Tab>
//         <Tab label="Boxers" key={2}>
//           <BoxersTab />
//         </Tab>
//         <Tab label="Clubs" key={3}>
//           <StatsTab />
//         </Tab>
//         <Tab label="Store" key={3}>
//           <StoreTab />
//         </Tab>
//       </Tabs>
//     </div>
//   );
// };

export default HellsBayTabs;
