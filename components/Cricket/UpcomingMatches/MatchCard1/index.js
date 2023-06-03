import { FaRegBell } from "react-icons/fa";
import { TbSpeakerphone, TbCurrencyRupee } from "react-icons/tb";
import moment from "moment";
import Link from "next/link";
import Countdown from "react-countdown";
import { dateCountDown } from "../../../../helpers/dateCountDown";

const MatchCard = ({ data }) => {
  const countdownRenderer = ({ hours, minutes, completed, days, seconds }) => {
    if (completed) {
      return <span>Live</span>;
    } else {
      return (
        <span className="text-ownOrange text-[12px]">
          {/* {days >= 1
            ? `${days}d`
            : hours >= 1
            ? `${hours}h ${minutes}m`
            : `${minutes}m ${seconds}s`} */}
          {`${days}d ${minutes}m ${seconds}s`}
        </span>
      );
    }
  };

  return (
    <Link
      href={
        data?.match_status_enum === "ONGOING"
          ? "#"
          : `/games/cricket/${data.slug}`
      }
    >
      <div
        className={`bg-white text-black rounded-md h-[104px] flex overflow-hidden ${
          data?.match_status_enum === "ONGOING" && "opacity-40" // ONGOING TODAY_MATCH
        } `}
      >
        <div className="w-full px-3 pt-3 flex flex-col justify-between relative">
          <div className="flex items-center justify-between absolute top-0 left-0 px-3 pt-1">
            <p className="text-[9px]">
              {data.match_format} ({data?.series?.name})
            </p>

            {/* <div className="flex space-x-2">
              <TbSpeakerphone size={10} />
              <FaRegBell size={10} />
            </div> */}
          </div>

          <div className="flex justify-evenly items-center space-x-3 mt-4">
            <div className="w-[33.3333%] flex flex-col items-center">
              <img
                src={data?.team_1?.image_url}
                alt=""
                onError={(e) =>
                  !e.target.onerror
                    ? (e.target.src = "/images/tiar_logo_3.svg")
                    : null
                }
                className="w-[30px] h-[30px]"
              />
              {/* <h5 className="font-semibold text-[16px] text-ownOrange uppercase">
                {data?.team_1?.team_s_name}
              </h5> */}
              <p className="text-[9px]">{data?.team_1?.team_name}</p>
            </div>

            <div className="w-[33.3333%] grid place-items-center">
              {/* <p className="font-semibold text-[12px] text-ownOrange">
                {dateCountDown(data?.match_ist_time)}
              </p> */}
              <Countdown
                date={dateCountDown(data?.match_ist_time)}
                renderer={countdownRenderer}
              />
            </div>

            <div className="w-[33.3333%] flex flex-col items-center">
              {/* <h5 className="font-semibold text-[16px] text-ownOrange uppercase">
                {data?.team_2?.team_s_name}
              </h5> */}
              <img
                src={data?.team_2?.image_url}
                alt=""
                onError={(e) =>
                  !e.target.onerror
                    ? (e.target.src = "/images/tiar_logo_3.svg")
                    : null
                }
                className="w-[30px] h-[30px]"
              />
              <p className="text-[9px]">{data?.team_2?.team_name}</p>
            </div>
          </div>

          <div>
            {/* <p className="text-[9px] text-center font-bold">
              {data?.match_ist_time}
            </p> */}
          </div>
        </div>

        <div className="bg-ownOrange w-[59px] h-4/5 py-2 text-[13px] rounded-bl-md flex flex-col items-center justify-center">
          {/* <TbCurrencyRupee size={20} /> */}
          ETH
          <p className="font-semibold text-[15px]">{data?.price}</p>
          {/* <p>crore</p> */}
        </div>
      </div>
    </Link>
  );
};

export default MatchCard;
