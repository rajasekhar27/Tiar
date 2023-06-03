import { useViewportSize } from "@mantine/hooks";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { profileShuffle } from "../../../../../helpers/profileShuffle";
import {
  useFollowBackUserMutation,
  useGetAllFollowersCountQuery,
  useGetAllFollowersQuery,
  useLazyGetAllFollowersQuery,
} from "../../../../../store/apis/restApi";
import AuthInfiniteScrollComponent from "../../../../Generic/AuthInfiniteScrollComponent";

const FollowersTab = (props) => {
  const { height: windowHeight } = useViewportSize();

  const { data: followersData } = useGetAllFollowersCountQuery();

  return (
    <>
      <div className="px-5 py-1">
        <p className="text-[12px] text-[#AEAEAE]">
          {followersData ? followersData?.count : 0} People are following you
        </p>
      </div>

      <AuthInfiniteScrollComponent
        height={windowHeight - 64 - 43 - 30}
        lazyHook={useLazyGetAllFollowersQuery}
        customEnd={<></>}
        emptyHandler={
          <div className="px-5">
            <img src="/images/noFriends.png" />
          </div>
        }
        parentClasses={"!space-y-[2px]"}
        endMessage={`...`}
      >
        <UserCard />
      </AuthInfiniteScrollComponent>
    </>
  );
};

const UserCard = ({ data, clearData }) => {
  const router = useRouter();

  const [followBackUser] = useFollowBackUserMutation();

  const handleFollowBack = (e) => {
    e.stopPropagation();

    followBackUser({ slug: data.slug, data: {} }).then((res) => {
      if (res.data) {
        toast.success(`You have followed ${data?.user_profile?.name} back! `);
        clearData();
      }

      if (res.error) {
        toast.error("something went wrong");
      }
    });
  };

  return (
    <div
      key={data.id}
      className="flex items-center justify-between py-3 bg-white/10 px-5"
      onClick={() => router.push(`/profile/user/${data?.slug}`)}
    >
      <div className="flex items-center space-x-3">
        <div className="w-[36px] h-[36px] rounded-full overflow-hidden">
          <img
            src={
              data?.user_profile?.image
                ? `${process.env.NEXT_PUBLIC_BACKEND_IMG_BASEURL}${data?.user_profile?.image}`
                : profileShuffle()
            }
            alt=""
            className=""
          />
        </div>

        <h5 className="text-[14px] font-medium">{data?.user_profile?.name}</h5>
      </div>

      {data.follow_back ? (
        <button
          className="bg-ownOrange p-1 rounded-md text-[12px] font-semibold"
          onClick={handleFollowBack}
        >
          FOLLOW BACK
        </button>
      ) : (
        <div className="border border-white/50 rounded-md p-1 text-[12px]">
          <p>FOLLOWING</p>
        </div>
      )}
    </div>
  );
};

export default FollowersTab;
