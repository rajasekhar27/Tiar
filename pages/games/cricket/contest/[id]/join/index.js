import { useRouter } from "next/router";
import _ from "lodash";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { BsChevronLeft } from "react-icons/bs";
import { useDispatch } from "react-redux";

import TeamCard from "../../../../../../components/Cricket/MatchInfo/InfoTabs/MyTeamsTab/TeamCard";
import {
  useGetAllTeamsByContestSlugQuery,
  useGetMatchSlugByContestSlugQuery,
} from "../../../../../../store/apis/restApi";
import { openConfirmPaymentPopup } from "../../../../../../store/slices/games";
import Loader from "../../../../../../components/UI/Loader";

const JoinPage = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { status } = useSession();
  const { id } = router.query;

  const [selected, setSelected] = useState([]);

  const { data: teamsData, isFetching: teamsDataFetching } =
    useGetAllTeamsByContestSlugQuery({
      slug: id,
    });

  const { data: matchSlugData } = useGetMatchSlugByContestSlugQuery({
    slug: id,
  });

  if (teamsDataFetching) {
    return <Loader />;
  }

  const handleSubmit = () => {
    if (selected.length === 0) {
      toast.error("select a team to continue");
      return;
    }

    const backendFormat = {
      contest: id,
      teams: selected,
    };

    dispatch(
      openConfirmPaymentPopup({
        status: 3,
        data: backendFormat,
        slug: id,
        count: selected.length,
      })
    );
  };

  const handleSelect = (id) => {
    const checkIfExist = selected?.filter((t) => t === id);

    if (checkIfExist.length === 0) {
      if (selected.length >= teamsData?.spots_left) {
        toast.error(`you have only ${teamsData?.spots_left} spots left`);
        return;
      }

      const data = [...selected, id];
      setSelected(data);
      return;
    }

    const data = selected.filter((t) => t !== id);
    setSelected(data);
  };

  const checkExistence = (id) => {
    const check = selected.filter((t) => t === id);

    if (check.length === 0) return false;

    return true;
  };

  if (status === "unauthenticated") {
    router.push("/auth");
  }

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <div className="p-5 text-white pb-[75px]">
      <div className="flex w-full items-center space-x-3">
        <BsChevronLeft color="white" onClick={() => router.back()} />
        <p>Select Teams</p>
      </div>
      <p className="text-white mt-2 text-sm">
        You can enter upto {teamsData?.spots_left} teams in this contest
      </p>

      {teamsData?.data?.map((t) => {
        return (
          <div
            key={t.id}
            className={`relative mt-5`}
            onClick={() => handleSelect(t.id)}
          >
            {checkExistence(t.id) && (
              <div
                className={
                  "absolute w-full h-full grid place-items-center bg-black/60 z-[2] font-semibold text-ownGreen2"
                }
              >
                <p>SELECTED</p>
              </div>
            )}
            <TeamCard
              title={t?.team_number}
              points={t?.team_points}
              wk={t?.no_of_wicketkeppers}
              bat={t?.no_of_batsman}
              ar={t?.no_of_all_rounders}
              bowl={t?.no_of_bowlers}
              captainName={t?.captain?.name}
              captainImg={
                t?.captain?.image_url
                  ? t?.captain?.image_url
                  : t?.captain?.team?.image_url
              }
              viceCaptainName={t?.vice_captain?.name}
              viceCaptainImg={
                t?.vice_captain?.image_url
                  ? t?.vice_captain?.image_url
                  : t?.vice_captain?.team?.image_url
              }
            />
          </div>
        );
      })}

      <div className="fixed left-0 bottom-0 py-5 w-full px-5 z-[4] bg-ownBlue1 flex justify-end items-center space-x-5 md:max-w-[450px]">
        <button
          className="w-1/2 bg-ownOrange h-[35px] rounded-md text-white"
          onClick={() =>
            matchSlugData?.match_slug
              ? router.push(
                  `/games/cricket/${matchSlugData?.match_slug}/create-team`
                )
              : {}
          }
        >
          Create Team
        </button>
        <button
          className="w-1/2 bg-ownOrange h-[35px] rounded-md text-white"
          onClick={handleSubmit}
        >
          Join Contest
        </button>
      </div>
    </div>
  );
};

export default JoinPage;
