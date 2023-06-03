//compontent import
import Modal from "../../UI/Modal";

//next import
import { useState } from "react";
import { useRouter } from "next/router";

//third party import
import { useSelector, useDispatch } from "react-redux";
import { BsChevronLeft, BsSearch } from "react-icons/bs";
import { closeChatUsersPopup } from "../../../store/slices/profile";

//api
import {
  useLazyGetAllUsersQuery,
  useFollowBackUserMutation,
  useLazyGetChatUserDetailsQuery,
} from "../../../store/apis/restApi";
import { profileShuffle } from "../../../helpers/profileShuffle";
import AuthInfiniteScrollComponent from "../../Generic/AuthInfiniteScrollComponent";
import { toast } from "react-toastify";
import { useEffect } from "react";
import restApi from "../../../store/apis/restApi";

export default function ChatUsersPopup() {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const popup = useSelector((state) => state.profile.chatUsersPopup.status);

  const handleClose = () => {
    dispatch(closeChatUsersPopup());
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (!popup) return;

    setSearch("");
  }, [popup]);

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
  const [chatUserDetails] = useLazyGetChatUserDetailsQuery();

  const handleMessage = (e) => {
    e.stopPropagation();
    chatUserDetails({ slug: data?.slug }).then((res) => {
      if (res.data) {
        router.push(
          `/profile/social/chats/${res.data?.oponnent_details?.oponnent_slug}/${res.data.group}`
        );

        dispatch(closeChatUsersPopup());
      }

      if (res.error) {
        toast.error("Something went wrong");
      }
    });
  };

  const handleRoute = () => {
    dispatch(closeChatUsersPopup());
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

      <button
        className="bg-ownOrange p-1 rounded-md text-[12px] font-semibold text-white"
        onClick={handleMessage}
      >
        Message
      </button>
    </div>
  );
};
