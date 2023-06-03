import { useClipboard } from "@mantine/hooks";
import { FaRegCopy } from "react-icons/fa";
import { FiArrowDownLeft, FiArrowUpRight } from "react-icons/fi";
import { BsChevronLeft } from "react-icons/bs";
import { useGetTransactionDetailsQuery } from "../../../store/apis/restApi";
import { useRouter } from "next/router";
import ISTFormat3 from "../../../helpers/ISTFormat3";
import { getWalletType } from "../../../helpers/getWalletType";
import Loader from "../../UI/Loader";
import { useEffect } from "react";

const TransactionDetails = (props) => {
  const router = useRouter();
  const { slug } = router.query;

  const {
    data: transactionDetailsData,
    isLoading: transactionDetailsLoading,
    status: transactionStatus,
  } = useGetTransactionDetailsQuery({ slug: slug });

  useEffect(() => {
    if (transactionStatus === `rejected`) {
      router.back();
    }
  }, [transactionStatus]);

  const purposes = {
    WINNING: [1, 2, 3, 4, 5],
    FANTASY: [2, 4, 5, 6, 7],
    WALLET_TRANSFER: [7, 3, 4, 8, 5, 13],
    WITHDRAW: [9, 12, 11, 4, 8, 5, 13],
    DEPOSIT: [5, 8, 4, 9, 10, 11, 13],
    REFUND: [5, 8, 4, 9, 10, 11, 13],
  };

  const finalFields = transactionDetailsData
    ? purposes[transactionDetailsData?.purpose]
    : [];

  return (
    <div className="min-h-screen flex flex-col justify-between py-5 text-white">
      {transactionDetailsLoading && <Loader />}
      <div>
        <div className="flex items-center space-x-2 px-3">
          <BsChevronLeft size={24} onClick={() => router.back()} />
          <p className="text-[16px] font-semibold">Transaction Details</p>
        </div>

        <div className="flex flex-col items-center my-7">
          <p className="text-[14px] font-semibold">Amount</p>
          {/* <div className="flex items-center space-x-2">
            <div className="w-[26px] h-[26px] bg-ownOrange grid place-items-center rounded-full">
              <FiArrowUpRight />
            </div>
            <h3 className="text-[32px] font-semibold text-ownOrange">
              1000 <span className="text-[24px] font-semibold">ETH</span>
            </h3>
          </div> */}

          <div className="flex items-center space-x-2">
            <div
              className={`w-[26px] h-[26px] grid place-items-center rounded-full ${
                transactionDetailsData?.type === "SENT"
                  ? "bg-ownOrange"
                  : "bg-ownGreen2"
              }
              `}
            >
              {transactionDetailsData?.type === "SENT" ? (
                <FiArrowUpRight />
              ) : (
                <FiArrowDownLeft />
              )}
            </div>
            <h3
              className={`text-[32px] font-semibold ${
                transactionDetailsData?.type === "SENT"
                  ? "text-ownOrange"
                  : "text-ownGreen2"
              }`}
            >
              {transactionDetailsData?.amount}{" "}
              <span className="text-[24px] font-semibold uppercase">
                {getWalletType(transactionDetailsData?.coin)?.coin}
              </span>
            </h3>
          </div>
        </div>

        {finalFields?.includes(13) && (
          <div className="bg-white/20 p-2 rounded-xl px-3 mx-5 my-3">
            <p className="text-[14px]">
              <span className="text-ownOrange font-semibold">Note:</span> It
              might take 5-30 minutes to reflect the crypto transaction. Email
              at{" "}
              <span className="text-ownOrange font-semibold">app@tiar.io</span>{" "}
              for queries.
            </p>
          </div>
        )}

        <div className="bg-white/10 w-full py-3 px-5">
          {finalFields?.includes(1) && (
            <NonCopyRow title={"Winnings From"} value={"Fantasy Sports"} />
          )}

          {/* ** vishnu said to comment it for now */}
          {/* {finalFields?.includes(9) && (
            <NonCopyRow title={"Confirmations"} value={"20/15"} />
          )} */}

          {finalFields?.includes(6) && (
            <NonCopyRow title={"Paid To"} value={"Fantasy Sports"} />
          )}

          {finalFields?.includes(10) && (
            <NonCopyRow
              title={"From Wallet Address"}
              value={transactionDetailsData?.from_address}
            />
          )}

          {finalFields?.includes(12) && (
            <NonCopyRow
              title={"To Wallet Address"}
              value={transactionDetailsData?.to_wallet}
            />
          )}

          {finalFields?.includes(2) && (
            <NonCopyRow
              title={"Contest Name"}
              value={transactionDetailsData?.contest_match_name?.match_name}
              subText={`(ID: ${transactionDetailsData?.contest_match_name?.match_id})`}
            />
          )}

          {finalFields?.includes(7) && (
            <CopyRow
              title={"From Email"}
              value={transactionDetailsData?.from_wallet_mail?.mail_id}
            />
          )}

          {finalFields?.includes(11) && (
            <CopyRow
              title={"Email Address"}
              value={transactionDetailsData?.user_email}
            />
          )}

          {finalFields?.includes(3) && (
            <CopyRow
              title={"To Email"}
              value={transactionDetailsData?.to_wallet_mail?.mail_id}
            />
          )}

          {finalFields?.includes(4) && (
            <CopyRow
              title={"Txid"}
              value={transactionDetailsData?.transaction_id}
            />
          )}

          {finalFields?.includes(8) && (
            <NonCopyRow
              title={"Network fee"}
              // value={`${transactionDetailsData?.amount} ${getWalletType(
              //   transactionDetailsData?.coin
              // )?.coin?.toUpperCase()}`}
              // ** vishnu said to keep zero.first said to keep key amount as value.the said to keep 0
              value={0}
            />
          )}

          {finalFields?.includes(5) && (
            <NonCopyRow
              title={"Date"}
              value={ISTFormat3(new Date(transactionDetailsData?.date_created))}
            />
          )}

          {/* <NonCopyRow
            title={"Contest Name"}
            value={transactionDetailsData?.contest_match_name?.match_name}
            subText={`(ID: ${transactionDetailsData?.contest_match_name?.match_id})`}
          />

          <NonCopyRow title={"Confirmations"} value={"20/15"} />
          <NonCopyRow
            title={"From Wallet Address"}
            value={"e4eq6wtd87hasuih87a7"}
          />
          <NonCopyRow title={"Network fee"} value={"0 ETH"} />
          <NonCopyRow title={"Date"} value={"12-08-23 11:05:23"} />
          <NonCopyRow
            title={"To Wallet Address"}
            value={"asbzuhbhuabhbznnygyy3u"}
          />

          <CopyRow title={"To Email"} value={"Bhuvan@tiar.com"} />
          <CopyRow title={"Txid"} value={"TIAR txid2345678"} /> */}
        </div>
      </div>

      <div className="px-5">
        <button
          className="h-[37px] w-full bg-ownOrange rounded-md"
          onClick={() => router.back()}
        >
          Back
        </button>
      </div>
    </div>
  );
};

const CopyRow = ({ title, value }) => {
  const clipboard = useClipboard({ timeout: 500 });

  const handleCopy = () => {
    clipboard.copy(value);
  };

  return (
    <div className="text-[14px] flex items-center justify-between py-2 space-x-3">
      <p className="text-white/50">{title}</p>
      <div className="flex items-center space-x-2 max-w-[50%]">
        <p className="break-all">{value}</p>
        <FaRegCopy
          size={20}
          color={clipboard.copied ? "#F97F4E" : "white"}
          onClick={handleCopy}
          className="shrink-0"
        />
      </div>
    </div>
  );
};

const NonCopyRow = ({ title, value, subText }) => {
  return (
    <div className="text-[14px] flex items-center justify-between py-2 space-x-3">
      <p className="text-white/50 whitespace-nowrap">{title}</p>
      <div className="flex flex-col items-end max-w-[50%]">
        <p className="break-all">{value}</p>
        {subText && <p className="text-white/50">{subText}</p>}
      </div>
    </div>
  );
};

export default TransactionDetails;
