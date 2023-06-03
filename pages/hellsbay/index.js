import { FiBell } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useGetUserProfileDetailsQuery } from "../../store/apis/restApi";
import Loader from "../../components/UI/Loader";

const HellsBayTabs = dynamic(() => import("../../components/HellsBayTabs"), {
  ssr: false,
});

const Hellsbay = (props) => {
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
      <div>
        <div className="flex items-center justify-between px-5 my-2  h-[60px] relative">
          <FiBell
            size={19}
            color={"white"}
            onClick={() => router.push("/notifications")}
          />

          <div className="flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img src="/images/tiar_logo_1.svg" alt="" className="h-[12px]" />
            <div>
              <img src="/images/hfl_powered_by_wardroids.png" alt="" />
            </div>
          </div>

          <div className="flex space-x-3 items-center">
            {/* <FiBell
              size={19}
              color={"white"}
              onClick={() => router.push("/notifications")}
            /> */}
            <div className="w-[35px] h-[35px] overflow-hidden rounded-full">
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

        <HellsBayTabs />
      </div>
    </>
  );
};

export default Hellsbay;
