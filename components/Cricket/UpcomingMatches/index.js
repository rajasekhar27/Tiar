import MatchCard from "./MatchCard";
import { FiBell } from "react-icons/fi";
import { BsChevronLeft } from "react-icons/bs";
import {
  useLazyGetAllUpcomingMatchesQuery,
  useGetUserProfileDetailsQuery,
  useLazyUserRecentlyPlayedContestsQuery,
} from "../../../store/apis/restApi";
import { useEffect, useState } from "react";
import { useViewportSize } from "@mantine/hooks";
import { useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Tab } from "@headlessui/react";
import {
  AiOutlineClockCircle,
  AiFillClockCircle,
  AiFillTrophy,
  AiOutlineTrophy,
} from "react-icons/ai";
import { HiOutlineUserCircle, HiUserCircle } from "react-icons/hi";
import CricketContestCard from "../../CricketContestCard";
import WinnersTab from "../WinnersTab";
import { ImInfo } from "react-icons/im";
import PointSystem from "../PointSystem";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentScreen } from "../../../store/slices/cricket";
import { profileShuffle } from "../../../helpers/profileShuffle";
import Loader from "../../UI/Loader";
import AuthInfiniteScrollComponent from "../../Generic/AuthInfiniteScrollComponent";
import MatchCard2 from "./MatchCard2";

const UpcomingMatches = (props) => {
  const [topBarHeight, setTopBarHeight] = useState(0);

  const topBarRef = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const { height: windowHeight } = useViewportSize();
  const { data: userData } = useGetUserProfileDetailsQuery();

  const currentScreen = useSelector((state) => state.cricket.currentScreen);

  useEffect(() => {
    if (topBarRef?.current) {
      setTopBarHeight(topBarRef?.current?.clientHeight);
    }
  }, [topBarRef]);

  return (
    <>
      {currentScreen === 2 ? (
        <PointSystem />
      ) : (
        <div className="text-white">
          <div className="px-5" ref={topBarRef}>
            <div className="flex justify-between items-start h-[30px] my-7 relative">
              <div className="flex space-x-3 items-start">
                <BsChevronLeft color="white" onClick={() => router.back()} />
                <div className="flex flex-col space-y-3 items-center">
                  <ImInfo
                    color="white"
                    onClick={() => dispatch(setCurrentScreen(2))}
                  />
                  <p className="p-1 text-[10px] font-[400] bg-white/20 rounded-full">
                    How to play?
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Link href="/">
                  <img
                    src="/images/tiar_logo_1.svg"
                    alt=""
                    className="h-[12px]"
                  />
                </Link>
                <p className="font-semibold text-[18px] text-white">
                  Fantasy Cricket
                </p>
              </div>

              <div className="flex space-x-2 items-start">
                <FiBell
                  size={20}
                  color="white"
                  onClick={() => router.push("/notifications")}
                />
                <div className="w-[20px] h-[20px] overflow-hidden rounded-full">
                  <img
                    onError={(e) =>
                      !e.target.onerror
                        ? (e.target.src = "/images/tiar_logo_3.svg")
                        : null
                    }
                    src={
                      userData?.user_profile?.image
                        ? `${process.env.NEXT_PUBLIC_BACKEND_IMG_BASEURL}${userData?.user_profile?.image}`
                        : profileShuffle()
                    }
                    className="w-full h-full bg-white"
                    alt=""
                    onClick={() => router.push(`/profile`)}
                  />
                </div>
              </div>
            </div>
          </div>

          <Tab.Group>
            <Tab.List
              className={
                "flex items-center justify-evenly border-y-[0.5px] text-[12px] py-2"
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
                    {selected ? (
                      <AiFillClockCircle />
                    ) : (
                      <AiOutlineClockCircle />
                    )}
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
                    {selected ? <HiUserCircle /> : <HiOutlineUserCircle />}
                    <p>My Matches</p>
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
                    {selected ? <AiFillTrophy /> : <AiOutlineTrophy />}
                    <p>Winners</p>
                  </div>
                )}
              </Tab>
            </Tab.List>

            <Tab.Panels>
              <Tab.Panel className={"px-5 mt-2"}>
                <AuthInfiniteScrollComponent
                  height={windowHeight - topBarHeight - 120 - 80}
                  lazyHook={useLazyGetAllUpcomingMatchesQuery}
                  loopKey={(l) => l?.id}
                  customEnd={<></>}
                  customLoader={<Loader />}
                  emptyHandler={
                    <div className="flex flex-col items-center text-ownOrange text-[12px] animate__animated animate__zoomIn">
                      <div className="h-[300px] mt-5">
                        <img
                          src="/images/bats man.svg"
                          alt=""
                          srcset=""
                          className="w-full h-full"
                        />
                      </div>

                      <p>No Upcoming Matches Found</p>
                    </div>
                  }
                >
                  {/* <MatchCard /> */}
                  <MatchCard2 />
                </AuthInfiniteScrollComponent>
              </Tab.Panel>
              <Tab.Panel>
                <MyMatches />
              </Tab.Panel>
              <Tab.Panel className={"px-5"}>
                <WinnersTab />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      )}
    </>
  );
};

