import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import { BsChevronLeft } from "react-icons/bs";
import {
  useCheckJoinContestStatusQuery,
  useGetAllTeamsByContestSlugQuery,
  useGetContestDetailsQuery,
  useGetMatchDetailsQuery,
  useGetMatchSlugByContestSlugQuery,
  useJoinContestDirectlyMutation,
} from "../../../store/apis/restApi";
import ContestCard from "../MatchInfo/InfoTabs/ContestsTab/ContestCard1";
import ContestInfoTabs from "./ContestInfoTabs";
import { dateCountDown } from "../../../helpers/dateCountDown";
import Countdown from "react-countdown";
import { toast } from "react-toastify";
import { openConfirmPaymentPopup } from "../../../store/slices/games";
import { useDispatch, useSelector } from "react-redux";

const ContestInfo = (props) => {
  const [topBarHeight, setTopBarHeight] = useState(0);
  const [date, setDate] = useState(null);
  const [isLoader, setIsLoader] = useState(false);
  const [timeUp, setTimeUp] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;

  const topBarRef = useRef(null);

  useEffect(() => {
    if (topBarRef?.current) {
      setTopBarHeight(topBarRef?.current?.clientHeight);
    }
  }, [topBarRef]);

  const { data: contestData } = useGetContestDetailsQuery(
    { slug: id },
    { skip: id ? false : true }
  );
  const { data: joinCheckData } = useCheckJoinContestStatusQuery(
    { slug: id },
    { skip: id ? false : true }
  );

  const { data: teamsData } = useGetAllTeamsByContestSlugQuery(
    { slug: id },
    { skip: id ? false : true }
  );

  const { data: matchSlugData } = useGetMatchSlugByContestSlugQuery(
    { slug: id },
    { skip: id ? false : true }
  );

  const { data: matchDetailsData } = useGetMatchDetailsQuery(
    {
      slug: matchSlugData?.match_slug,
    },
    {
      skip: matchSlugData ? false : true,
    }
  );

  const countdownRenderer = ({ hours, minutes, completed, days, seconds }) => {
    if (completed) {
      setTimeUp(true);
      return <span className="text-[12px] text-ownOrange">Live</span>;
    } else {
      if (timeUp) {
        setTimeUp(false);
      }

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

  const handleJoinNow = () => {
    if (contestData?.no_of_spots <= 0) {
      toast.error("you have reached your spots limit");
      return;
    }
    if (!teamsData) return;
    if (!matchSlugData) return;

    setIsLoader(true);
    // if (teamsData?.length <= 0) {
    //   router.push(`/games/cricket/${matchSlugData?.match_slug}/create-team`);
    // } else {
    //   router.push(`/games/cricket/contest/${id}/join`);
    // }

    if (!joinCheckData?.spots) {
      setIsLoader(false);
      toast.error("you have reached your spots limit");
      return;
    }

    if (joinCheckData?.create_team) {
      router.push(
        `/games/cricket/${matchSlugData?.match_slug}/create-team?contest=${id}`
      );
      setIsLoader(false);
      return;
    }

    if (joinCheckData?.direct_join) {
      dispatch(
        openConfirmPaymentPopup({
          status: 2,
          data: {
            slug: id,
          },
          slug: id,
        })
      );
      setIsLoader(false);
      return;
    }

    if (joinCheckData?.team_select) {
      router.push(`/games/cricket/contest/${id}/join`);
      setIsLoader(false);
      return;
    }
  };

  useEffect(() => {
    if (!matchDetailsData?.ist_time) return;
    setDate(dateCountDown(matchDetailsData?.ist_time));
  }, [matchDetailsData?.ist_time]);

  return (
    <>
      <div className="p-5 text-white">
        <div className="flex flex-col items-center space-y-5" ref={topBarRef}>
          <div className="flex flex-col items-center relative w-full">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 ">
              <BsChevronLeft color="white" onClick={() => router.back()} />
            </div>

            <img
              src="/images/tiar_logo_1.svg"
              alt=""
              className="h-[18px]"
              onClick={() => router.push("/")}
            />
          </div>

          <div className="flex justify-center space-x-4 text-ownOrange font-bold text-[14px] uppercase w-full items-center">
            <div className="w-[60px] h-[43px]">
              <img
                src={matchDetailsData?.team1_flag}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="w-[50px] text-center">{matchDetailsData?.team1}</h3>
            <h5 className="text-white font-medium text-[13px]">vs</h5>
            <h3 className="w-[50px] text-center">{matchDetailsData?.team2}</h3>
            <div className="w-[60px] h-[43px]">
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
          </div>

          <div className="text-ownOrange grid place-items-center">
            {date && <Countdown date={date} renderer={countdownRenderer} />}
          </div>

          <ContestCard data={contestData} hideLink={true} hideEnter={true} />

          {/* <div className="flex space-x-3">
          <ImageCard />
          <ImageCard />
        </div> */}

          {contestData &&
            contestData?.match_status !== "ONGOING" &&
            contestData?.match_status !== "COMPLETED" &&
            contestData?.match_status !== "DISTRIBUTED" &&
            !timeUp && (
              <button
                className="w-[131px] h-[27px] font-semibold bg-ownOrange rounded-md text-[10px] uppercase flex flex-col justify-center items-center"
                onClick={handleJoinNow}
                disabled={isLoader}
              >
                {isLoader ? (
                  <div
                    className="refresh-loader"
                    style={{ color: "white", width: "20px" }}
                  ></div>
                ) : (
                  <div>
                    JOIN NOW{" "}
                    <span>
                      {contestData?.discount_entry_fee} {contestData?.coin}
                    </span>
                  </div>
                )}
              </button>
            )}
        </div>
      </div>

      <ContestInfoTabs
        topBarHeight={topBarHeight}
        slug={id}
        matchStatus={contestData?.match_status}
        showNFTTab={contestData?.is_nft}
      />
    </>
  );
};

const ImageCard = () => {
  return (
    <div className="w-[123px]">
      <img
        src="https://www.culturalindia.net/iliimages/Madhubani%20painting%205.jpg"
        alt=""
        onError={(e) =>
          !e.target.onerror ? (e.target.src = "/images/tiar_logo_3.svg") : null
        }
        className="w-[123px] h-[73px]"
      />
      <div className="flex items-center justify-between text-[10px]">
        <p>Home</p>
        <p>$30</p>
      </div>
    </div>
  );
};

export default ContestInfo;
