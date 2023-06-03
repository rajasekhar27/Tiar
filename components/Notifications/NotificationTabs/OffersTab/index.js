import { useViewportSize } from "@mantine/hooks";
import { TbDiscount2 } from "react-icons/tb";
import { useSelector } from "react-redux";
import { useLazyGetNotificationsQuery } from "../../../../store/apis/restApi";
import AuthInfiniteScrollComponent from "../../../Generic/AuthInfiniteScrollComponent";
import NotificationCard from "../../NotificationCard";

const OffersTab = (props) => {
  const token = useSelector((state) => state.auth.accessToken);

  const { height: windowHeight } = useViewportSize();

  return (
    <div>
      <AuthInfiniteScrollComponent
        height={windowHeight - 21 - 41 - 50}
        lazyHook={useLazyGetNotificationsQuery}
        hookParams={{ status: "MESSAGE" }}
        customEnd={<></>}
        emptyHandler={
          <div className="flex flex-col items-center text-ownOrange text-[12px]">
            <div className="h-[300px] mt-5">
              <img
                src="/images/No Offer.svg"
                alt=""
                srcset=""
                className="w-full h-full"
              />
            </div>

            <p>No Offers</p>
          </div>
        }
      >
        <NotificationCard
          icon={<TbDiscount2 size={30} />}
          buttonName={"View Details"}
          buttonClick={() => {}}
          hideButton={true}
        />
      </AuthInfiniteScrollComponent>
    </div>
  );
};

export default OffersTab;
