import { useEffect } from "react";
import { useMarkNotificationsAsSeenMutation } from "../../store/apis/restApi";
import Notifications from "../../components/Notifications";

const NotificationsPage = (props) => {
  const [markNotificationsAsSeen] = useMarkNotificationsAsSeenMutation();

  useEffect(() => {
    markNotificationsAsSeen({}).then((res) => {});
  }, []);

  return <Notifications />;
};

export default NotificationsPage;
