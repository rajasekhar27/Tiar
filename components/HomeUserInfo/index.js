import { FiBell } from "react-icons/fi";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useGetUserProfileDetailsQuery } from "../../store/apis/restApi";
import { useRouter } from "next/router";
import { profileShuffle } from "../../helpers/profileShuffle";
import { BsSearch, BsChatLeft } from "react-icons/bs";
import { openSearchFriendPopup } from "../../store/slices/profile";
import { useDispatch } from "react-redux";

const HomeUserInfo = (props) => {
  const dispatch = useDispatch();
  const { data: userData } = useGetUserProfileDetailsQuery();
  const router = useRouter();

  return (
    <div className="text-white w-full my-4 flex justify-between items-center relative">
      <div className="font-poppins text-[16px] flex items-center space-x-3">
        {/* <h6>Hello!</h6> */}
        <Link href={"/profile/social/chats"}>
          <BsChatLeft size={18} />
        </Link>

        <BsSearch
          color="white"
          size={18}
          onClick={() => dispatch(openSearchFriendPopup())}
        />
      </div>

      <div className="flex flex-col items-center">
        <img
          src="/images/tiar_logo_1.svg"
          alt=""
          className="h-[40px] max-w-[70px] object-contain"
        />
        {/* <p className="font-semibold text-[18px] invisible">Dummy Placeholder</p> */}
      </div>

      {/* <div className="invisible">
        <h6 className="text-[15px] font-medium">Hello</h6>
        <h4 className="text-[18px] font-semibold">{data?.user?.name}</h4>
      </div> */}

      <div className="flex space-x-3 items-center justify-end">
        <FiBell size={18} onClick={() => router.push("/notifications")} />

        <div className="w-[20px] h-[20px] overflow-hidden rounded-full">
          <img
            onError={(e) =>
              !e.target.onerror
                ? (e.target.src = "/images/tiar_logo_3.svg")
                : null
            }
            src={
              userData?.user_profile?.image
                ? `${process.env.NEXT_PUBLIC_BACKEND_IMG_BASEURL}${userData?.user_profile?.image}`
                : profileShuffle()
            }
            className="w-full h-full bg-white"
            alt=""
            onClick={() => router.push("/profile")}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeUserInfo;
