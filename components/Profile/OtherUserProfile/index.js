import { MdOutlineVerifiedUser } from "react-icons/md";
import { BiChevronLeft } from "react-icons/bi";
import { useRouter } from "next/router";
import {
  useFollowBackUserMutation,
  useGetOpponentProfileDetailsQuery,
  useGetOpponentRecentPlayedMatchesQuery,
  useGetOtherUserComparisonStatsQuery,
  useUnFollowUserMutation,
} from "../../../store/apis/restApi";
import moment from "moment/moment";
import { profileShuffle } from "../../../helpers/profileShuffle";
import { toast } from "react-toastify";
import RecentlyPlayed from "../RecentlyPlayed";

const OtherUserProfile = (props) => {
  const router = useRouter();

  const { id } = router.query;

  const { data: otherUserComparisonStatsData } =
    useGetOtherUserComparisonStatsQuery(
      { slug: id },
      { skip: id ? false : true }
    );

  const opponentImage = otherUserComparisonStatsData?.comparision_user_details
    ?.image
    ? `${process.env.NEXT_PUBLIC_BACKEND_IMG_BASEURL}${otherUserComparisonStatsData?.comparision_user_details?.image}`
    : profileShuffle();

  return (
    <div className="px-5">
      <div className="flex items-center space-x-2 my-3">
        <BiChevronLeft color="white" size={30} onClick={() => router.back()} />
        <p className="text-[16px] font-[16] text-white">Back</p>
      </div>

      <ProfileCard
        name={otherUserComparisonStatsData?.name}
        img={opponentImage}
        followersCount={
          otherUserComparisonStatsData?.comparision_user_details
            ?.followers_count
        }
        followingCount={
          otherUserComparisonStatsData?.comparision_user_details
            ?.following_count
        }
        isFriend={
          otherUserComparisonStatsData?.comparision_user_details?.friend_status
        }
        isFollowing={
          otherUserComparisonStatsData?.comparision_user_details
            ?.owner_following_oponent
        }
        slug={
          otherUserComparisonStatsData?.comparision_user_details
            ?.comparision_user_slug
        }
      />
      <CareerStats
        opponentName={otherUserComparisonStatsData?.name}
        comparisionStats={
          otherUserComparisonStatsData?.comparision_career_stats
        }
        ownerStats={otherUserComparisonStatsData?.owner_career_stats}
        opponentImage={opponentImage}
        userImage={
          otherUserComparisonStatsData?.owner_career_stats?.image
            ? `${process.env.NEXT_PUBLIC_BACKEND_IMG_BASEURL}${otherUserComparisonStatsData?.owner_career_stats?.image}`
            : profileShuffle()
        }
      />

      <div className="mb-5">
        <RecentlyPlayed
          opponentSlug={id}
          getHook={useGetOpponentRecentPlayedMatchesQuery}
          hookParams={{ slug: id, limit: 10, offset: 0 }}
        />
      </div>
    </div>
  );
};

