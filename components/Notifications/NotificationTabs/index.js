import GamePlayTab from "./GamePlayTab";
import OffersTab from "./OffersTab";
import TransactionsTab from "./TransactionsTab";
import { Tab } from "@headlessui/react";
import { useGetNotificationsQuery } from "../../../store/apis/restApi";

const NotificationTabs = (props) => {
  const { data: gamePlayNotificationsData } = useGetNotificationsQuery({
    limit: 1,
    offset: 0,
    status: "GAMEPLAY",
  });

  const { data: transactionNotificationsData } = useGetNotificationsQuery({
    limit: 1,
    offset: 0,
    status: "TRANSACTION",
  });

  const { data: offerNotificationsData } = useGetNotificationsQuery({
    limit: 1,
    offset: 0,
    status: "MESSAGE",
  });

  return (
    <div>
      <Tab.Group as={"div"} className="text-white w-full">
        <Tab.List
          className={"flex overflow-x-scroll justify-between text-[14px] py-2"}
        >
          <Tab>
            {({ selected }) => (
              <p
                className={`${
                  selected &&
                  "bg-gradient-to-r from-[#F97F4E] to-[#E00A14] px-2 rounded-md"
                } whitespace-nowrap pb-1 focus:outline-none`}
              >
                GamePlay (
                {gamePlayNotificationsData
                  ? gamePlayNotificationsData?.count
                  : 0}
                )
              </p>
            )}
          </Tab>
          <Tab>
            {({ selected }) => (
              <p
                className={`${
                  selected &&
                  "bg-gradient-to-r from-[#F97F4E] to-[#E00A14] px-2 rounded-md"
                } whitespace-nowrap pb-1 mx-3 focus:outline-none`}
              >
                Transactions (
                {transactionNotificationsData
                  ? transactionNotificationsData?.count
                  : 0}
                )
              </p>
            )}
          </Tab>
          <Tab>
            {({ selected }) => (
              <p
                className={`${
                  selected &&
                  "bg-gradient-to-r from-[#F97F4E] to-[#E00A14] px-2 rounded-md"
                } whitespace-nowrap pb-1 focus:outline-none`}
              >
                Offers (
                {offerNotificationsData ? offerNotificationsData?.count : 0})
              </p>
            )}
          </Tab>
        </Tab.List>

        <Tab.Panels className={"mt-3"}>
          <Tab.Panel>
            <GamePlayTab />
          </Tab.Panel>
          <Tab.Panel>
            <TransactionsTab />
          </Tab.Panel>
          <Tab.Panel>
            <OffersTab />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default NotificationTabs;
