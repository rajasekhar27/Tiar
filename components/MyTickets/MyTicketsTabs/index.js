import { Tab } from "@headlessui/react";
import { useViewportSize } from "@mantine/hooks";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import {
  useLazyGetAllTicketsQuery,
  useRequestCustomerCareChatMutation,
} from "../../../store/apis/restApi";
import AuthInfiniteScrollComponent from "../../Generic/AuthInfiniteScrollComponent";
import TicketCard from "./TicketCard";

const MyTicketsTabs = (props) => {
  const { height: windowHeight } = useViewportSize();
  const router = useRouter();

  const [requestCustomerCareChat] = useRequestCustomerCareChatMutation();

  const handleCustomerCare = () => {
    requestCustomerCareChat().then((res) => {
      console.log("reeee", res);
      if (res.data) {
        router.push(`/support/chat/${res.data?.chat_group}`);
      }

      if (res.error) {
        console.log("err", res.error);
        toast.error(res.error.data.message);
      }
    });
  };

  return (
    <div>
      <Tab.Group>
        <Tab.List
          className={
            "flex items-center space-x-3 overflow-x-auto text-white px-3 text-[12px] justify-between font-medium border-y py-2"
          }
        >
          <Tab>
            {({ selected }) => (
              <button
                className={`${
                  selected && "bg-gradient-to-r from-[#F97F4E] to-[#E00A14]"
                } w-full px-2 py-1 rounded-md`}
              >
                Pending
              </button>
            )}
          </Tab>
          <Tab>
            {({ selected }) => (
              <button
                className={`${
                  selected && "bg-gradient-to-r from-[#F97F4E] to-[#E00A14]"
                } w-full px-2 py-1 rounded-md`}
              >
                Assigned
              </button>
            )}
          </Tab>
          <Tab>
            {({ selected }) => (
              <button
                className={`${
                  selected && "bg-gradient-to-r from-[#F97F4E] to-[#E00A14]"
                } w-full px-2 py-1 rounded-md`}
              >
                InProgress
              </button>
            )}
          </Tab>
          <Tab>
            {({ selected }) => (
              <button
                className={`${
                  selected && "bg-gradient-to-r from-[#F97F4E] to-[#E00A14]"
                } w-full px-2 py-1 rounded-md`}
              >
                Completed
              </button>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel className={"p-5"}>
            <AuthInfiniteScrollComponent
              height={windowHeight - 27 - 44 - 44 - 30 - 70}
              lazyHook={useLazyGetAllTicketsQuery}
              hookParams={{ status: "PENDING" }}
              customEnd={<></>}
              emptyHandler={<EmptyComponent />}
            >
              <TicketCard status={"PENDING"} />
            </AuthInfiniteScrollComponent>
          </Tab.Panel>
          <Tab.Panel className={"p-5"}>
            <AuthInfiniteScrollComponent
              height={windowHeight - 27 - 44 - 44 - 30 - 70}
              lazyHook={useLazyGetAllTicketsQuery}
              hookParams={{ status: "APPROVED" }}
              customEnd={<></>}
              emptyHandler={<EmptyComponent />}
            >
              <TicketCard status={"APPROVED"} />
            </AuthInfiniteScrollComponent>
          </Tab.Panel>
          <Tab.Panel className={"p-5"}>
            <AuthInfiniteScrollComponent
              height={windowHeight - 27 - 44 - 44 - 30 - 70}
              lazyHook={useLazyGetAllTicketsQuery}
              hookParams={{ status: "PROCESSING" }}
              customEnd={<></>}
              emptyHandler={<EmptyComponent />}
            >
              <TicketCard status={"PROCESSING"} />
            </AuthInfiniteScrollComponent>
          </Tab.Panel>
          <Tab.Panel className={"p-5"}>
            <AuthInfiniteScrollComponent
              height={windowHeight - 27 - 44 - 44 - 30 - 70}
              lazyHook={useLazyGetAllTicketsQuery}
              hookParams={{ status: "COMPLETED" }}
              customEnd={<></>}
              emptyHandler={<EmptyComponent />}
            >
              <TicketCard status={"COMPLETED"} />
            </AuthInfiniteScrollComponent>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      <div className="fixed bottom-0 w-full px-5 pb-5 max-w-[450px]">
        <button
          className="w-full bg-ownOrange rounded-md h-[44px] text-white text-[16px] font-semibold"
          onClick={handleCustomerCare}
        >
          Customer Care
        </button>
      </div>
    </div>
  );
};

const EmptyComponent = () => {
  return (
    <div className="flex flex-col items-center pt-10  text-white">
      <img src="/images/no_tickets.png" alt="" className="w-[280px]" />
      <p className="opacity-50">No Tickets</p>
    </div>
  );
};

export default MyTicketsTabs;
