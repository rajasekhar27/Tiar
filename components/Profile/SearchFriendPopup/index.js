//compontent import
import Modal from "../../UI/Modal";

//next import
import { useState } from "react";
import { useRouter } from "next/router";

//third party import
import { useSelector, useDispatch } from "react-redux";
import { BsChevronLeft, BsSearch } from "react-icons/bs";
import { closeSearchFriendPopup } from "../../../store/slices/profile";
import { toast } from "react-toastify";

//api
import {
  useLazyGetAllUsersQuery,
  useFollowBackUserMutation,
} from "../../../store/apis/restApi";
import { profileShuffle } from "../../../helpers/profileShuffle";
import AuthInfiniteScrollComponent from "../../Generic/AuthInfiniteScrollComponent";

export default function SearchFriendPopup() {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const popup = useSelector((state) => state.profile.searchFriendPopup.status);

  const handleClose = () => {
    dispatch(closeSearchFriendPopup());
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Modal isOpen={popup} parentClasses="bg-[#181743] max-w-[450px]">
      {/* header */}
      <div className="px-5 h-20 flex items-center space-x-3">
        <BsChevronLeft color="white" size={15} onClick={handleClose} />

        <div className="px-5 py-[10px] bg-[#fff] rounded-md w-full flex items-center space-x-2">
          <BsSearch />
          <input className="w-full outline-none" onChange={handleSearch} />
        </div>
      </div>

      {/* body */}
      <AuthInfiniteScrollComponent
        height={`calc(100vh - 80px)`}
        lazyHook={useLazyGetAllUsersQuery}
        customEnd={<></>}
        parentClasses={"!space-y-[2px]"}
        hookParams={{ search: search }}
      >
        <UserCard />
      </AuthInfiniteScrollComponent>
    </Modal>
  );
}

const UserCard = ({ data, clearData }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [followBackUser] = useFollowBackUserMutation();

  const handleFollowBack = (e) => {
    e.stopPropagation();

    followBackUser({ slug: data.slug, data: {} }).then((res) => {
      if (res.data) {
        toast.success(`You have followed ${data?.owner_profile?.name} back!`);
        clearData();
      }

      if (res.error) {
        toast.error("something went wrong");
      }
    });
  };

  const handleRoute = () => {
    dispatch(closeSearchFriendPopup());
    router.push(`/profile/user/${data?.slug}`);
  };

  return (
    <div
      key={data.id}
      className="flex items-center justify-between py-3 bg-white/10 px-5"
      onClick={handleRoute}
    >
      <div className="flex items-center space-x-3">
        <div className="w-[36px] h-[36px] rounded-full overflow-hidden">
          <img
            src={
              data?.owner_profile?.image
                ? `${process.env.NEXT_PUBLIC_BACKEND_IMG_BASEURL}${data?.owner_profile?.image}`
                : profileShuffle()
            }
            alt=""
            className=""
          />
        </div>

        <h5 className="text-[14px] font-medium text-white">
          {data?.owner_profile?.name}
        </h5>
      </div>

      {!data.following_status ? (
        <button
          className="bg-ownOrange p-1 rounded-md text-[12px] font-semibold text-white"
          onClick={handleFollowBack}
        >
          FOLLOW
        </button>
      ) : (
        <div
          onClick={handleRoute}
          className="border border-white/50 rounded-md p-1 text-[12px] text-white"
        >
          <p>View Profile</p>
        </div>
      )}
    </div>
  );
};
