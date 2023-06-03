import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import LatestReleases from "../components/duplicate/home/LatestReleases";
import SportsContests from "../components/duplicate/home/SportsContests";
import WatchBoxing from "../components/duplicate/home/WatchBoxing";
import HomeBanner from "../components/HomeBanner";
import HomeLeaderboard from "../components/HomeLeaderboard";
import HomeUserInfo from "../components/HomeUserInfo";
import HomeWhitelistBanner from "../components/HomeWhitelistBanner";
import Loader from "../components/UI/Loader";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/auth");
  }

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <>
      <div className="pb-[80px]">
        <div className="relative px-5">
          {/* <div className="px-5 absolute z-10 w-full top-0"> */}
          <HomeUserInfo />
          {/* </div> */}
          <HomeBanner />
        </div>

        <div className="pl-5">
          <SportsContests />
        </div>

        <div className="px-5">
          <HomeLeaderboard />
        </div>

        <div>
          <HomeWhitelistBanner />
        </div>

        {/* <div className="pl-5">
          <WatchBoxing />
          <LatestReleases />
        </div> */}
      </div>
    </>
  );
}
