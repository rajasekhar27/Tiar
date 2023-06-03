import { Tab } from "@headlessui/react";
import ContestsTab from "./ContestsTab";
import MyTeamsTab from "./MyTeamsTab";
import { useRouter } from "next/router";
import {
  useGetMatchDetailsQuery,
  useLazyGetUserParticipatedContestsByMatchSlugQuery,
} from "../../../../store/apis/restApi";
import ContestCard2 from "./ContestsTab/ContetsCard2";
import { useViewportSize } from "@mantine/hooks";
import { useState } from "react";
import Loader from "../../../UI/Loader";
import AuthInfiniteScrollComponent from "../../../Generic/AuthInfiniteScrollComponent";

const InfoTabs = ({ timeUp }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const router = useRouter();

  const { id } = router.query;

  const { data: matchDetailsData } = useGetMatchDetailsQuery({
    slug: id,
  });

  const { height: windowHeight } = useViewportSize();

  return (
    <Tab.Group
      as={"div"}
      className="text-white"
      selectedIndex={selectedIndex}
      onChange={setSelectedIndex}
    >
      <Tab.List
        className={
          "flex overflow-x-scroll justify-between text-[14px] px-3 bg-[#3D3B5E] py-1"
        }
      >
        <Tab className={"focus:outline-none"}>
          {({ selected }) => (
            <div
              className={`${
                selected ? "border-b-2 border-ownOrange" : ""
              } whitespace-nowrap mx-3 focus:outline-none`}
            >
              All Contests
            </div>
          )}
        </Tab>

        <Tab className={"focus:outline-none"}>
          {({ selected }) => (
            <div
              className={`${
                selected ? "border-b-2 border-ownOrange" : ""
              } whitespace-nowrap mx-3 focus:outline-none`}
            >
              My Contests
            </div>
          )}
        </Tab>

        {matchDetailsData &&
          matchDetailsData?.match_status !== "ONGOING" &&
          matchDetailsData?.match_status !== "COMPLETED" &&
          matchDetailsData?.match_status !== "DISTRIBUTED" &&
          !timeUp && (
            <Tab className={"focus:outline-none"}>
              {({ selected }) => (
                <div
                  className={`${
                    selected ? "border-b-2 border-ownOrange" : ""
                  } whitespace-nowrap mx-3 focus:outline-none`}
                >
                  My Teams
                </div>
              )}
            </Tab>
          )}
      </Tab.List>

      <Tab.Panels className={"px-5"}>
        <Tab.Panel>
          <ContestsTab matchSlug={id} timeUp={timeUp} />
        </Tab.Panel>
        <Tab.Panel>
          <AuthInfiniteScrollComponent
            height={windowHeight - 34 - 35 - 136 - 20}
            lazyHook={useLazyGetUserParticipatedContestsByMatchSlugQuery}
            hookParams={{ slug: id }}
            customEnd={<></>}
            customLoader={<Loader />}
            clearParent={true}
            parentClasses={"pt-5 flex flex-col space-y-3"}
            loopKey={(l) => l?.id}
            emptyHandler={
              <div className="font-poppins text-center text-xs  animate__animated animate__flipInX">
                <p>You haven’t Joined a Contest yet !</p>
                <img src="/images/joinContest.png" className="mt-10" />
                <button
                  className="bg-ownOrange mt-10 text-xs font-medium px-4 py-2 rounded-md"
                  onClick={() => setSelectedIndex(0)}
                >
                  JOIN A CONTEST
                </button>
              </div>
            }
          >
            <ContestCard2 />
          </AuthInfiniteScrollComponent>
        </Tab.Panel>
        <Tab.Panel>
          <MyTeamsTab matchSlug={id} timeUp={timeUp} />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default InfoTabs;
