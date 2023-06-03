import { useDispatch, useSelector } from "react-redux";
import {
  useGetAllTeamsByMatchSlugQuery,
  useUpdateContestTeamsMutation,
} from "../../../store/apis/restApi";
import Modal from "../../UI/Modal";
import _ from "lodash";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  closeSwitchTeamsPopup,
  closeUserSelectedTeamsPopup,
} from "../../../store/slices/games";
import { RadioGroup } from "@headlessui/react";
import TeamCard from "../../Cricket/MatchInfo/InfoTabs/MyTeamsTab/TeamCard";
import Scrollbars from "react-custom-scrollbars";
import { useEffect } from "react";

const SwitchTeamsPopup = (props) => {
  const dispatch = useDispatch();

  const popupStatus = useSelector(
    (state) => state.games.switchTeamsPopup.status
  );
  const helperData = useSelector(
    (state) => state.games.switchTeamsPopup.helperData
  );

  const [selected, setSelected] = useState(
    helperData ? helperData?.teams?.id : ""
  );

  const { data: teamsData } = useGetAllTeamsByMatchSlugQuery(
    {
      slug: helperData?.match,
    },
    {
      skip: helperData?.match ? false : true,
    }
  );

  const [updateContestTeams] = useUpdateContestTeamsMutation();

  useEffect(() => {
    if (!helperData) return;
    setSelected(helperData?.teams?.id);
  }, [helperData]);

  const handleUpdate = () => {
    const backendFormat = {
      teams: selected,
    };

    updateContestTeams({ slug: helperData?.slug, data: backendFormat }).then(
      (res) => {
        if (res.data) {
          toast.success("successfully updated teams");
          dispatch(closeSwitchTeamsPopup());
        }

        if (res.error) {
          toast.error(`something went wrong. ${res?.error?.data?.message}`);
        }
      }
    );
  };

  const handleClose = () => {
    dispatch(closeSwitchTeamsPopup());
    dispatch(closeUserSelectedTeamsPopup());
  };

  return (
    <Modal
      isOpen={popupStatus}
      parentClasses={"bg-black/50 grid place-items-center px-3"}
    >
      <div className=" w-full h-[500px] p-5 flex flex-col justify-between rounded-lg glass-2">
        <div>
          <p>Update Teams: </p>
          <Scrollbars style={{ height: 500 - 110 }}>
            <div>
              <RadioGroup value={selected} onChange={setSelected}>
                {teamsData?.map((t) => {
                  return (
                    <RadioGroup.Option value={t.id} key={t.id}>
                      {({ checked }) => (
                        <div
                          className={`relative rounded-md overflow-auto mt-3`}
                        >
                          {checked && (
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
                      )}
                    </RadioGroup.Option>
                  );
                })}
              </RadioGroup>
            </div>
          </Scrollbars>
          {/* {teamsData?.map((t) => {
   
            return (
              <div
                className={`p-2 mt-2 ${
                  isTeamSelected(t.id)
                    ? "bg-ownOrange text-white"
                    : "border  border-ownOrange text-ownOrange"
                }`}
                onClick={() => handleTeamSelection(t.id)}
                key={t.id}
              >
                <p>{t?.team_number}</p>
              </div>
            );
          })} */}
        </div>

        <div className="flex justify-between space-x-5">
          <button
            className="w-1/2 bg-ownOrange h-[35px] rounded-md text-white"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            className="w-1/2 border border-ownOrange text-ownOrange rounded-md"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SwitchTeamsPopup;
