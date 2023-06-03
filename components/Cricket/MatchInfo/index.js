import { BsChevronLeft } from "react-icons/bs";
import InfoTabs from "./InfoTabs";
import { useRouter } from "next/router";
import { useGetMatchDetailsQuery } from "../../../store/apis/restApi";
import Countdown from "react-countdown";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { dateCountDown } from "../../../helpers/dateCountDown";

const MatchInfo = (props) => {
  const router = useRouter();
  const { id } = router.query;

  const [date, setDate] = useState(null);
  const [timeUp, setTimeUp] = useState(false);

  const { data: matchDetailsData } = useGetMatchDetailsQuery({
    slug: id,
  });

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

  useEffect(() => {
    if (!matchDetailsData?.ist_time) return;
    setDate(dateCountDown(matchDetailsData?.ist_time));
  }, [matchDetailsData?.ist_time]);

  return (
    <div className="">
      <div className="px-5">
        <div className="flex flex-col items-center space-y-3 py-5 relative">
          <div className="absolute left-0 top-9 transform -translate-y-1/2 ">
            <BsChevronLeft color="white" onClick={() => router.back()} />
          </div>

          <Link href={"/"}>
            <img src="/images/tiar_logo_1.svg" alt="" className="h-[18px]" />
          </Link>

          <div className="flex justify-center space-x-4 text-ownOrange font-bold text-[14px] uppercase w-full items-center">
            <div className="w-[60px] h-[43px]">
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
            {date &&
            matchDetailsData?.match_status !==
              ("DISTRIBUTED" || "POINTS_DISTRIBUTED" || "COMPLETED") ? (
              <Countdown date={date} renderer={countdownRenderer} />
            ) : (
              `COMPLETED`
            )}
          </div>
        </div>
      </div>

      <InfoTabs timeUp={timeUp} />
    </div>
  );
};

export default MatchInfo;
