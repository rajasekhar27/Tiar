import AliceCarousel from "react-alice-carousel";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { useSelector } from "react-redux";

import { useGetPlayerScoreDetailQuery } from "../../../../store/apis/restApi";

export default function playerDetail() {
  const router = useRouter();
  const { slug } = router.query;

  const playerArr = useSelector((state) => state.games.playerDetail);
  const viewingPlayerIndex = useSelector(
    (state) => state.games.viewingPlayer.index
  );

  useEffect(() => {
    if (playerArr.length === 0) {
      router.back();
    }
  }, [playerArr]);

  const items = playerArr.map((item, index) => (
    <PlayerDetailCard key={index} slug={item} matchSlug={slug} />
  ));

  return (
    <div>
      <div className="p-5 flex items-center space-x-3 text-white bg-black">
        <FiChevronLeft size={30} color="#fff" onClick={() => router.back()} />
        <p>Player Detail</p>
      </div>

      <div>
        <AliceCarousel
          mouseTracking
          items={items}
          disableDotsControls={true}
          //   disableButtonsControls={true}
          paddingLeft={25}
          paddingRight={25}
          activeIndex={viewingPlayerIndex}
        />
      </div>
    </div>
  );
}

const PlayerDetailCard = (props) => {
  //props
  const { slug, matchSlug } = props;

  const { data } = useGetPlayerScoreDetailQuery({
    slug: slug,
    matchSlug: matchSlug,
  });

  //score board
  const scoreTable = [
    {
      id: 0,
      event: `EVENT`,
      actual: `ACTUAL`,
      points: `POINTS`,
    },
    // {
    //   id: 1,
    //   event: `Announced`,
    //   actual: `Yes`,
    //   points: `4`,
    // },
    {
      id: 2,
      event: `Runs`,
      actual: `${data?.detail_points?.runs?.actual}`,
      points: `${data?.detail_points?.runs?.points}`,
    },
    {
      id: 3,
      event: `4’s`,
      actual: `${data?.detail_points?.fours?.actual}`,
      points: `${data?.detail_points?.fours?.points}`,
    },
    {
      id: 4,
      event: `6’s`,
      actual: `${data?.detail_points?.sixes?.actual}`,
      points: `${data?.detail_points?.sixes?.points}`,
    },
    {
      id: 5,
      event: `S/R`,
      actual: `${
        data?.detail_points?.strike_rate?.actual
          ? (data?.detail_points?.strike_rate?.actual).toFixed(2)
          : 0
      }`,
      points: `${data?.detail_points?.strike_rate?.points}`,
    },
    {
      id: 6,
      event: `Balls Faced`,
      actual: `${data?.detail_points?.balls_faced?.actual}`,
      points: `${
        data?.detail_points?.balls_faced?.points
          ? data?.detail_points?.balls_faced?.points
          : 0
      }`,
    },
    {
      id: 7,
      event: `30/50/100`,
      actual: `${data?.detail_points?.runs_bonus?.actual}`,
      points: `${data?.detail_points?.runs_bonus?.points}`,
    },
    {
      id: 8,
      event: `Duck`,
      actual: `${data?.detail_points?.duck?.actual}`,
      points: `${data?.detail_points?.duck?.points}`,
    },
    // {
    //   id: 9,
    //   event: `Overs Bowled`,
    //   actual: `${data?.detail_points?.duck?.actual}`,
    //   points: `${data?.detail_points?.duck?.points}`,
    // },
    {
      id: 10,
      event: `Wickets`,
      actual: `${data?.detail_points?.wickets?.actual}`,
      points: `${data?.detail_points?.wickets?.points}`,
    },
    // {
    //   id: 11,
    //   event: `LBW/Bowled Bonus`,
    //   actual: `${data?.detail_points?.duck?.actual}`,
    //   points: `${data?.detail_points?.duck?.points}`,
    // },
    {
      id: 12,
      event: `2/3/4/5/ Wicket Bonus`,
      actual: `${data?.detail_points?.wickets_bonus?.actual}`,
      points: `${data?.detail_points?.wickets_bonus?.points}`,
    },
    {
      id: 13,
      event: `Maiden Over`,
      actual: `${data?.detail_points?.maiden?.actual}`,
      points: `${data?.detail_points?.maiden?.points}`,
    },
    {
      id: 14,
      event: `E/R`,
      actual: `${data?.detail_points?.economy_rate?.actual}`,
      points: `${data?.detail_points?.economy_rate?.points}`,
    },
  ];

  return (
    <div className="rounded-full mx-4 mt-4">
      {/* player Detail */}
      <div className="greenBlackGradient flex items-center justify-between px-3 font-Poppins bg-white text-white">
        <div className="h-20 w-20 my-3">
          <img
            src={data?.image_url}
            // onError={(e) =>
            //   !e.target.onerror
            //     ? (e.target.src = "/assets/Image/moneysidebar.png")
            //     : null
            // }
            className="w-full h-full object-cover"
          />
        </div>

        <div className="text-center">
          <h1 className="text-xs">Selected By</h1>
          <p className="font-bold mt-2">{data?.selected_by}%</p>
        </div>

        <div className="text-center">
          <h1 className="text-xs">Credits</h1>
          <p className="font-bold mt-2">
            {data?.credits ? (data?.credits).toFixed(0) : 0}
          </p>
        </div>

        <div className="text-center">
          <h1 className="text-xs">Points</h1>
          <p className="font-bold mt-2">{data?.points}</p>
        </div>
      </div>

      {/* player Name */}
      <div className="bg-white">
        <div className="px-4 py-2 font-bold capitalize">{data?.name}</div>

        {/* score board */}
        <div className="text-xs">
          <table className="w-full text-ownGray8 font-Poppins">
            <tbody>
              {scoreTable.map((item) => (
                <tr
                  className={`border-b ${
                    item?.id === 0
                      ? `bg-ownGray2 text-10 text-ownGray8`
                      : `text-ownGray7`
                  }`}
                  key={item?.id}
                >
                  <td className="py-2 pl-4 text-left">{item?.event}</td>
                  <td className="py-2 text-center">{item?.actual}</td>
                  <td className="py-2 pr-4 text-right">{item?.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
