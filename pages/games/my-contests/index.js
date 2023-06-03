import { AiOutlineLeft } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import ContestCard from "../../../components/Cricket/MatchInfo/InfoTabs/ContestsTab/ContestCard";
import { useGetUserContestsQuery } from "../../../store/apis/restApi";
import Loader from "../../../components/UI/Loader";

const GameContests = (props) => {
  const { data: contestData } = useGetUserContestsQuery();
  const router = useRouter();

  const { status } = useSession();

  if (status === "unauthenticated") {
    router.push("/auth");
  }

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <div className="p-5 text-white">
      <div className="flex items-center space-x-3 mb-5">
        <AiOutlineLeft color="white" onClick={() => router.back()} />
        <p className="text-[18px] font-semibold">Your Contests</p>
      </div>
      <div className="flex flex-col space-y-2">
        {contestData?.results?.map((c) => {
          return (
            <ContestCard
              data={c?.contests}
              key={c.id}
              otherData={c}
              showViewTeams={true}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GameContests;
