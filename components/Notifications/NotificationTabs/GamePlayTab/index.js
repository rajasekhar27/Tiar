import { useSelector } from "react-redux";
import { useLazyGetNotificationsQuery } from "../../../../store/apis/restApi";
import NotificationCard from "../../NotificationCard";
import { IoGameControllerOutline } from "react-icons/io5";
import { useViewportSize } from "@mantine/hooks";
import { useRouter } from "next/router";
import AuthInfiniteScrollComponent from "../../../Generic/AuthInfiniteScrollComponent";

const GamePlayTab = (props) => {
  const token = useSelector((state) => state.auth.accessToken);
  const router = useRouter();

  const { height: windowHeight } = useViewportSize();

  const handleViewContest = (data) => {
    router.push(`/games/cricket/${data?.instance_slug}`);
  };

  return (
    <div>
      <AuthInfiniteScrollComponent
        height={windowHeight - 21 - 41 - 50}
        lazyHook={useLazyGetNotificationsQuery}
        hookParams={{ status: "GAMEPLAY" }}
        customEnd={<></>}
        emptyHandler={
          <div className="flex flex-col items-center text-ownOrange text-[12px]">
            <div className="h-[300px] mt-5">
              <img
                src="/images/no game play.svg"
                alt=""
                srcset=""
                className="w-full h-full"
              />
            </div>

            <p>No Notifications</p>
          </div>
        }
      >
        <NotificationCard
          icon={<IoGameControllerOutline size={30} />}
          buttonName={"View Contest"}
          buttonClick={handleViewContest}
        />
      </AuthInfiniteScrollComponent>
    </div>
  );
};

export default GamePlayTab;
