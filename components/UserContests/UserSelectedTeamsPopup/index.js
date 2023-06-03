import { useDispatch, useSelector } from "react-redux";
import { useGetUserParticipatedContestDetailsQuery } from "../../../store/apis/restApi";
import {
  closeUserSelectedTeamsPopup,
  openSwitchTeamsPopup,
} from "../../../store/slices/games";
import TeamCard from "../../Cricket/MatchInfo/InfoTabs/MyTeamsTab/TeamCard";
import Modal from "../../UI/Modal";

const UserSelectedTeamsPopup = (props) => {
  const dispatch = useDispatch();

  const popupStatus = useSelector(
    (state) => state.games.userSelectedTeamsPopup.status
  );
  const helperData = useSelector(
    (state) => state.games.userSelectedTeamsPopup.helperData
  );

  const { data: contestData } = useGetUserParticipatedContestDetailsQuery(
    {
      slug: helperData,
    },
    {
      skip: !helperData ? true : false,
    }
  );

  const handleSwitchTeams = () => {
    if (!contestData) return;

    dispatch(closeUserSelectedTeamsPopup());
    dispatch(openSwitchTeamsPopup(contestData));
  };

  return (
    <Modal
      isOpen={popupStatus}
      parentClasses={"bg-black/50 grid place-items-center px-3"}
    >
      <div className="w-full h-[500px] p-5 overflow-auto flex flex-col justify-between rounded-lg glass-2">
        <div>
          <p>Selected Team:-</p>

          <div className="mt-4">
            {/* <p>{contestData?.teams?.team_number}</p> */}
            <TeamCard
              title={contestData?.teams?.team_number}
              points={contestData?.teams?.team_points}
              wk={contestData?.teams?.no_of_wicketkeppers}
              bat={contestData?.teams?.no_of_batsman}
              ar={contestData?.teams?.no_of_all_rounders}
              bowl={contestData?.teams?.no_of_bowlers}
              captainName={contestData?.teams?.captain?.name}
              captainImg={
                contestData?.teams?.captain?.image_url
                  ? contestData?.teams?.captain?.image_url
                  : contestData?.teams?.captain?.team?.image_url
              }
              viceCaptainName={contestData?.teams?.vice_captain?.name}
              viceCaptainImg={
                contestData?.teams?.vice_captain?.image_url
                  ? contestData?.teams?.vice_captain?.image_url
                  : contestData?.teams?.vice_captain?.team?.image_url
              }
            />
          </div>
        </div>

        <div className="flex justify-between space-x-5">
          <button
            className="w-1/2 bg-ownOrange h-[35px] rounded-md text-white"
            onClick={() => dispatch(closeUserSelectedTeamsPopup())}
          >
            Close
          </button>
          <button
            className="w-1/2 border border-ownOrange text-ownOrange rounded-md"
            onClick={handleSwitchTeams}
          >
            Switch Teams
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UserSelectedTeamsPopup;
