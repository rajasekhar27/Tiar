import NotificationsTabs from "./NotificationTabs";
import { FiSettings } from "react-icons/fi";
import { BsChevronLeft } from "react-icons/bs";
import { useRouter } from "next/router";
import { useGetUnreadNotificationsCountQuery } from "../../store/apis/restApi";

const Notifications = (props) => {
  const router = useRouter();
  const { data: unreadNotificationsCountData } =
    useGetUnreadNotificationsCountQuery();

  return (
    <div className="px-5">
      <div className="text-ownOrange flex items-center justify-between my-3">
        <div className="flex items-center space-x-3">
          <BsChevronLeft size={24} onClick={() => router.back()} />
          <h4 className="text-[14px] font-semibold">
            Notifications (
            {unreadNotificationsCountData
              ? unreadNotificationsCountData?.notification_count_not_seen
              : 0}{" "}
            Unread)
          </h4>
        </div>
        {/* <FiSettings size={24} /> */}
      </div>
      <NotificationsTabs />
    </div>
  );
};

export default Notifications;
