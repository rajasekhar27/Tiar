import { Tab } from "@headlessui/react";
import NFTTab from "./NFTTab";
import TokenTab from "./TokenTab";

const WalletTabs = ({ tabIndex, setTabIndex }) => {
  return (
    <Tab.Group
      as={"div"}
      selectedIndex={tabIndex}
      className="my-7"
      onChange={setTabIndex}
    >
      <Tab.List
        className={"w-full flex justify-evenly text-center text-[14px]"}
      >
        <Tab className={"w-1/2 focus:outline-none"}>
          {({ selected }) => (
            <div className={selected ? "border-b-4 pb-1 border-ownOrange" : ""}>
              Tokens
            </div>
          )}
        </Tab>
        <Tab className={"w-1/2 focus:outline-none"}>
          {({ selected }) => (
            <div className={selected ? "border-b-4 pb-1 border-ownOrange" : ""}>
              NFTs
            </div>
          )}
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <TokenTab />
        </Tab.Panel>
        <Tab.Panel>
          <NFTTab />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default WalletTabs;
