import Link from "next/link";
import { useRouter } from "next/router";
import CricketContestCard from "../../CricketContestCard";

const RecentlyPlayed = ({ getHook, hookParams, opponentSlug }) => {
  const { data: recentlyPlayedContestsData } = getHook({ ...hookParams });

  const router = useRouter();

  return (
    <div>
      <div className="flex items-center justify-between my-3">
        <p className="text-[16px] text-white font-bold">Recently Played:</p>
        <Link
          href={
            opponentSlug
              ? `/recent-contests/?user=${opponentSlug}`
              : "/recent-contests"
          }
        >
          <p className="text-ownOrange text-[12px]">{`View All >`}</p>
        </Link>
      </div>

      <div className="flex overflow-x-auto overflow-y-hidden">
        {recentlyPlayedContestsData?.count === 0 ? (
          <img src="/images/ball and stumps 1.png" alt="" />
        ) : (
          recentlyPlayedContestsData?.results?.map((i, idx) => (
            <div
              onClick={() => router.push(`/games/my-contests/${i?.slug}`)}
              key={i?.id}
              className="flex-shrink-0 mx-2"
            >
              <CricketContestCard
                highestPoints={i?.highest_points?.highest_points}
                teamName={i?.highest_points?.team_name}
                team1Img={i?.team_1?.image_url}
                team2Img={i?.team_2?.image_url}
                team1Name={i?.team_1?.team_s_name}
                team2Name={i?.team_2?.team_s_name}
                teamsCreated={i?.teams_created}
                status={i?.status}
                date={i?.match_ist_time}
                enteredContests={i?.no_of_times_entered}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentlyPlayed;
