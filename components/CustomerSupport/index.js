import { useViewportSize } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsChevronLeft } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import { useSelector } from "react-redux";
import useWebSocket, { ReadyState } from "react-use-websocket";
import {
  useGetChatUserDetailsQuery,
  useLazyGetPreviousCustomerCareChatsQuery,
} from "../../store/apis/restApi";
import AuthInfiniteScrollComponent from "../Generic/AuthInfiniteScrollComponent";

const CustomerSupport = ({ userSlug, groupSlug }) => {
  const [msg, setMsg] = useState("");
  const [socketMsgsHistory, setSocketMsgsHistory] = useState([]);

  const router = useRouter();
  const { slug } = router.query;
  const token = useSelector((state) => state.auth.accessToken);
  const { height: windowHeight } = useViewportSize();

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    `${process.env.NEXT_PUBLIC_BACKEND_WEBSOCKET_BASEURL}ws/chat/${
      groupSlug ? groupSlug : slug
    }/?${token}`,
    {
      shouldReconnect: () => true,
    }
  );

  const { data: chatUserDetailsData } = useGetChatUserDetailsQuery(
    { slug: userSlug },
    { skip: userSlug ? false : true }
  );

  // ** Sends New Msg
  const handleSendMsg = (e) => {
    e.preventDefault();
    if (!msg || msg.replace(/\s/g, "").length === 0) {
      return;
    }

    sendJsonMessage({
      handler: groupSlug ? "personal" : "general",
      message: msg,
    });

    setMsg("");
  };

  useEffect(() => {
    if (lastJsonMessage !== null) {
      setSocketMsgsHistory([
        {
          owner: {
            slug: lastJsonMessage?.owner?.slug,
            image: lastJsonMessage?.owner?.image,
          },
          message: lastJsonMessage?.message,
        },
      ]);
    }
  }, [lastJsonMessage]);

  return (
    <div className="min-h-screen py-5 text-white">
      <div className="flex items-center space-x-2 border-b border-white/70 px-5 py-3">
        <BsChevronLeft size={20} onClick={() => router.back()} />
        <h4 className="text-[16px] font-semibold">
          {userSlug
            ? chatUserDetailsData?.oponnent_details?.name
            : "CUSTOMER SUPPORT"}
        </h4>
      </div>

      <AuthInfiniteScrollComponent
        lazyHook={useLazyGetPreviousCustomerCareChatsQuery}
        hookParams={{ slug: groupSlug ? groupSlug : slug }}
        customEnd={<></>}
        additionalElements={socketMsgsHistory}
        emptyHandler={<></>}
        initialElements={
          userSlug
            ? []
            : [
                {
                  owner: {
                    slug: "",
                    image: "/images/tiar_logo_3.svg",
                    local: true,
                  },
                  message:
                    "Describe Your Issue as we connect you to our customer support personal",
                },
                {
                  owner: {
                    slug: "",
                    image: "/images/tiar_logo_3.svg",
                    local: true,
                  },
                  message:
                    "Welcome to TIAR , India’s Biggest Fantasy Sports and crypto Exchange Platform I’m TIAR Guru, your virtual assistant to help you with all your queries.How can I help you today?",
                },
              ]
        }
        height={windowHeight - 49 - 70 - 30}
        // parentClasses={"pt-5"}
        inverse={true}
        containerStyles={{
          display: "flex",
          flexDirection: "column-reverse",
        }}
        hideParent={true}
      >
        <ChatComponent />
      </AuthInfiniteScrollComponent>
      {/* <div className="flex flex-col space-y-3 mt-3">
        <OuterChat hideImg={false} />
        <OuterChat hideImg={true} /> */}
      {/* <OwnerChat /> */}
      {/* </div> */}

      <div className="flex items-center space-x-2 px-5 bg-[#1E2152] py-4 rounded-t-2xl fixed bottom-0 w-full max-w-[450px]">
        <div className="bg-white rounded-full overflow-hidden h-[38px] flex-[2]">
          <input
            type="text"
            placeholder="Start Typing Here..."
            className="border-0 focus-within:ring-0 text-black placeholder:text-[10px] px-3 w-full"
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
          />
        </div>

        <div className="w-[38px] h-[38px] bg-ownOrange rounded-full grid place-items-center">
          <FiSend size={24} onClick={handleSendMsg} />
        </div>
      </div>
    </div>
  );
};

const ChatComponent = ({ data, finalData, idx }) => {
  const ownerSlug = useSelector((state) => state.auth.user.owner_slug);

  if (ownerSlug === data?.owner.slug) {
    return <OwnerChat message={data?.message} img={data?.owner?.image} />;
  }

  return (
    <OuterChat
      message={data?.message}
      img={data?.owner?.image}
      local={data?.owner?.local}
    />
  );
};

const OuterChat = ({ hideImg, message, img, local }) => {
  return (
    <div className="flex space-x-3 px-5 mt-3">
      <div
        className={`w-[32px] h-[32px] rounded-full overflow-hidden shrink-0 ${
          hideImg && "invisible"
        }`}
      >
        <img
          src={
            img
              ? local
                ? img
                : `${process.env.NEXT_PUBLIC_BACKEND_IMG_BASEURL}${img}`
              : "https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg"
          }
          alt=""
          className="flex-1 w-full h-full object-cover"
        />
      </div>

      <div className="bg-[#282A4B] p-2 rounded-xl text-[12px] rounded-tl-none">
        <p>{message}</p>
      </div>

      <div className="w-[32px] h-[32px] shrink-0"></div>
    </div>
  );
};

const OwnerChat = ({ hideImg, message, img }) => {
  console.log("TEST OWNER: ", img);
  return (
    <div className="flex space-x-3 px-5 self-end mt-3">
      <div className="w-[32px] h-[32px] shrink-0"></div>

      <div className="bg-gradient-to-b from-[#F97F4E]/50 via-[#F97F4E]/50 to-[#E00A14]/50 p-2 rounded-xl text-[12px] rounded-tr-none">
        <p className="break-all">{message}</p>
      </div>

      <div className="w-[32px] h-[32px] rounded-full overflow-hidden shrink-0">
        <img
          src={
            img
              ? `${process.env.NEXT_PUBLIC_BACKEND_IMG_BASEURL}${img}`
              : "https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg"
          }
          alt=""
          className="flex-1 w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default CustomerSupport;
