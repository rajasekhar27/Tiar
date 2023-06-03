import { useViewportSize } from "@mantine/hooks";
import { useRouter } from "next/router";
import { BsChevronLeft, BsChatLeft } from "react-icons/bs";
import { FiBell } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  useAcceptChatRequestMutation,
  useLazyGetAllChatGroupsQuery,
  useLazyGetAllUnknownChatGroupsQuery,
} from "../../store/apis/restApi";
import { openChatUsersPopup } from "../../store/slices/profile";
import AuthInfiniteScrollComponent from "../Generic/AuthInfiniteScrollComponent";

const Chat = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { height: windowHeight } = useViewportSize();

  const handleDirectMessage = () => {
    dispatch(openChatUsersPopup());
  };

  return (
    <div className="min-h-screen text-white">
      <div className="flex items-center p-5 border-b border-white/60">
        <div className="flex-1">
          <BsChevronLeft size={20} onClick={() => router.back()} />
        </div>
        <div className="flex-[3] text-center">
          <h5 className="text-[16px] font-semibold">CHAT</h5>
        </div>
        <div className="flex-1 flex justify-end">
          <FiBell size={19} onClick={() => router.push("/notifications")} />
        </div>
      </div>

      <div className="px-5 my-3">
        <button
          className="w-full h-[44px] border-2 rounded-md border-ownOrange text-ownOrange bg-ownOrange/30 text-[16px] font-semibold flex items-center space-x-2 justify-center"
          onClick={handleDirectMessage}
        >
          <BsChatLeft /> <span>Direct Chat</span>
        </button>
      </div>

      <div>
        <h5 className="px-5 text-[16px] font-semibold mb-3">
          Pending Requests:
        </h5>

        <AuthInfiniteScrollComponent
          lazyHook={useLazyGetAllUnknownChatGroupsQuery}
          customEnd={<></>}
          height={64 * 3}
          emptyHandler={
            <div className="w-full px-5 animate__animated animate__zoomIn">
              <div className="py-2 w-full bg-white rounded-md text-black text-[12px] flex flex-col items-center space-y-2">
                <img
                  src="/images/pendingRequestEmpty.svg"
                  alt=""
                  srcset=""
                  className="h-[60px]"
                />
                <p>No Requests Found</p>
              </div>
            </div>
          }
        >
          <PendingCard />
        </AuthInfiniteScrollComponent>

        <h5 className="px-5 text-[16px] font-semibold my-3">
          People you may know:
        </h5>

        <AuthInfiniteScrollComponent
          lazyHook={useLazyGetAllChatGroupsQuery}
          customEnd={<></>}
          height={windowHeight - 65 - 44 - 320}
          parentClasses={"space-y-0"}
          emptyHandler={
            <div className="flex items-center flex-col space-y-2 animate__animated animate__zoomIn">
              <img src="/images/nofriends.svg" alt="" />
              <p className="opacity-50">No Friends Found</p>
            </div>
          }
        >
          <ChatCard />
        </AuthInfiniteScrollComponent>
      </div>
    </div>
  );
};

const PendingCard = ({ data, clearData }) => {
  const [acceptChatRequest] = useAcceptChatRequestMutation();

  const handleAccept = () => {
    acceptChatRequest({ slug: data.slug, data: { accept: true } }).then(
      (res) => {
        if (res.data) {
          toast.success("successfully accepted");
          // clearData();
          window.location.reload();
        }

        if (res.error) {
          toast.error("something went wrong");
        }
      }
    );
  };

  return (
    <div className="h-[64px] rounded-md bg-white border border-ownOrange flex items-center justify-between px-5 space-x-4 ">
      <div className="w-[36px] h-[36px] rounded-full overflow-hidden object-cover flex-initial">
        <img
          src={
            data?.group?.image
              ? `${process.env.NEXT_PUBLIC_BACKEND_IMG_BASEURL}${data?.group?.image}`
              : "https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg"
          }
          alt=""
          className="w-full h-full"
        />
      </div>

      <div className="flex-auto text-black">
        <h5 className="text-ownOrange text-[14px] font-medium">
          {data?.group.name}
        </h5>
        <p className="text-[12px]">{data?.latest_message?.message}</p>
      </div>

      <div className="flex-initial">
        <button
          className="bg-ownOrange px-3 py-1 rounded-md text-[14px] font-semibold"
          onClick={handleAccept}
        >
          Accept
        </button>
      </div>
    </div>
  );
};

const ChatCard = ({ data }) => {
  const router = useRouter();

  return (
    <div className="h-[64px] bg-white/10 border-b border-white/40 flex items-center justify-between px-5 space-x-4">
      <div className="w-[36px] h-[36px] rounded-full overflow-hidden object-cover flex-initial">
        <img
          src={
            data?.group?.image
              ? `${process.env.NEXT_PUBLIC_BACKEND_IMG_BASEURL}${data?.group?.image}`
              : "https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg"
          }
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-auto">
        <h5 className="text-ownOrange text-[14px] font-medium">
          {data?.group?.name}
        </h5>
        <p className="text-[12px]">{data?.latest_message?.message}</p>
      </div>

      <div className="flex-initial">
        <button
          className="bg-ownOrange px-3 py-1 rounded-md text-[14px] font-semibold"
          onClick={() =>
            router.push(`/profile/social/chats/${data.oponnent}/${data?.slug}`)
          }
        >
          Message
        </button>
      </div>
    </div>
  );
};

export default Chat;
