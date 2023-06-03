import { useRouter } from "next/router";
import Scrollbars from "react-custom-scrollbars-2";
import { useSelector } from "react-redux";
import { profileShuffle } from "../../helpers/profileShuffle";
import { useGetAppEarningsLeaderboardQuery } from "../../store/apis/restApi";

const HomeLeaderboard = (props) => {
  const { data: appEarningsData } = useGetAppEarningsLeaderboardQuery();

  return (
    <div>
      <h1 className="text-[16px] font-semibold text-white mb-2">Leaderboard</h1>

      <Scrollbars style={{ height: "120px" }}>
        <div className="flex items-center space-x-3">
          {appEarningsData?.map((a, idx) => (
            <LeaderboardCard
              key={idx}
              rank={idx + 1}
              name={a?.user?.name}
              img={a?.user?.image}
              earnings={a?.total_amount}
              slug={a?.user?.slug}
            />
          ))}
          {/* {Array(10)
            .fill(10)
            .map((l, idx) => (c
              <LeaderboardCard key={idx} />
            ))} */}
        </div>
      </Scrollbars>
    </div>
  );
};

const LeaderboardCard = ({ rank, name, img, earnings, slug }) => {
  const router = useRouter();
  const loggedUserSlug = useSelector((state) => state.auth.user.owner_slug);

  return (
    <div
      className="w-[95px] h-[109px] bg-white rounded-md overflow-hidden shrink-0 animate__animated animate__zoomIn"
      onClick={() =>
        slug === loggedUserSlug
          ? router.push("/profile")
          : router.push(`/profile/user/${slug}`)
      }
    >
      <div className="h-[85px] w-full border border-x-ownOrange border-t-ownOrange rounded-t-md p-1 grid place-items-center">
        <div className="text-[14px] font-medium flex items-center space-x-2 ">
          <h5 className="text-[#EBC767]">#{rank}</h5>
          <h5 className="text-ellipsis max-w-[63px] whitespace-nowrap overflow-hidden">
            {name}
          </h5>
        </div>

        <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
          <img
            src={
              img
                ? `${process.env.NEXT_PUBLIC_BACKEND_IMG_BASEURL}${img}`
                : profileShuffle()
            }
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="h-[24px] w-full bg-[#E4F1F4] text-center">
        <p className="text-[14px] truncate font-semibold px-[1px]">
          ${earnings}
        </p>
      </div>
    </div>
  );
};

export default HomeLeaderboard;
