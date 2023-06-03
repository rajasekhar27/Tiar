import { FiBell } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { useGetUserProfileDetailsQuery } from "../../store/apis/restApi";
// import GameTabs from "../../components/GameTabs";
import GameCard from "../../components/FantasySports/GameCard";
import { gamesData } from "../../data/gamesData";
import Loader from "../../components/UI/Loader";
import Link from "next/link";

const Games = (props) => {
  const finalData = gamesData?.filter((g) => g.type === 2);

  const { status } = useSession();

  const router = useRouter();
  const { data: userData } = useGetUserProfileDetailsQuery();

  if (status === "unauthenticated") {
    router.push("/auth");
  }

  if (status === "loading") {
    return <Loader />;
  }

  if (status === "authenticated") {
    return (
      <>
        <div className="my-7 pb-[80px] text-white px-5">
          <div className="flex justify-end items-center h-[30px] my-7 relative">
            <div className="flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Link href="/">
                <img
                  src="/images/tiar_logo_1.svg"
                  alt=""
                  className="h-[12px]"
                />
              </Link>
              <p className="font-semibold text-[18px]">Play 2 Win</p>
              <p className="text-[12px]">Coming Soon</p>
            </div>

            <div className="flex space-x-3 items-center">
              <FiBell size={19} onClick={() => router.push("/notifications")} />
              <div
                className="w-[35px] h-[35px] overflow-hidden rounded-full"
                onClick={() => router.push("/profile")}
              >
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
                />
              </div>
            </div>
          </div>

          {/* <GameTabs /> */}

          <div className="flex flex-col space-y-3">
            {finalData?.map((g) => {
              return (
                <GameCard
                  key={g.id}
                  gameName={g.title}
                  img={g.img}
                  playerCount={g.playerCount}
                  route={g.route}
                  isLive={g.isLive}
                  short
                />
              );
            })}
          </div>
        </div>
      </>
    );
  } else {
    return <Loader />;
  }
};

export default Games;
