import { useDispatch, useSelector } from "react-redux";
import { closeCricketMatchReminderPopup } from "../../../store/slices/games";
import Modal from "../../UI/Modal";
import { Switch } from "@headlessui/react";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import {
  useGetMatchReminderStatusQuery,
  useGetSeriesReminderStatusQuery,
  useSetCricketMatchReminderMutation,
  useSetCricketSeriesReminderMutation,
} from "../../../store/apis/restApi";
import Loader from "../../UI/Loader";

const ReminderPopup = (props) => {
  const [isLoader, setIsLoader] = useState(false);
  const dispatch = useDispatch();
  const popupStatus = useSelector(
    (state) => state.games.cricketMatchReminderPopup.status
  );
  const helperData = useSelector(
    (state) => state.games.cricketMatchReminderPopup.helperData
  );

  const handleClose = () => dispatch(closeCricketMatchReminderPopup());

  return (
    <Modal
      isOpen={popupStatus}
      close={handleClose}
      parentClasses={"bg-black/40 flex items-end max-w-[450px]"}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-ownBlue1 text-white rounded-t-md w-full pt-5 animate__animated animate__slideInUp animate__faster pb-16 relative"
      >
        <div className="absolute left-5">
          <IoClose onClick={handleClose} />
        </div>

        <p className="text-[16px] font-semibold text-center">Set Reminders</p>
        <div className="flex flex-col space-y-1 mt-3">
          {/* <p className="text-[12px] text-[#787878] px-5 w-full">
            Lineup Announcement (If Available)
          </p> */}
          <ReminderRow
            title={helperData?.match?.name}
            slug={helperData?.match?.slug}
            getHook={useGetMatchReminderStatusQuery}
            postHook={useSetCricketMatchReminderMutation}
            setLoader={setIsLoader}
          />
          <ReminderRow
            title={helperData?.series?.name}
            slug={helperData?.series?.slug}
            getHook={useGetSeriesReminderStatusQuery}
            postHook={useSetCricketSeriesReminderMutation}
            setLoader={setIsLoader}
          />
        </div>
      </div>
    </Modal>
  );
};

const ReminderRow = ({ title, slug, getHook, postHook }) => {
  const { data: hookData } = getHook({
    slug: slug,
  });
  const [postHookTrigger, { isLoading }] = postHook();

  const enabled = hookData ? hookData?.active_status : false;

  const handleChange = (val) => {
    postHookTrigger({
      slug: slug,
      status: val,
    }).then((res) => {
      if (res.data) {
      }

      if (res.error) {
      }
    });
  };

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-white/20 w-full p-2 px-5 flex items-center justify-between">
      <h6 className="text-[14px] font-semibold w-[75%]">{title}</h6>

      <Switch
        checked={enabled}
        onChange={handleChange}
        disabled={isLoading}
        className={`${
          enabled ? "bg-[#FCF2EE]" : "bg-gray-200"
        } relative inline-flex h-[13px] w-[29px] items-center rounded-full`}
      >
        <span className="sr-only">Enable notifications</span>
        <span
          className={`${
            enabled ? "translate-x-4 bg-ownOrange" : "bg-white"
          } inline-block h-[16px] w-[16px] transform rounded-full transition`}
        />
      </Switch>
    </div>
  );
};

export default ReminderPopup;
