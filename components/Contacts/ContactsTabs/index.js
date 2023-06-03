import { Tab } from "@headlessui/react";
import ContactsOnTiar from "./ContactsOnTiar";
import InviteFriends from "./InviteFriends";

const ContactsTabs = (props) => {
  return (
    <Tab.Group as={"div"} className="text-white w-full">
      <Tab.List
        className={
          "flex overflow-x-scroll justify-evenly text-[14px] px-5 border-y border-gray-300 py-2"
        }
      >
        <Tab className={"focus:outline-none"}>
          {({ selected }) => (
            <p
              className={`${
                selected &&
                "bg-gradient-to-r from-[#F97F4E] to-[#E00A14] px-2 rounded-md"
              } whitespace-nowrap pb-1 mx-3 focus:outline-none`}
            >
              Contacts on TIAR
            </p>
          )}
        </Tab>
        <Tab className={"focus:outline-none"}>
          {({ selected }) => (
            <p
              className={`${
                selected &&
                "bg-gradient-to-r from-[#F97F4E] to-[#E00A14] px-2 rounded-md"
              } whitespace-nowrap pb-1 mx-3 focus:outline-none`}
            >
              Invite Friends
            </p>
          )}
        </Tab>
      </Tab.List>

      <Tab.Panels>
        <Tab.Panel>
          <ContactsOnTiar />
        </Tab.Panel>
        <Tab.Panel>
          <InviteFriends />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default ContactsTabs;
