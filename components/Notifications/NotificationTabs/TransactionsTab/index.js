import { useSelector } from "react-redux";
import NotificationCard from "../../NotificationCard";
import { AiOutlineTransaction } from "react-icons/ai";
import {
  useLazyGetNotificationsQuery,
  useRequestTransactionSlugForNotificationMutation,
} from "../../../../store/apis/restApi";
import { useViewportSize } from "@mantine/hooks";
import { useRouter } from "next/router";
import AuthInfiniteScrollComponent from "../../../Generic/AuthInfiniteScrollComponent";

const TransactionsTab = (props) => {
  const token = useSelector((state) => state.auth.accessToken);

  const router = useRouter();
  const { height: windowHeight } = useViewportSize();

  const [requestTransactionSlugForNotification] =
    useRequestTransactionSlugForNotificationMutation();

  const handleTransaction = (data) => {
    router.push(`/transaction/${data.instance_slug}`);
    // if (data?.sub_status === "CONTEST_TRANSACTION") {
    //   router.push(`/wallet/${data.instance_slug}/transactions`);
    //   return;
    // }

    // requestTransactionSlugForNotification({
    //   slug: data?.instance_slug,
    //   data: {},
    // }).then((res) => {
    //   if (res.data) {
    //     router.push(`/wallet/${res.data.to_wallet}/transactions`);
    //   }

    //   if (res.error) {
    //     //
    //   }
    // });
  };

  return token ? (
    <div>
      <AuthInfiniteScrollComponent
        height={windowHeight - 21 - 41 - 50}
        lazyHook={useLazyGetNotificationsQuery}
        hookParams={{ status: "TRANSACTION" }}
        customEnd={<></>}
        emptyHandler={
          <div className="flex flex-col items-center text-ownOrange text-[12px]">
            <div className="h-[300px] mt-5">
              <img
                src="/images/No transaction.svg"
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
          icon={<AiOutlineTransaction size={30} />}
          buttonName={"View Transaction"}
          buttonClick={handleTransaction}
        />
      </AuthInfiniteScrollComponent>
    </div>
  ) : null;
};

export default TransactionsTab;
