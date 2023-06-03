import { TbSpeakerphone } from "react-icons/tb";
import { FiBell } from "react-icons/fi";
import Link from "next/link";
import Countdown from "react-countdown";
import { dateCountDown } from "../../../../helpers/dateCountDown";
import { openCricketMatchReminderPopup } from "../../../../store/slices/games";
import { useDispatch } from "react-redux";
import { FaDollarSign } from "react-icons/fa";
// import Card from "react-animated-3d-card";

const MatchCard = ({ data }) => {
  const dispatch = useDispatch();

  const countdownRenderer = ({ hours, minutes, completed, days }) => {
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
          {`${days}d ${hours}h ${minutes}m`} {/*  ${seconds}s */}
        </span>
      );
    }
  };

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

  return (
    // <Card style={{ width: "200px" }} borderRadius={"6px"}>
    <Link
      href={
        data?.match_status_enum === "ONGOING"
          ? "#"
          : `/games/cricket/${data.slug}`
      }
    >
      <div
        className={`h-[104px] w-full bg-white rounded-t-md rounded-md flex overflow-hidden ${
          data?.match_status_enum === "ONGOING" && "opacity-40" // ONGOING TODAY_MATCH
        }`}
      >
        <div className="w-[80%]">
          <div className="p-1 pl-5 pr-2 border-b-[0.6px] border-[#111111]/20 flex items-center justify-between">
            <p className="text-[9px] text-[#111111]/50">
              {data?.series?.name} ( {data?.match_format} )
            </p>

            <div className="flex items-center space-x-2">
              {data?.squard_released && (
                <TbSpeakerphone size={12} color="black" />
              )}
              <FiBell size={12} color="black" onClick={handleNotifications} />
            </div>
          </div>

          <div className="flex items-center h-[calc(100%-23.59px)]">
            <div className="w-[37.5%] flex flex-col items-center text-black text-[7px] space-y-2">
              <img
                src={data?.team_1?.image_url}
                alt=""
                onError={(e) =>
                  !e.target.onerror
                    ? (e.target.src = "/images/tiar_logo_3.svg")
                    : null
                }
                className="w-[50px] h-[34px] object-cover"
              />
              <p className="text-[12px] text-center">
                {data?.team_1?.team_name}
              </p>
            </div>

            <div className="w-[25%] grid place-items-center">
              <Countdown
                date={dateCountDown(data?.match_ist_time)}
                renderer={countdownRenderer}
              />
            </div>

            <div className="w-[37.5%] flex flex-col items-center text-black text-[7px] space-y-2">
              <div className="w-[50px] h-[34px]">
                <img
                  src={data?.team_2?.image_url}
                  alt=""
                  onError={(e) =>
                    !e.target.onerror
                      ? (e.target.src = "/images/tiar_logo_3.svg")
                      : null
                  }
                  className="w-[50px] h-[34px] object-cover"
                />
              </div>
              <p className="text-[12px] text-center">
                {data?.team_2?.team_name}
              </p>
            </div>
          </div>
        </div>

        {/* Orange box */}
        <div className="w-[20%] bg-gradient-to-b from-[#FFA787] to-[#FF4300] rounded-bl-md text-[12px] grid place-items-center h-[80%]">
          <div className="text-center text-[20px] italic font-bold flex flex-col items-center">
            <p className="">Win</p>
            <p>{data?.contest_currency}</p>
            {/* <FaDollarSign color="#85BB65" /> */}
          </div>
        </div>
      </div>
    </Link>
    // </Card>
  );
};

export default MatchCard;
