import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import EventDetails from "../../../../components/HellsBayTabs/EventsTab/EventDetails";
import Loader from "../../../../components/UI/Loader";

const EventDetailsPage = (props) => {
  const router = useRouter();

  const { status } = useSession();

  if (status === "unauthenticated") {
    router.push("/auth");
  }

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <div>
      <EventDetails />
    </div>
  );
};

export default EventDetailsPage;
