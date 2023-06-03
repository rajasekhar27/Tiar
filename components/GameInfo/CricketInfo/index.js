import { Disclosure } from "@headlessui/react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { cricketConfig } from "../../../data/gameInfoConfig";
import CreateYourTeam from "./CreateYourTeam";
import FantasyPointsSystem from "./FantasyPointsSystem";
import OtherImportantPoints from "./OtherImportantPoints";

const CricketInfo = (props) => {
  return (
    <div className="">
      {/* <img
        src={cricketConfig?.banner}
        alt=""
        className="w-full object-cover h-[176px]"
      /> */}

      <div>
        <DropDownInfo title={"Creating Your Team"}>
          <CreateYourTeam />
        </DropDownInfo>
        <DropDownInfo title={"Fantasy Point System"}>
          <FantasyPointsSystem />
        </DropDownInfo>
        <DropDownInfo title={"Other Important Points"}>
          <OtherImportantPoints />
        </DropDownInfo>
      </div>
    </div>
  );
};

const DropDownInfo = ({ title, children }) => {
  return (
    <Disclosure as={"div"} className="mb-2">
      {({ open }) => (
        <>
          <Disclosure.Button
            className={`w-full flex items-center justify-between px-5 py-3 font-medium text-[18px] ${
              open ? cricketConfig?.highlightColor : "bg-white "
            }`}
          >
            {title}
            {open ? <BiChevronUp size={25} /> : <BiChevronDown size={25} />}
          </Disclosure.Button>
          <Disclosure.Panel>{children}</Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default CricketInfo;
