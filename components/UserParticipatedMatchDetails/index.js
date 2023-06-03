import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineQuestionCircle } from "react-icons/ai";
import { dateCountDown } from "../../helpers/dateCountDown";
import { useGetMatchDetailsQuery } from "../../store/apis/restApi";
import Countdown from "react-countdown";
import MatchTabs from "./MatchTabs";

const UserParticipatedMatchDetails = (props) => {
  const [date, setDate] = useState(null);
  const [timeUp, setTimeUp] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  const { data: matchDetailsData } = useGetMatchDetailsQuery({
    slug: id,
  });

  useEffect(() => {
    if (!matchDetailsData?.ist_time) return;
    setDate(dateCountDown(matchDetailsData?.ist_time));
  }, [matchDetailsData?.ist_time]);

  const countdownRenderer = ({ hours, minutes, completed, days, seconds }) => {
    if (completed) {
      // return <span className="text-[12px] text-ownOrange">Live</span>;
      return (
        <span
          className={`text-[12px] ${
            matchDetailsData?.match_status === "COMPLETED"
              ? "text-[#04DC00]"
              : "text-ownOrange"
          }`}
        >
          {matchDetailsData?.match_status}
        </span>
      );
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

  return (
    <div>
      {/* <div className="flex items-center space-x-3 text-white p-5 bg-ownBlue1">
        <AiOutlineLeft color="white" onClick={() => router.back()} />
        <p className="text-[18px] text-ownOrange uppercase font-semibold">
          {matchDetailsData?.team1} VS {matchDetailsData?.team2}
        </p>
      </div> */}

      <div className="p-5">
        <div className="flex items-center justify-between">
          <AiOutlineLeft color="white" onClick={() => router.back()} />

          <div className="flex items-center space-x-3 text-white">
            <div className="w-[40px] h-[30px]">
              <img
                src={matchDetailsData?.team1_flag}
                alt=""
                className="w-full h-full object-cover"
                onError={(e) =>
                  !e.target.onerror
                    ? (e.target.src = "/images/tiar_logo_3.svg")
                    : null
                }
              />
            </div>

            <p>vs</p>

            <div className="w-[40px] h-[30px]">
              <img
                onError={(e) =>
                  !e.target.onerror
                    ? (e.target.src = "/images/tiar_logo_3.svg")
                    : null
                }
                src={matchDetailsData?.team2_flag}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <AiOutlineQuestionCircle color="white" className="invisible" />
        </div>

        <div className="flex justify-between items-center mt-3">
          <div>
            <p className="uppercase text-[#888888]">
              {matchDetailsData?.team1}
            </p>
            <h6 className="text-[20px] text-white">
              {matchDetailsData?.team1_score?.score}/
              {matchDetailsData?.team1_score?.wickets}{" "}
              <span className="text-[#888888] text-[10px]">
                ({matchDetailsData?.team1_score?.overs})
              </span>
            </h6>
          </div>

          <div className="text-ownOrange grid place-items-center">
            {date && (
              <Countdown
                date={date}
                renderer={countdownRenderer}
                onStart={() => setTimeUp(false)}
                onComplete={() => setTimeUp(true)}
              />
            )}
          </div>

          {/* <div>
            <p
              className={`text-[12px] ${
                matchDetailsData?.match_status === "COMPLETED"
                  ? "text-[#04DC00]"
                  : "text-ownOrange"
              }`}
            >
              {matchDetailsData?.match_status}
            </p>
          </div> */}

          <div className="text-end">
            <p className="uppercase text-[#888888]">
              {" "}
              {matchDetailsData?.team2}
            </p>
            <h6 className="text-[20px] text-white">
              {matchDetailsData?.team2_score?.score}/
              {matchDetailsData?.team2_score?.wickets}{" "}
              <span className="text-[#888888] text-[10px]">
                ({matchDetailsData?.team2_score?.overs})
              </span>
            </h6>
          </div>
        </div>
      </div>

      <div className="border-t-[0.2px] border-white/50 text-white text-[12px] py-2 grid place-items-center">
        <p>{matchDetailsData?.status}</p>
      </div>

      <MatchTabs timeUp={timeUp} />
    </div>
  );
};

export default UserParticipatedMatchDetails;
