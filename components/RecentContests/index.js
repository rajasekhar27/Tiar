import { AiOutlineLeft } from "react-icons/ai";
import CricketContestCard from "../CricketContestCard";
import AuthInfiniteScrollComponent from "../Generic/AuthInfiniteScrollComponent/index";
import {
  useLazyGetOpponentRecentPlayedMatchesQuery,
  useLazyUserRecentlyPlayedContestsQuery,
} from "../../store/apis/restApi";
import { useRouter } from "next/router";
import { useViewportSize } from "@mantine/hooks";
import { Tab } from "@headlessui/react";
import Loader from "../UI/Loader";
import { useSelector } from "react-redux";

const RecentContests = (props) => {
  const router = useRouter();

  const { height: windowHeight } = useViewportSize();
  const { user } = router.query;

  return (
    <div className="p-5">
      <div className="flex items-center space-x-3 mb-5 text-white">
        <AiOutlineLeft color="white" onClick={() => router.back()} />
        <p className="text-[18px] font-semibold">Recently Played Contests</p>
      </div>

      {user ? (
        <AuthInfiniteScrollComponent
          lazyHook={useLazyGetOpponentRecentPlayedMatchesQuery}
          parentClasses={"flex flex-col items-center space-y-5"}
          clearParent={true}
          height={windowHeight - 100}
          customEnd={<></>}
          customLoader={<Loader />}
          hookParams={{ status: "COMPLETED", slug: user }}
          emptyHandler={
            <div className="flex flex-col items-center space-y-2 text-[14px] text-ownOrange animate__animated animate__zoomIn">
              <div className="h-[300px]">
                <img src="/images/team.svg" alt="" className="w-full h-full" />
              </div>
              <h1>No Matches Played Recently</h1>
            </div>
          }
        >
          <Card />
        </AuthInfiniteScrollComponent>
      ) : (
        <div>
          <Tab.Group>
            <Tab.List
              className={
                "flex items-center justify-evenly mb-2 border-y-[0.5px] text-[12px] py-2 text-white"
              }
            >
              <Tab className={"focus:outline-none"}>
                {({ selected }) => (
                  <div
                    className={`flex items-center space-x-1 ${
                      selected &&
                      "bg-gradient-to-r from-[#E00A14] to-[#F97F4E] px-2 p-1 rounded-lg"
                    }`}
                  >
                    {/* {selected ? <AiFillClockCircle /> : <AiOutlineClockCircle />} */}
                    <p>Ongoing</p>
                  </div>
                )}
              </Tab>

              <Tab className={"focus:outline-none"}>
                {({ selected }) => (
                  <div
                    className={`flex items-center space-x-1 ${
                      selected &&
                      "bg-gradient-to-r from-[#E00A14] to-[#F97F4E] px-2 p-1 rounded-lg"
                    }`}
                  >
                    <p>Upcoming</p>
                  </div>
                )}
              </Tab>

              <Tab className={"focus:outline-none"}>
                {({ selected }) => (
                  <div
                    className={`flex items-center space-x-1 ${
                      selected &&
                      "bg-gradient-to-r from-[#E00A14] to-[#F97F4E] px-2 p-1 rounded-lg"
                    }`}
                  >
                    <p>Completed</p>
                  </div>
                )}
              </Tab>
            </Tab.List>

            <Tab.Panels className={"mt-5"}>
              <Tab.Panel>
                <AuthInfiniteScrollComponent
                  lazyHook={useLazyUserRecentlyPlayedContestsQuery}
                  parentClasses={"flex flex-col items-center space-y-5"}
                  clearParent={true}
                  height={windowHeight - 100 - 30}
                  customEnd={<></>}
                  customLoader={<Loader />}
                  hookParams={{ status: "ONGOING" }}
                  emptyHandler={
                    <div className="flex flex-col items-center space-y-2 text-[14px] text-ownOrange animate__animated animate__zoomIn">
                      <div className="h-[300px]">
                        <img
                          src="/images/shugging.svg"
                          alt=""
                          className="w-full h-full"
                        />
                      </div>
                      <h1>No Matches Played Recently</h1>
                    </div>
                  }
                >
                  <Card />
                </AuthInfiniteScrollComponent>
              </Tab.Panel>
              <Tab.Panel>
                <AuthInfiniteScrollComponent
                  lazyHook={useLazyUserRecentlyPlayedContestsQuery}
                  parentClasses={"flex flex-col items-center space-y-5"}
                  clearParent={true}
                  height={windowHeight - 100 - 30}
                  customEnd={<></>}
                  customLoader={<Loader />}
                  hookParams={{ status: "UPCOMING" }}
                  emptyHandler={
                    <div className="flex flex-col items-center space-y-2 text-[14px] text-ownOrange animate__animated animate__zoomIn">
                      <div className="h-[300px]">
                        <img
                          src="/images/bats man.svg"
                          alt=""
                          className="w-full h-full"
                        />
                      </div>
                      <h1>No Matches Played Recently</h1>
                    </div>
                  }
                >
                  <Card />
                </AuthInfiniteScrollComponent>
              </Tab.Panel>
              <Tab.Panel>
                <AuthInfiniteScrollComponent
                  lazyHook={useLazyUserRecentlyPlayedContestsQuery}
                  parentClasses={"flex flex-col items-center space-y-5"}
                  clearParent={true}
                  height={windowHeight - 100 - 30}
                  customEnd={<></>}
                  customLoader={<Loader />}
                  hookParams={{ status: "COMPLETED" }}
                  emptyHandler={
                    <div className="flex flex-col items-center space-y-2 text-[14px] text-ownOrange animate__animated animate__zoomIn">
                      <div className="h-[300px]">
                        <img
                          src="/images/team.svg"
                          alt=""
                          className="w-full h-full"
                        />
                      </div>
                      <h1>No Matches Played Recently</h1>
                    </div>
                  }
                >
                  <Card />
                </AuthInfiniteScrollComponent>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      )}
    </div>
  );
};

const Card = ({ data }) => {
  const router = useRouter();

  return (
    <div
      className="w-full animate__animated animate__zoomIn"
      onClick={() => router.push(`/games/my-contests/${data?.slug}`)}
    >
      <CricketContestCard
        key={data?.id}
        highestPoints={data?.highest_points?.highest_points}
        teamName={data?.highest_points?.team_name}
        team1Img={data?.team_1?.image_url}
        team2Img={data?.team_2?.image_url}
        team1Name={data?.team_1?.team_s_name}
        team2Name={data?.team_2?.team_s_name}
        teamsCreated={data?.teams_created}
        status={data?.status}
        date={data?.match_ist_time}
        enteredContests={data?.no_of_times_entered}
      />
    </div>
  );
};

export default RecentContests;
