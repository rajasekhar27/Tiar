import { useViewportSize } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineQuestionCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  useCreateTeamMutation,
  useGetMatchDetailsQuery,
  useUpdateTeamMutation,
} from "../../../../store/apis/restApi";
import { reset, setCurrentScreen } from "../../../../store/slices/cricket";
import CaptainCard from "../CaptainCard";
import { Scrollbars } from "react-custom-scrollbars-2";
import { toast } from "react-toastify";
import { openConfirmPaymentPopup } from "../../../../store/slices/games";
import { dateCountDown } from "../../../../helpers/dateCountDown";
import Countdown from "react-countdown";

const CaptainsSelection = ({ edit }) => {
  const [topBarHeight, setTopBarHeight] = useState(0);
  const [bottomBarHeight, setBottomBarHeight] = useState(0);
  const [date, setDate] = useState(null);
  const [isLoader, setIsLoader] = useState(false);

  const { height: windowHeight } = useViewportSize();

  const topBarRef = useRef(null);
  const bottomBarRef = useRef(null);

  const dispatch = useDispatch();
  const router = useRouter();

  const { id, contest, slug } = router.query;

  const wicketKeepers = useSelector(
    (state) => state.cricket.players.wicketKeepers
  );
  const batsmen = useSelector((state) => state.cricket.players.batsmen);
  const allRounders = useSelector((state) => state.cricket.players.allRounders);
  const bowlers = useSelector((state) => state.cricket.players.bowlers);

  const captain = useSelector((state) => state.cricket.captain);
  const viceCaptain = useSelector((state) => state.cricket.viceCaptain);

  const totalPlayers = [
    ...wicketKeepers,
    ...batsmen,
    ...allRounders,
    ...bowlers,
  ];

  const { data: matchDetailsData } = useGetMatchDetailsQuery({
    slug: id,
  });

  const [createTeam] = useCreateTeamMutation();
  const [updateTeam] = useUpdateTeamMutation();

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

  useEffect(() => {
    if (!matchDetailsData?.ist_time) return;

    setDate(dateCountDown(matchDetailsData?.ist_time));
  }, [matchDetailsData?.ist_time]);

  const handleSubmit = () => {
    if (!captain) return;
    if (!viceCaptain) return;
    setIsLoader(true);
    const backendFormat = {
      captain: captain.id,
      vice_captain: viceCaptain.id,
      players: totalPlayers.map((p) => p.id),
    };

    if (contest) {
      backendFormat.contest = contest;

      dispatch(
        openConfirmPaymentPopup({
          status: 1,
          data: backendFormat,
          slug: contest,
          matchSlug: id,
        })
      );
      setIsLoader(false);
      return;
    }

    if (edit) {
      updateTeam({
        slug: slug,
        data: backendFormat,
      }).then((res) => {
        if (res.data) {
          setIsLoader(false);
          router.push(`/games/cricket`);
          toast.success("Team updated!");
        }

        if (res.error) {
          setIsLoader(false);
          toast.error("something went wrong");
        }
      });
      return;
    }

    createTeam({ slug: id, data: backendFormat }).then((res) => {
      if (res.data) {
        setIsLoader(false);
        router.push(`/games/cricket/${id}`);
        toast.success("Success! Team created");
      }

      if (res.error) {
        setIsLoader(false);
        toast.error(res.error?.data?.non_field_errors[0]);
        // if (res.error?.data?.non_field_errors[0]) {
        //   dispatch(reset());
        // }
      }
    });
  };

  return (
    <div className="">
      {/* Top Bar */}
      <div
        className="p-5 text-white flex flex-col items-center space-y-3"
        ref={topBarRef}
      >
        <div className="flex justify-between w-full">
          <AiOutlineLeft
            color="white"
            onClick={() => dispatch(setCurrentScreen(3))}
          />
          <div className="flex flex-col items-center">
            <img
              src="/images/tiar_logo_1.svg"
              alt=""
              className="h-[18px]"
              onClick={() => router.push("/")}
            />
            {date && <Countdown date={date} renderer={CountdownRenderer} />}
          </div>
          <AiOutlineQuestionCircle color="white" />
        </div>

        <div>
          <p className="font-bold text-[16px]">
            Choose your <span className="text-ownOrange">Captain</span> and{" "}
            <span className="text-ownGreen2">Vice Captain</span>
          </p>

          <div className="flex justify-between text-[14px] py-2">
            <p>C - gets 2x points</p>
            <p>VC - gets 1.5x points</p>
          </div>
        </div>
      </div>

      <div style={{ height: `${windowHeight - topBarHeight - 77}px` }}>
        <div className="text-white px-5 flex items-center text-center justify-between text-xs">
          <p>TYPE</p>
          <p className="min-w-[150px]">POINTS</p>
          <p>% C BY</p>
          <p>% VC BY</p>
        </div>
        <Scrollbars style={{ height: "100%" }}>
          <div>
            {/* Wicket Keeper */}
            <div className="mb-2">
              {wicketKeepers?.map((w) => (
                <CaptainCard role={"WK"} data={w} key={w.id} />
              ))}
            </div>
            {/* Batsmen */}
            <div className="mb-2">
              {batsmen?.map((w) => (
                <CaptainCard role={"BAT"} data={w} key={w.id} />
              ))}
            </div>
            {/* All rounder */}
            <div className="mb-2">
              {allRounders?.map((w) => (
                <CaptainCard role={"AR"} data={w} key={w.id} />
              ))}
            </div>
            {/* Bowler */}
            <div className="mb-2">
              {bowlers?.map((w) => (
                <CaptainCard role={"BOWL"} data={w} key={w.id} />
              ))}
            </div>
          </div>
        </Scrollbars>
      </div>

      {/* Bottom Bar */}
      <div
        className="flex items-center justify-between px-5 space-x-5 text-white fixed py-5 bottom-0 w-full md:max-w-[450px]  bg-ownBlue1 z-10"
        // ref={bottomBarRef}
      >
        <button
          className={`w-[150px] h-[37px] border-[2px] border-ownOrange rounded-md`}
          onClick={() => dispatch(setCurrentScreen(4))}
        >
          Preview Team
        </button>
        <button
          className={`w-[150px] h-[37px] bg-ownOrange rounded-md flex flex-col justify-center items-center ${
            (!captain || !viceCaptain) && "opacity-30"
          }`}
          onClick={handleSubmit}
          disabled={isLoader}
        >
          {isLoader ? (
            <div
              className="refresh-loader"
              style={{ color: "white", width: "20px" }}
            ></div>
          ) : (
            "Save Team"
          )}
        </button>
      </div>
    </div>
  );
};

const CountdownRenderer = ({ hours, minutes, completed, days, seconds }) => {
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

export default CaptainsSelection;
