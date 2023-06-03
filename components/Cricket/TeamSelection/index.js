import {
  AiOutlineHome,
  AiOutlineLeft,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { CgSortAz } from "react-icons/cg";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useRef, useState, useEffect } from "react";
import { useViewportSize } from "@mantine/hooks";
import PlayerCard from "./PlayerCard";
import {
  setCurrentPlayersType,
  setCurrentScreen,
} from "../../../store/slices/cricket";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetMatchDetailsQuery,
  useGetPlayersOfMatchQuery,
} from "../../../store/apis/restApi";
import { useRouter } from "next/router";
import moment from "moment";
import { dateCountDown } from "../../../helpers/dateCountDown";
import Countdown from "react-countdown";
import Loader from "../../UI/Loader";

const countdownRenderer = ({ hours, minutes, completed, days, seconds }) => {
  if (completed) {
    return <span className="text-[12px] text-ownOrange">Live</span>;
  } else {
    return (
      <span className="text-ownOrange text-[12px]">
        {/* {days >= 1
            ? `${days}d`
            : hours >= 1
            ? `${hours}h ${minutes}m`
            : `${minutes}m ${seconds}s`} */}
        {`${days}d ${hours}h ${minutes}m`}
      </span>
    );
  }
};

const TeamSelection = (props) => {
  const [topBarHeight, setTopBarHeight] = useState(0);
  const [bottomBarHeight, setBottomBarHeight] = useState(0);
  const [date, setDate] = useState(null);

  const router = useRouter();
  const { height: windowHeight } = useViewportSize();
  const dispatch = useDispatch();

  const topBarRef = useRef(null);
  const bottomBarRef = useRef(null);

  const { id } = router.query;

  const wicketKeepers = useSelector(
    (state) => state.cricket.players.wicketKeepers
  );
  const batsmen = useSelector((state) => state.cricket.players.batsmen);
  const allRounders = useSelector((state) => state.cricket.players.allRounders);
  const bowlers = useSelector((state) => state.cricket.players.bowlers);
  const credits = useSelector((state) => state.cricket.credits);

  const wicketKeeperSelectionText = "Select 1 - 8 Wicket Keepers";
  const batsmanSelectionText = "Select 1 - 8 Batters";
  const allRounderSelectionText = "Select 1 - 8 All-Rounders";
  const bowlersSelectionText = "Select 1 - 8 Bowlers";

  const currentPlayersType = useSelector(
    (state) => state.cricket.currentPlayersType
  );

  const { data: matchDetailsData } = useGetMatchDetailsQuery({ slug: id });

  const { data: playersData, isFetching: playersFetching } =
    useGetPlayersOfMatchQuery({
      slug: id,
      search:
        currentPlayersType === 1
          ? "WK"
          : currentPlayersType === 2
          ? "BATSMAN"
          : currentPlayersType === 3
          ? "ALLROUNDER"
          : "BOW",
    });

  const totalPlayers = [
    ...wicketKeepers,
    ...batsmen,
    ...allRounders,
    ...bowlers,
  ];

  const team1Players = totalPlayers.filter(
    (p) => p.main_team_name === matchDetailsData?.team1
  );
  const team2Players = totalPlayers.filter(
    (p) => p.main_team_name === matchDetailsData?.team2
  );

  useEffect(() => {
    if (topBarRef?.current) {
      setTopBarHeight(topBarRef?.current?.clientHeight);
    }

    if (bottomBarRef?.current) {
      setBottomBarHeight(bottomBarRef?.current?.clientHeight);
    }
  }, [topBarRef, bottomBarRef]);

  useEffect(() => {
    document.body.style.overscrollBehaviorY = "contain";

    return () => (document.body.style.overscrollBehaviorY = "auto");
  }, []);

  const handleNext = () => {
    if (totalPlayers.length < 11) return;
    dispatch(setCurrentScreen(5));
  };

  useEffect(() => {
    if (!matchDetailsData?.ist_time) return;
    setDate(dateCountDown(matchDetailsData?.ist_time));
  }, [matchDetailsData?.ist_time]);

  return (
    <div>
      {/* Top Bar */}
      <div
        className="pt-5 text-white flex flex-col items-center space-y-3"
        ref={topBarRef}
      >
        <div className="flex justify-between w-full px-5">
          <div className="flex items-center space-x-2">
            <AiOutlineLeft color="white" onClick={() => router.back()} />
            <AiOutlineHome color="white" onClick={() => router.push("/")} />
          </div>

          <div className="flex flex-col items-center">
            <img
              src="/images/tiar_logo_1.svg"
              alt=""
              className="h-[18px]"
              onClick={() => router.push("/")}
            />
            {date && <Countdown date={date} renderer={countdownRenderer} />}
          </div>
          <AiOutlineQuestionCircle
            color="white"
            size={25}
            onClick={() => dispatch(setCurrentScreen(2))}
          />
        </div>

        <p className="text-[14px]">You can Select only 7 from each team</p>

        <div className="flex justify-between w-full px-5">
          <div className="flex flex-col items-center">
            <p className="text-[11px] font-medium">Players</p>
            <h5 className="font-medium text-[18px]">
              <span className="text-ownOrange">{totalPlayers?.length}</span>/
              <span>11</span>
            </h5>
          </div>

          <div className="flex space-x-2">
            <div className="w-[40px] h-[40px] grid place-items-center bg-white rounded-full overflow-hidden">
              <img
                src={matchDetailsData?.team1_flag}
                alt=""
                onError={(e) =>
                  !e.target.onerror
                    ? (e.target.src = "/images/tiar_logo_3.svg")
                    : null
                }
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-[10px] flex flex-col items-center text-center max-w-[25px] justify-between">
              <p className="font-semibold uppercase whitespace-nowrap">
                {matchDetailsData?.team1}
              </p>
              <p className="font-medium">{team1Players.length}</p>
            </div>
          </div>

          <div className="flex space-x-2">
            <div className="w-[40px] h-[40px] grid place-items-center bg-white rounded-full overflow-hidden">
              <img
                src={matchDetailsData?.team2_flag}
                alt=""
                onError={(e) =>
                  !e.target.onerror
                    ? (e.target.src = "/images/tiar_logo_3.svg")
                    : null
                }
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-[10px] flex flex-col items-center text-center max-w-[25px] justify-between">
              <p className="font-semibold uppercase whitespace-nowrap">
                {matchDetailsData?.team2}
              </p>
              <p className="font-medium">{team2Players.length}</p>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-medium">Credits Left</p>
            <p className="font-medium text-[18px] text-end">
              {parseFloat(credits)?.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="w-full px-5">
          <div className="flex justify-between w-full items-center relative">
            <div
              className={`absolute h-[3px] bg-[#00B929] left-0 top-1/2 -translate-y-1/2 z-[-1]`}
              style={{
                width:
                  totalPlayers.length < 11
                    ? `${(totalPlayers.length - 1) * 10}%`
                    : `100%`,
              }}
            ></div>

            {Array(11)
              .fill(11)
              .map((p, idx) => {
                return (
                  <div className="flex items-center" key={idx}>
                    <div
                      className={`w-[20px] h-[20px] rounded-full shrink-0  grid place-items-center text-[12px] ${
                        totalPlayers.length > idx
                          ? "bg-[#00B929]"
                          : "bg-gray-200"
                      }`}
                    >
                      {totalPlayers.length === idx + 1 && idx + 1}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/*
        <div className="flex justify-between w-full items-center">
          {Array(11)
            .fill(11)
            .map((p, idx) => {
              return (
                <div
                  key={idx}
                  className={`w-[20px] h-[20px] rounded-full ${
                    totalPlayers.length > idx ? "bg-[#00B929]" : "bg-gray-200"
                  }`}
                ></div>
              );
            })}
        </div> */}

        <div className="text-[12px] font-semibold flex justify-between items-center w-full border-y border-gray-300 py-2 px-5">
          <p
            onClick={() => dispatch(setCurrentPlayersType(1))}
            className={`${
              currentPlayersType === 1 &&
              "bg-gradient-to-r from-[#F97F4E] to-[#E00A14] px-3 rounded-md py-1"
            }`}
          >
            WK (<span>{wicketKeepers.length}</span>)
          </p>
          <p
            onClick={() => dispatch(setCurrentPlayersType(2))}
            className={`${
              currentPlayersType === 2 &&
              "bg-gradient-to-r from-[#F97F4E] to-[#E00A14] px-3 rounded-md py-1"
            }`}
          >
            BAT (<span>{batsmen.length}</span>)
          </p>
          <p
            onClick={() => dispatch(setCurrentPlayersType(3))}
            className={`${
              currentPlayersType === 3 &&
              "bg-gradient-to-r from-[#F97F4E] to-[#E00A14] px-3 rounded-md py-1"
            }`}
          >
            AR (<span>{allRounders.length}</span>)
          </p>
          <p
            onClick={() => dispatch(setCurrentPlayersType(4))}
            className={`${
              currentPlayersType === 4 &&
              "bg-gradient-to-r from-[#F97F4E] to-[#E00A14] px-3 rounded-md py-1"
            }`}
          >
            BOWL (<span>{bowlers.length}</span>)
          </p>
        </div>

        <div className="flex items-center justify-between w-full text-[12px] px-5">
          <p>
            {currentPlayersType === 1
              ? wicketKeeperSelectionText
              : currentPlayersType === 2
              ? batsmanSelectionText
              : currentPlayersType === 3
              ? allRounderSelectionText
              : bowlersSelectionText}
          </p>
          {/* <div className="flex space-x-2 items-center">
            <HiOutlineSpeakerphone size={20} />
            <CgSortAz size={25} />
          </div> */}
        </div>

        <div className="flex items-center justify-end w-full text-black font-semibold py-2 bg-[#E4E4E4] text-[12px]">
          <p className="w-[55%] text-center">Selected By</p>
          <p className="w-[25%] text-center">Points</p>
          <p className="w-[25%]">Credits</p>
        </div>
      </div>

      <div
        className="bg-white rounded-b-xl"
        style={{ height: `${windowHeight - topBarHeight - bottomBarHeight}px` }}
      >
        <Scrollbars style={{ height: "100%" }}>
          {playersFetching ? (
            <Loader />
          ) : (
            playersData?.map((i) => {
              return (
                <PlayerCard
                  key={i.id}
                  data={i}
                  team1={matchDetailsData?.team1}
                  team2={matchDetailsData?.team2}
                  matchSlug={id}
                />
              );
            })
          )}
        </Scrollbars>
      </div>

      {/* Bottom Bar */}
      <div
        className="flex items-center justify-between px-5 space-x-5 text-white fixed py-5 bottom-0 w-full  md:max-w-[450px]"
        ref={bottomBarRef}
      >
        <button
          className="w-[150px] h-[37px] border-[2px] border-ownOrange rounded-md"
          onClick={() => dispatch(setCurrentScreen(4))}
        >
          Preview Team
        </button>
        <button
          className={`w-[150px] h-[37px] bg-ownOrange rounded-md ${
            totalPlayers.length < 11 && "opacity-20"
          }`}
          onClick={handleNext}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default TeamSelection;

// import { AiOutlineLeft, AiOutlineQuestionCircle } from "react-icons/ai";
// import { HiOutlineSpeakerphone } from "react-icons/hi";
// import { Scrollbars } from "react-custom-scrollbars-2";
// import { useRef, useState, useEffect } from "react";
// import { useViewportSize } from "@mantine/hooks";
// import PlayerCard from "./PlayerCard";
// import {
//   setCurrentPlayersType,
//   setCurrentScreen,
// } from "../../../store/slices/cricket";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   useGetMatchDetailsQuery,
//   useGetPlayersOfMatchQuery,
// } from "../../../store/apis/restApi";
// import { useRouter } from "next/router";
// import { dateCountDown } from "../../../helpers/dateCountDown";
// import Countdown from "react-countdown";
// import { Tabs, Tab } from "@tarragon/swipeable-tabs";

// const countdownRenderer = ({ hours, minutes, completed, days, seconds }) => {
//   if (completed) {
//     return <span className="text-[12px] text-ownOrange">Live</span>;
//   } else {
//     return (
//       <span className="text-ownOrange text-[12px]">
//         {/* {days >= 1
//             ? `${days}d`
//             : hours >= 1
//             ? `${hours}h ${minutes}m`
//             : `${minutes}m ${seconds}s`} */}
//         {`${days}d ${minutes}m ${seconds}s`}
//       </span>
//     );
//   }
// };

// const TeamSelection = (props) => {
//   const [topBarHeight, setTopBarHeight] = useState(0);
//   const [bottomBarHeight, setBottomBarHeight] = useState(0);
//   const [date, setDate] = useState(null);
//   const [selectedTab, setSelectedTab] = useState(0);

//   const router = useRouter();
//   const { height: windowHeight } = useViewportSize();
//   const dispatch = useDispatch();

//   const topBarRef = useRef(null);
//   const bottomBarRef = useRef(null);

//   const { id } = router.query;

//   const tabsItems = [
//     {
//       id: 1,
//       title: "WK",
//     },
//     {
//       id: 2,
//       title: "BAT",
//     },
//     {
//       id: 3,
//       title: "AR",
//     },
//     {
//       id: 4,
//       title: "BOWL",
//     },
//   ];

//   const wicketKeepers = useSelector(
//     (state) => state.cricket.players.wicketKeepers
//   );
//   const batsmen = useSelector((state) => state.cricket.players.batsmen);
//   const allRounders = useSelector((state) => state.cricket.players.allRounders);
//   const bowlers = useSelector((state) => state.cricket.players.bowlers);
//   const credits = useSelector((state) => state.cricket.credits);

//   const wicketKeeperSelectionText = "Select 1 - 4 Wicket Keepers";
//   const batsmanSelectionText = "Select 3 - 6 Batters";
//   const allRounderSelectionText = "Select 1 - 4 All-Rounders";
//   const bowlersSelectionText = "Select 3 - 6 Bowlers";

//   const changeTab = (updatedTab) => {
//     setSelectedTab(updatedTab.label);
//   };

//   const currentPlayersType = useSelector(
//     (state) => state.cricket.currentPlayersType
//   );

//   const { data: matchDetailsData } = useGetMatchDetailsQuery({ slug: id });

//   const { data: playersData, isFetching: playersFetching } =
//     useGetPlayersOfMatchQuery({
//       slug: id,
//       search:
//         currentPlayersType === 1
//           ? "WK"
//           : currentPlayersType === 2
//           ? "BATSMAN"
//           : currentPlayersType === 3
//           ? "ALLROUNDER"
//           : "BOW",
//     });

//   const totalPlayers = [
//     ...wicketKeepers,
//     ...batsmen,
//     ...allRounders,
//     ...bowlers,
//   ];

//   const team1Players = totalPlayers.filter(
//     (p) => p.main_team_name === matchDetailsData?.team1
//   );
//   const team2Players = totalPlayers.filter(
//     (p) => p.main_team_name === matchDetailsData?.team2
//   );

//   useEffect(() => {
//     if (topBarRef?.current) {
//       setTopBarHeight(topBarRef?.current?.clientHeight);
//     }

//     if (bottomBarRef?.current) {
//       setBottomBarHeight(bottomBarRef?.current?.clientHeight);
//     }
//   }, [topBarRef, bottomBarRef]);

//   useEffect(() => {
//     document.body.style.overscrollBehaviorY = "contain";

//     return () => (document.body.style.overscrollBehaviorY = "auto");
//   }, []);

//   const handleNext = () => {
//     if (totalPlayers.length < 11) return;
//     dispatch(setCurrentScreen(5));
//   };

//   useEffect(() => {
//     if (!matchDetailsData?.ist_time) return;
//     setDate(dateCountDown(matchDetailsData?.ist_time));
//   }, [matchDetailsData?.ist_time]);

//   return (
//     <div>
//       {/* Top Bar */}
//       <div
//         className="pt-5 text-white flex flex-col items-center space-y-3"
//         ref={topBarRef}
//       >
//         <div className="flex justify-between w-full px-5">
//           <AiOutlineLeft color="white" onClick={() => router.back()} />

//           <div className="flex flex-col items-center">
//             <img
//               src="/images/tiar_logo_1.svg"
//               alt=""
//               className="max-w-[40px]"
//             />
//             {date && <Countdown date={date} renderer={countdownRenderer} />}
//           </div>
//           <AiOutlineQuestionCircle
//             color="white"
//             size={25}
//             onClick={() => dispatch(setCurrentScreen(2))}
//           />
//         </div>

//         <p className="text-[14px]">You can Select only 7 from each team</p>

//         <div className="flex justify-between w-full px-5">
//           <div className="flex flex-col items-center">
//             <p className="text-[11px] font-medium">Players</p>
//             <h5 className="font-medium text-[18px]">
//               <span className="text-ownOrange">{totalPlayers?.length}</span>/
//               <span>11</span>
//             </h5>
//           </div>

//           <div className="flex space-x-2">
//             <div className="w-[40px] h-[40px] grid place-items-center bg-white rounded-full overflow-hidden">
//               <img
//                 src={matchDetailsData?.team1_flag}
//                 alt=""
//                 onError={(e) =>
//                   !e.target.onerror
//                     ? (e.target.src = "/images/tiar_logo_3.svg")
//                     : null
//                 }
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <div className="text-[10px] flex flex-col items-center text-center max-w-[25px] justify-between">
//               <p className="font-semibold uppercase whitespace-nowrap">
//                 {matchDetailsData?.team1}
//               </p>
//               <p className="font-medium">{team1Players.length}</p>
//             </div>
//           </div>

//           <div className="flex space-x-2">
//             <div className="w-[40px] h-[40px] grid place-items-center bg-white rounded-full overflow-hidden">
//               <img
//                 src={matchDetailsData?.team2_flag}
//                 alt=""
//                 onError={(e) =>
//                   !e.target.onerror
//                     ? (e.target.src = "/images/tiar_logo_3.svg")
//                     : null
//                 }
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <div className="text-[10px] flex flex-col items-center text-center max-w-[25px] justify-between">
//               <p className="font-semibold uppercase whitespace-nowrap">
//                 {matchDetailsData?.team2}
//               </p>
//               <p className="font-medium">{team2Players.length}</p>
//             </div>
//           </div>

//           <div>
//             <p className="text-[11px] font-medium">Credits Left</p>
//             <p className="font-medium text-[18px] text-end">
//               {credits?.toFixed(2)}
//             </p>
//           </div>
//         </div>

//         <div className="w-full px-5">
//           <div className="flex justify-between w-full items-center relative">
//             <div
//               className={`absolute h-[3px] bg-[#00B929] left-0 top-1/2 -translate-y-1/2 z-[-1]`}
//               style={{
//                 width:
//                   totalPlayers.length < 11
//                     ? `${(totalPlayers.length - 1) * 10}%`
//                     : `100%`,
//               }}
//             ></div>

//             {Array(11)
//               .fill(11)
//               .map((p, idx) => {
//                 return (
//                   <div className="flex items-center" key={idx}>
//                     <div
//                       className={`w-[20px] h-[20px] rounded-full shrink-0  grid place-items-center text-[12px] ${
//                         totalPlayers.length > idx
//                           ? "bg-[#00B929]"
//                           : "bg-gray-200"
//                       }`}
//                     >
//                       {totalPlayers.length === idx + 1 && idx + 1}
//                     </div>
//                   </div>
//                 );
//               })}
//           </div>
//         </div>

//         <Tabs
//           value={selectedTab}
//           onChange={changeTab}
//           tabBarCSS={`font-weight:600;
//           font-size: 12px;
//           width: 100%;
//           border-top-width: 1px;
//           border-bottom-width: 1px;
//           border-color: rgb(209 213 219);`}
//           styleProps={{
//             showInkBar: false,
//             barColor: "transparent",
//             justifyTabs: "space-between",
//           }}
//           tabItemCSS={`border-radius: 0.375rem;
//           background: rgb(249,127,78);
//           background: linear-gradient(90deg, rgba(249,127,78,1) 0%, rgba(224,10,20,1) 100%);padding-top: 0.25rem;
//           padding-bottom: 0.25rem;
//           padding-left: 0.75rem;
//           padding-right: 0.75rem;`}
//         >
//           <Tab label="Tab 1" key={0}>
//             <div>Tab 1 Content</div>
//           </Tab>
//           <Tab label="Tab 2" key={1}>
//             <div>Tab 2 content</div>
//           </Tab>
//           <Tab label="Tab 3" key={2}>
//             <div>Tab 3 content</div>
//           </Tab>
//           <Tab label="Tab 4" key={3}>
//             <div>Tab 4 content</div>
//           </Tab>
//         </Tabs>

//         {/* <div className="text-[12px] font-semibold flex justify-between items-center w-full border-y border-gray-300 py-2 px-5">
//           <p
//             onClick={() => dispatch(setCurrentPlayersType(1))}
//             className={`${
//               currentPlayersType === 1 &&
//               "bg-gradient-to-r from-[#F97F4E] to-[#E00A14] px-3 rounded-md py-1"
//             }`}
//           >
//             WK (<span>{wicketKeepers.length}</span>)
//           </p>
//           <p
//             onClick={() => dispatch(setCurrentPlayersType(2))}
//             className={`${
//               currentPlayersType === 2 &&
//               "bg-gradient-to-r from-[#F97F4E] to-[#E00A14] px-3 rounded-md py-1"
//             }`}
//           >
//             BAT (<span>{batsmen.length}</span>)
//           </p>
//           <p
//             onClick={() => dispatch(setCurrentPlayersType(3))}
//             className={`${
//               currentPlayersType === 3 &&
//               "bg-gradient-to-r from-[#F97F4E] to-[#E00A14] px-3 rounded-md py-1"
//             }`}
//           >
//             AR (<span>{allRounders.length}</span>)
//           </p>
//           <p
//             onClick={() => dispatch(setCurrentPlayersType(4))}
//             className={`${
//               currentPlayersType === 4 &&
//               "bg-gradient-to-r from-[#F97F4E] to-[#E00A14] px-3 rounded-md py-1"
//             }`}
//           >
//             BOWL (<span>{bowlers.length}</span>)
//           </p>
//         </div> */}

//         <div className="flex items-center justify-between w-full text-[12px] px-5">
//           <p>
//             {currentPlayersType === 1
//               ? wicketKeeperSelectionText
//               : currentPlayersType === 2
//               ? batsmanSelectionText
//               : currentPlayersType === 3
//               ? allRounderSelectionText
//               : bowlersSelectionText}
//           </p>
//           <div className="flex space-x-2 items-center">
//             <HiOutlineSpeakerphone size={20} />
//             {/* <CgSortAz size={25} /> */}
//           </div>
//         </div>

//         <div className="flex items-center justify-end w-full text-ownOrange py-2 bg-[#E4E4E4] text-[12px]">
//           <p className="w-[55%] text-center">Selected By</p>
//           <p className="w-[25%] text-center">Points</p>
//           <p className="w-[25%]">Credits</p>
//         </div>
//       </div>

//       <div
//         className="bg-white rounded-b-xl"
//         style={{ height: `${windowHeight - topBarHeight - bottomBarHeight}px` }}
//       >
//         <Scrollbars style={{ height: "100%" }}>
//           {playersFetching ? (
//             <p>Loading...</p>
//           ) : (
//             playersData?.map((i) => {
//               return (
//                 <PlayerCard
//                   key={i.id}
//                   data={i}
//                   team1={matchDetailsData?.team1}
//                   team2={matchDetailsData?.team2}
//                   matchSlug={id}
//                 />
//               );
//             })
//           )}
//         </Scrollbars>
//       </div>

//       {/* Bottom Bar */}
//       <div
//         className="flex items-center justify-between px-5 space-x-5 text-white fixed py-5 bottom-0 w-full  md:max-w-[450px]"
//         ref={bottomBarRef}
//       >
//         <button
//           className="w-[150px] h-[37px] border-[2px] border-ownOrange rounded-md"
//           onClick={() => dispatch(setCurrentScreen(4))}
//         >
//           Preview Team
//         </button>
//         <button
//           className={`w-[150px] h-[37px] bg-ownOrange rounded-md ${
//             totalPlayers.length < 11 && "opacity-20"
//           }`}
//           onClick={handleNext}
//         >
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TeamSelection;
