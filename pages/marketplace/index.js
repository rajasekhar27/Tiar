import { FiBell } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { useGetUserProfileDetailsQuery } from "../../store/apis/restApi";
import Loader from "../../components/UI/Loader";

const Marketplace = (props) => {
  const { status } = useSession();

  const router = useRouter();
  const { data: userData } = useGetUserProfileDetailsQuery();

  if (status === "unauthenticated") {
    router.push("/auth");
  }

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <>
      <div className="text-white">
        <div className="flex justify-end items-center h-[30px] my-7 relative px-5 ">
          <div className="flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img src="/images/tiar_logo_1.svg" alt="" className="h-[12px]" />
            <p className="font-semibold text-[18px]">Explore NFTs</p>
          </div>

          <div className="flex space-x-3 items-center">
            <FiBell size={19} onClick={() => router.push("/notifications")} />
            <div className="w-[25px] h-[25px] overflow-hidden rounded-full">
              <img
                onError={(e) =>
                  !e.target.onerror
                    ? (e.target.src = "/images/tiar_logo_3.svg")
                    : null
                }
                src={
                  userData?.user_profile?.image
                    ? `${process.env.NEXT_PUBLIC_BACKEND_IMG_BASEURL}${userData?.user_profile?.image}`
                    : `/images/profile_default_1.svg`
                }
                className="w-full h-full bg-white"
                alt=""
                onClick={() => router.push(`/profile`)}
              />
            </div>
          </div>
        </div>

        <div className="bg-[#292B40] rounded-xl px-3 py-2 text-[12px] m-5 border-[1.7px] animate-pulse border-ownOrange">
          <div className="">
            <div className="flex space-x-2 items-center border-b-2 border-ownOrange mb-2 pb-1 px-2">
              <h1 className="font-semibold text-[23px] m-auto pb-2">
                Coming Soon
              </h1>
            </div>
          </div>

          <div className="flex justify-between px-2">
            <p className="text-[#9F9F9F]">Tiar Wardroids</p>
          </div>
        </div>

        {/* tiar logo watermark */}
        <img
          src="/images/tiar_logo_2.svg"
          alt=""
          className="fixed bottom-0 left-0 z-[-1]"
        />

        {/* <NFTTabs /> */}
      </div>
    </>
  );
};

export default Marketplace;