const handleUpcomingMatches = () => {
  window.location.reload();
};

const MyMatches = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { height: windowHeight } = useViewportSize();

  return (
    <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
      <Tab.List
        className={
          "flex items-center justify-evenly bg-white/30 text-[12px] py-1 text-white rounded-b-md"
        }
      >
        <Tab className={"focus:outline-none"}>
          {({ selected }) => (
            <div
              className={`flex items-center space-x-1 ${
                selected &&
                "underline decoration-2 decoration-ownOrange underline-offset-4"
              }`}
            >
              {/* {selected ? <AiFillClockCircle /> : <AiOutlineClockCircle />} */}
              <p>Live</p>
            </div>
          )}
        </Tab>

        <Tab className={"focus:outline-none"}>
          {({ selected }) => (
            <div
              className={`flex items-center space-x-1 ${
                selected &&
                "underline decoration-2 decoration-ownOrange underline-offset-4"
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
                "underline decoration-2 decoration-ownOrange underline-offset-4"
              }`}
            >
              <p>Completed</p>
            </div>
          )}
        </Tab>
      </Tab.List>

      <Tab.Panels className={"mt-5 px-5"}>
        <Tab.Panel>
          <AuthInfiniteScrollComponent
            lazyHook={useLazyUserRecentlyPlayedContestsQuery}
            parentClasses={"flex flex-col items-center space-y-5"}
            clearParent={true}
            height={windowHeight - 100 - 30 - 26 - 44 - 80}
            customEnd={<></>}
            customLoader={<Loader />}
            emptyHandler={
              <div className="font-poppins text-center text-white flex flex-col items-center text-xs animate__animated animate__zoomIn">
                <p>You haven’t joined any contests that are live</p>
                <img
                  // src="/images/mymatch.png"
                  src="/images/mymatch.png"
                  className="mt-10"
                />
                <p className="mt-10">
                  Join contests for any of the upcoming contests
                </p>
                <button
                  className="bg-ownOrange mt-10 text-xs font-medium px-4 py-2 rounded-md"
                  // onClick={() => setSelectedIndex(1)}
                  onClick={handleUpcomingMatches}
                >
                  Join Contest
                </button>
              </div>
            }
            hookParams={{ status: "ONGOING" }}
          >
            <Card />
          </AuthInfiniteScrollComponent>
        </Tab.Panel>
        <Tab.Panel>
          <AuthInfiniteScrollComponent
            lazyHook={useLazyUserRecentlyPlayedContestsQuery}
            parentClasses={"flex flex-col items-center space-y-5"}
            clearParent={true}
            height={windowHeight - 100 - 30 - 26 - 44 - 80}
            customEnd={<></>}
            customLoader={<Loader />}
            emptyHandler={
              <div className="font-poppins text-center text-xs flex flex-col items-center animate__animated animate__zoomIn">
                <p>You haven’t joined any upcoming contests</p>
                <img src="/images/mymatch.png" className="mt-10" />
                <p className="mt-10">
                  Join contests for any of the upcoming contests
                </p>
                <button
                  className="bg-ownOrange mt-10 text-xs font-medium px-4 py-2 rounded-md"
                  // onClick={() => setSelectedIndex(1)}
                  onClick={handleUpcomingMatches}
                >
                  Join Contest
                </button>
              </div>
            }
            hookParams={{ status: "UPCOMING" }}
          >
            <Card />
          </AuthInfiniteScrollComponent>
        </Tab.Panel>
        <Tab.Panel>
          <AuthInfiniteScrollComponent
            lazyHook={useLazyUserRecentlyPlayedContestsQuery}
            parentClasses={"flex flex-col items-center space-y-5"}
            clearParent={true}
            height={windowHeight - 100 - 30 - 26 - 44 - 80}
            customEnd={<></>}
            customLoader={<Loader />}
            emptyHandler={
              <div className="font-poppins text-center flex flex-col items-center text-xs animate__animated animate__zoomIn">
                <p>You haven’t joined any contests</p>
                <img src="/images/mymatch.png" className="mt-10" />
                <p className="mt-10">
                  Join contests for any of the upcoming contests
                </p>
                <button
                  className="bg-ownOrange mt-10 text-xs font-medium px-4 py-2 rounded-md"
                  // onClick={() => setSelectedIndex(1)}
                  onClick={handleUpcomingMatches}
                >
                  Join Contest
                </button>
              </div>
            }
            hookParams={{ status: "COMPLETED" }}
          >
            <Card />
          </AuthInfiniteScrollComponent>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
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

export default UpcomingMatches;
