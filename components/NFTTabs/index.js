import { Tab } from "@headlessui/react";
import NFTTab from "./NFTTab";

const NFTTabs = (props) => {
  return (
    <Tab.Group as={"div"} className="text-white">
      <Tab.List className={"flex overflow-x-scroll space-x-5 text-[14px] px-3"}>
        <Tab className={"focus:outline-none"}>
          {({ selected }) => (
            <div
              className={`${
                selected ? "border-b-4 border-ownOrange" : ""
              } whitespace-nowrap pb-1 mx-3 focus:outline-none`}
            >
              All NFTs
            </div>
          )}
        </Tab>
        <Tab className={"focus:outline-none"}>
          {({ selected }) => (
            <div
              className={`${
                selected ? "border-b-4 border-ownOrange" : ""
              } whitespace-nowrap pb-1 mx-3 focus:!outline-none`}
            >
              Sports
            </div>
          )}
        </Tab>
        <Tab className={"focus:outline-none"}>
          {({ selected }) => (
            <div
              className={`${
                selected ? "border-b-4 border-ownOrange" : ""
              } whitespace-nowrap pb-1 mx-3 focus:outline-none`}
            >
              Metaverse
            </div>
          )}
        </Tab>
        <Tab className={"focus:outline-none"}>
          {({ selected }) => (
            <div
              className={`${
                selected ? "border-b-4 border-ownOrange" : ""
              } whitespace-nowrap pb-1 mx-3 focus:outline-none`}
            >
              Art
            </div>
          )}
        </Tab>
      </Tab.List>

      <Tab.Panels>
        <NFTTab />
      </Tab.Panels>
    </Tab.Group>
  );
};

export default NFTTabs;
