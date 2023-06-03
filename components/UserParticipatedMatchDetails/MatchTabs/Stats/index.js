import {
  useGetMatchStatsQuery,
  useViewOtherTeamDetailsQuery,
} from "../../../../store/apis/restApi";
import Scrollbars from "react-custom-scrollbars-2";
import { useViewportSize } from "@mantine/hooks";
import {
  setPlayerDetail,
  setViewingPlayer,
} from "../../../../store/slices/games";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

const Stats = ({ slug }) => {
  const { height: windowHeight } = useViewportSize();

  const dispatch = useDispatch();

  const router = useRouter();

  const { data: matchStatsData } = useGetMatchStatsQuery({
    slug: slug,
  });

  const playerArr = matchStatsData?.data?.map((item) => item.slug);

  const handleRoute = (activeSlug) => {
    const playerIndex = playerArr.indexOf(activeSlug);
    dispatch(setPlayerDetail(playerArr));
    dispatch(setViewingPlayer({ slug: activeSlug, index: playerIndex }));
    router.push(`/games/cricket/player-detail/${slug}`);
  };

  return (
    <Scrollbars style={{ height: windowHeight - 34 - 35 - 136 - 20 }}>
      <div className=" bg-white">
        <div className="flex items-center justify-between text-[12px] py-3 px-5 text-black/50">
          <p>PLAYER</p>
          <div className="flex items-center justify-between w-1/2">
            <p className="w-[50px] whitespace-nowrap">% SEL BY</p>
            <p className="w-[50px] whitespace-nowrap">% C BY</p>
            <p className="w-[50px]">POINTS</p>
          </div>
        </div>
        {matchStatsData?.data?.map((p, idx) => (
          <PlayerCard key={idx} data={p} handleRoute={handleRoute} />
        ))}
      </div>
    </Scrollbars>
  );
};

const PlayerCard = ({ idx, data, handleRoute }) => {
  return (
    <div
      className={`text-[10px] flex items-center justify-between h-[58px] px-4 border-b  ${
        data?.user_select ? `bg-yellow-400 bg-opacity-20` : ``
      }`}
    >
      <div
        className="flex items-center space-x-5 w-[180px]"
        onClick={() => handleRoute(data?.slug)}
      >
        <div className="relative">
          <img
            src={data?.player_image}
            alt=""
            onError={(e) =>
              !e.target.onerror
                ? (e.target.src = "/images/tiar_logo_3.svg")
                : null
            }
            className="w-[49px] h-full"
          />
          <div
            className={`absolute bottom-0 -right-5 ${
              !data?.user_select ? `bg-yellow-400 bg-opacity-20` : `bg-white`
            } px-1 rounded-sm`}
          >
            <p>{data?.team}</p>
          </div>
        </div>

        <div>
          <p className="font-semibold">{data?.name}</p>
          <p>{data?.player_role}</p>
        </div>
      </div>

      <div className="flex items-center justify-end w-1/2 space-x-4 text-center">
        <p className="w-[50px]">{data?.selected_by}%</p>
        <p className="w-[50px]">{data?.captain_select}%</p>
        <p className="w-[50px]">{data?.points}</p>
      </div>
    </div>
  );
};

export default Stats;
