import { FiBell } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useState } from "react";

import PortfolioCard from "../../components/PortfolioCard";
import WalletOptions from "../../components/WalletOptions";
import WalletTabs from "../../components/WalletTabs";
import {
  useGetAllWalletsOfUserQuery,
  useGetUserProfileDetailsQuery,
} from "../../store/apis/restApi";
import Loader from "../../components/UI/Loader";

const Wallet = (props) => {
  const [tabIndex, setTabIndex] = useState(0);

  const { status } = useSession();
  const authToken = useSelector((state) => state.auth.accessToken);

  const router = useRouter();

  const { data: userData } = useGetUserProfileDetailsQuery();
  const { isFetching: walletsFetching } = useGetAllWalletsOfUserQuery(
    {},
    { skip: !authToken }
  );

  if (status === "unauthenticated") {
    router.push("/auth");
  }

  if (status === "loading" || walletsFetching) {
    return <Loader />;
  }

  return (
    <>
      <div className="px-5  text-white">
        <div className="flex justify-between items-center h-[30px] my-7 relative">
          <div>
            {true ? (
              <img src="/images/shield_true.svg" alt="" />
            ) : (
              <img src="/images/shield_false.svg" alt="" />
            )}
          </div>

          <div className="flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img src="/images/tiar_logo_1.svg" alt="" className="h-[12px]" />
            <p className="font-semibold text-[18px]">My Wallet</p>
          </div>

          <div className="flex space-x-3 items-center">
            <FiBell size={19} onClick={() => router.push("/notifications")} />
            <div className="w-[35px] h-[35px] overflow-hidden rounded-full">
              <img
                src={
                  userData?.user_profile?.image
                    ? `${process.env.NEXT_PUBLIC_BACKEND_IMG_BASEURL}${userData?.user_profile?.image}`
                    : `/images/profile_default_1.svg`
                }
                className="w-full h-full bg-white"
                alt=""
                onClick={() => router.push(`/profile`)}
              />
            </div>
          </div>
        </div>

        <PortfolioCard />

        <WalletTabs tabIndex={tabIndex} setTabIndex={setTabIndex} />
      </div>
      {tabIndex === 0 && <WalletOptions tabIndex={tabIndex} />}
    </>
  );
};

export default Wallet;
