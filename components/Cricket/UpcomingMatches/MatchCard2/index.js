import { FiBell } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { openCricketMatchReminderPopup } from "../../../../store/slices/games";
import Countdown from "react-countdown";
import { dateCountDown } from "../../../../helpers/dateCountDown";
import Link from "next/link";
import { TbSpeakerphone } from "react-icons/tb";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const MatchCard2 = ({ data }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [timeUp, setTimeUp] = useState(false);

  const handleNotifications = (e) => {
    e.preventDefault();
    dispatch(
      openCricketMatchReminderPopup({
        series: {
          name: data?.series?.name,
          slug: data?.series?.slug,
        },
        match: {
          name: data?.description,
          slug: data?.slug,
        },
      })
    );
  };

  const countdownRenderer = ({ hours, minutes, completed, days }) => {
    if (completed) {
      setTimeUp(true);
      return (
        <span className="text-[12px] text-[#FF3739] bg-[#1E1E1E]/20 max-w-max px-2 py-1 rounded-full ">
          Live
        </span>
      );
    } else {
      if (timeUp) {
        setTimeUp(false);
      }

      return (
        <span className="text-[#FF3739] text-[10px] bg-[#1E1E1E]/20 max-w-max px-2 py-1 rounded-full">
          {/* {days >= 1
            ? `${days}d`
            : hours >= 1
            ? `${hours}h ${minutes}m`
            : `${minutes}m ${seconds}s`} */}
          {`${days}d ${hours}h ${minutes}m`} {/*  ${seconds}s */}
        </span>
      );
    }
  };

  const handleRoute = () => {
    //
    if (timeUp) {
      toast.info("Match has already started , Try for upcoming matches!");
      return;
    }

    if (!data?.players_status) {
      toast.info("Contests for this match will open soon. Stay tuned!");
      return;
    }

    router.push(`/games/cricket/${data.slug}`);
  };

  return (
    // <Link
    //   href={
    //     // data?.match_status_enum === "ONGOING"
    //     timeUp ? "#" : `/games/cricket/${data.slug}`
    //   }
    // >
    <div
      className={`border-ownOrange border bg-white min-h-[126px] w-full rounded-lg text-black flex flex-col overflow-auto ${
        // data?.match_status_enum === "ONGOING" && "opacity-40" // ONGOING TODAY_MATCH
        timeUp && "opacity-40" // ONGOING TODAY_MATCH
      } animate__animated animate__zoomIn`}
      onClick={handleRoute}
    >
      <div className="flex py-1 border-b border-ownOrange px-3 space-x-5">
        <div className="w-[10%]"></div>
        <div className="w-[80%]">
          <h5 className="font-[400] text-[14px] text-center whitespace-nowrap">
            {data?.series_updated_name}
          </h5>
        </div>
        <div className="w-[10%] flex space-x-1 items-center justify-end">
          {data?.squard_released && <TbSpeakerphone size={20} color="black" />}
          <FiBell size={20} onClick={handleNotifications} />
        </div>
      </div>

      <div className="flex-auto py-[14px] px-3 flex items-start">
        <div className="flex-1 min-w-[38%]">
          <div className="flex items-center space-x-2">
            <img
              src={data?.team_1?.image_url}
              alt=""
              onError={(e) =>
                !e.target.onerror
                  ? (e.target.src = "/images/tiar_logo_3.svg")
                  : null
              }
              className="w-[30px] h-[30px] object-contain rounded-md"
            />
            <h3 className="text-[16px] font-[600]">
              {data?.team_1?.team_s_name}
            </h3>
          </div>

          <p className="text-[12px] font-[400] text-[#1E1E1E]/50 whitespace-nowrap w-full">
            {data?.team_1?.team_name}
          </p>
        </div>

        <div className="flex-1 flex justify-center min-w-max">
          {/* <div className="bg-[#1E1E1E]/20 max-w-max px-2 py-1 rounded-full ">
            <p className="text-[#FF3739] text-[10px] font-[500]">02h 30m</p>
          </div> */}
          {console.log("MST: ", data?.match_ist_time)}
          <Countdown
            date={dateCountDown(data?.match_ist_time)}
            renderer={countdownRenderer}
          />
        </div>

        <div className="flex-1 flex flex-col items-end min-w-[38%]">
          <div className="flex items-center space-x-2">
            <h3 className="text-[16px] font-[600]">
              {data?.team_2?.team_s_name}
            </h3>
            <img
              src={data?.team_2?.image_url}
              alt=""
              className="w-[30px] h-[30px] object-contain rounded-md"
              onError={(e) =>
                !e.target.onerror
                  ? (e.target.src = "/images/tiar_logo_3.svg")
                  : null
              }
            />
          </div>

          <p className="text-[12px] font-[400] w-full text-[#1E1E1E]/50 text-end truncate">
            {data?.team_2?.team_name}
          </p>
        </div>
      </div>

      <div className="w-full bg-ownOrange flex items-center px-3">
        <h5 className="text-[14px] font-[500] w-[20%] text-[#1E1E1E]">
          Reward:
        </h5>
        <h3 className="text-[16px] font-[700] w-[60%] text-center text-white">
          {data?.contest_currency}
        </h3>
        <div className="w-[20%]"></div>
      </div>
    </div>
    // </Link>
  );
};

export default MatchCard2;
