import CareerStats from "./CareerStats";
import ConnectWithFriends from "./ConnectWithFriends";
import InviteFriends from "./InviteFriends";
import ProfileStats from "./ProfileStats";
import RecentlyPlayed from "./RecentlyPlayed";
import { BsChevronLeft } from "react-icons/bs";
import { useRouter } from "next/router";
import restApi, {
  useUserRecentlyPlayedContestsQuery,
} from "../../store/apis/restApi";
import { removeTokens } from "../../store/slices/auth";
import { useDispatch } from "react-redux";
import { signOut } from "next-auth/react";
import { AiOutlineHome, AiOutlineQuestionCircle } from "react-icons/ai";
import { FiChevronRight } from "react-icons/fi";
import Link from "next/link";

const Profile = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut({ callbackUrl: `${window.location.origin}`, redirect: false }).then(
      () => {
        dispatch(restApi.util.resetApiState());
      }
    );

    dispatch(removeTokens());
  };

  return (
    <div className="px-5">
      <div className="text-center my-5 flex items-center justify-center relative">
        <div className="place-self-start absolute left-0 flex items-center space-x-2">
          <BsChevronLeft color="white" onClick={() => router.back()} />
          <AiOutlineHome color="white" onClick={() => router.push("/")} />
        </div>

        <p className="text-[16px] font-bold text-white">MY PROFILE</p>
      </div>

      <InviteFriends />
      <ProfileStats />
      <ConnectWithFriends />
      <CareerStats />
      <RecentlyPlayed
        getHook={useUserRecentlyPlayedContestsQuery}
        params={{
          limit: 10,
          offset: 0,
        }}
      />

      <Link href="/support/tickets">
        <div className="text-white flex justify-between bg-white/10 p-2 mt-5 rounded-md items-center">
          <div className="flex items-center space-x-2">
            <AiOutlineQuestionCircle size={24} />
            <p className="text-[16px] font-semibold">Help & Support</p>
          </div>
          <FiChevronRight size={24} />
        </div>
      </Link>

      <div className="grid place-items-center mt-5 mb-7">
        <button
          className="text-[#DF3840] font-medium text-[16px] border border-[#DF3840] w-[150px] h-[40px] rounded-md "
          onClick={handleSignOut}
        >
          LOG OUT
        </button>
      </div>
    </div>
  );
};

export default Profile;