const ProfileCard = ({
  name,
  img,
  followersCount,
  followingCount,
  isFollowing,
  slug,
}) => {
  const { data: opponentProfileData } = useGetOpponentProfileDetailsQuery(
    { slug: slug },
    { skip: slug ? false : true }
  );
  const [followBackUser] = useFollowBackUserMutation();
  const [unFollowUser] = useUnFollowUserMutation();

  const handleFollow = () => {
    followBackUser({ slug: slug, data: {} }).then((res) => {
      if (res.data) {
        toast.success(`You are now following ${name}`);
      }

      if (res.error) {
        toast.error("something went wrong");
      }
    });
  };

  const handleUnFollow = () => {
    if (confirm("Are you sure, You want to unfollow this User ?")) {
      unFollowUser({ slug: slug, data: {} }).then((res) => {
        if (res.data) {
          toast.success(`Unfollowed ${name} successfully`);
        }

        if (res.error) {
          toast.error("something went wrong");
        }
      });
    }
  };

  return (
    <div className="bg-white rounded-lg py-3 px-4">
      <div className="flex space-x-3">
        <div className="flex flex-col items-center">
          <div className="w-[60px] h-[60px] rounded-full overflow-hidden">
            <img src={img} alt="" className="w-full h-full object-cover" />
          </div>

          <h4 className="text-ownOrange font-semibold text-[16px] max-w-[100%] text-center">
            {name}
          </h4>
        </div>

        <div className="flex-auto flex flex-col items-end">
          {opponentProfileData?.verified_status && (
            <div className="flex items-center space-x-2">
              <MdOutlineVerifiedUser color="#1E1E1E" />
              <p className="text-[14px] text-[#1E1E1E]">Verified</p>
            </div>
          )}

          <div className="flex justify-evenly mt-2 w-full space-x-3">
            <div className="text-black text-center">
              <h1 className="text-[18px] font-semibold">
                {followersCount ? followersCount : 0}
              </h1>
              <p className="text-[12px] ">Followers</p>
            </div>
            <div className="text-black text-center">
              <h1 className="text-[18px] font-semibold">
                {followingCount ? followingCount : 0}
              </h1>
              <p className="text-[12px] ">Following</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-2">
        <button className="bg-ownOrange text-white font-semibold text-[14px] p-2 rounded-md invisible">
          CHALLENGE
        </button>
        {/* <button className="bg-ownOrange text-white font-semibold text-[14px] p-2 rounded-md">
          ADD FRIEND
        </button> */}
        {isFollowing ? (
          <button
            className="bg-ownOrange text-white font-semibold text-[14px] p-2 rounded-md"
            onClick={handleUnFollow}
          >
            UNFOLLOW
          </button>
        ) : (
          <button
            className="bg-ownOrange text-white font-semibold text-[14px] p-2 rounded-md"
            onClick={handleFollow}
          >
            FOLLOW
          </button>
        )}
      </div>
    </div>
  );
};

const CareerStats = ({
  comparisionStats,
  ownerStats,
  opponentName,
  opponentImage,
  userImage,
}) => {
  return (
    <div className="text-white ">
      <h4 className="text-[16px] font-semibold my-5">Career Stats</h4>

      <div className="bg-[url('/images/frame_13.svg')] p-3">
        <div className="flex items-center justify-between mb-5">
          <StatProfile
            winRate={comparisionStats?.win_rate}
            name={opponentName}
            isTopper={comparisionStats?.win_rate > ownerStats?.win_rate}
            image={opponentImage}
          />
          <p className="self-end mb-3 text-[14px] font-medium">Win Rate</p>
          <StatProfile
            winRate={ownerStats?.win_rate}
            name={"YOU"}
            isTopper={ownerStats?.win_rate > comparisionStats?.win_rate}
            image={userImage}
          />
        </div>

        {comparisionStats &&
          Object.keys(comparisionStats)
            .filter((k) => k !== "win_rate")
            .map((i, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-5 border-t-2 border-gray-500"
              >
                <p className="flex-1 text-center">
                  {i === "playing_since"
                    ? moment(comparisionStats[i]).format("MMM Do YYYY")
                    : comparisionStats[i]}
                </p>
                <p className="flex-1 text-center capitalize whitespace-nowrap text-white/50">
                  {i.replace("_", " ")}
                </p>
                <p className="flex-1 text-center">
                  {i === "playing_since"
                    ? moment(ownerStats[i]).format("MMM Do YYYY")
                    : ownerStats[i]}
                </p>
              </div>
            ))}
      </div>
    </div>
  );
};

const StatProfile = ({ winRate, name, isTopper, image }) => {
  return (
    <div className="flex flex-col items-center space-y-2 flex-1">
      <div className="w-[60px] h-[60px] rounded-full overflow-hidden">
        <img src={image} alt="" className="w-full h-full object-cover" />
      </div>

      <h4 className="text-[14px] font-medium uppercase max-w-[90%] text-center h-10">
        {name}
      </h4>

      <div
        className={`w-[70px] h-[49px] rounded-lg bg-black border ${
          isTopper ? "border-green-500" : "border-red-500"
        } flex font-codyStar`}
      >
        {winRate
          ?.toString()
          ?.split("")
          .map((n, idx) => (
            <div
              className={`flex-1 grid place-items-center ${
                idx !== 0 && "border-l border-gray-500"
              }`}
            >
              <p>{n}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OtherUserProfile;
