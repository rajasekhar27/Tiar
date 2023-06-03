import {
  useGetUserOverallBalanceQuery,
  useGetUserProfileDetailsQuery,
} from "../../store/apis/restApi";
import { useSession } from "next-auth/react";

const PortfolioCard = (props) => {
  const { data: overallBalanceData } = useGetUserOverallBalanceQuery();

  const { data: userDetailsData } = useGetUserProfileDetailsQuery();

  return (
    <div className="bg-[#292B40] rounded-xl px-3 py-2 text-[12px]">
      <div className="">
        <p className="text-[#9F9F9F] px-2">{`${userDetailsData?.user_profile?.name}'s Portfolio`}</p>
        <div className="flex space-x-2 items-center border-b-2 border-ownOrange mb-2 pb-1 px-2">
          <h1 className="font-semibold text-[23px]">
            $ {overallBalanceData?.balance}
          </h1>
          {/* <div
            className={`px-1 py-[2px] rounded-md max-w-max max-h-max
        ${
          // data?.gainOrLoss[0] === "-" ? "bg-ownRed1/20" : "bg-ownGreen1/20"
          "bg-ownGreen1/20"
        }`}
          >
            <p
              className={`text-[8px]
            ${
              // data?.gainOrLoss[0] === "-" ? "text-ownRed1" : "text-ownGreen1"
              "text-ownGreen1"
            }
            `}
            >
              +25.56%
            </p>
          </div> */}
        </div>
      </div>

      <div className="flex justify-between px-2">
        <p className="text-[#9F9F9F]">Total Earnings</p>
        <p>$ {overallBalanceData?.winning}</p>
      </div>
    </div>
  );
};

export default PortfolioCard;
