import { useViewportSize } from "@mantine/hooks";
import { useRouter } from "next/router";
import { profileShuffle } from "../../../../../helpers/profileShuffle";
import {
  useGetAllFriendsCountQuery,
  useLazyGetAllFriendsQuery,
} from "../../../../../store/apis/restApi";
import AuthInfiniteScrollComponent from "../../../../Generic/AuthInfiniteScrollComponent";

const FriendsTab = (props) => {
  const { height: windowHeight } = useViewportSize();

  const { data: friendsData } = useGetAllFriendsCountQuery();

  return (
    <>
      <div className="px-5 py-1">
        <p className="text-[12px] text-[#AEAEAE]">
          You have {friendsData ? friendsData?.count : 0} Friends
        </p>
      </div>
      <AuthInfiniteScrollComponent
        lazyHook={useLazyGetAllFriendsQuery}
        height={windowHeight - 64 - 43 - 30}
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

const UserCard = ({ data }) => {
  const router = useRouter();

  return (
    <div
      key={data.id}
      className="flex items-center justify-between py-3 bg-white/10 px-5"
      onClick={() => router.push(`/profile/user/${data?.slug}`)}
    >
      <div className="flex items-center space-x-3 ">
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

      {/* <button
        className="bg-ownOrange p-1 rounded-md text-[12px] font-semibold"
        // onClick={handleUnFollow}
      >
        UNFOLLOW
      </button> */}
    </div>
  );
};

export default FriendsTab;
