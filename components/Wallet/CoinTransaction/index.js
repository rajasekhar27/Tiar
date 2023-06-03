import { Fragment, useEffect, useState } from "react";
import { useRef } from "react";
import { useViewportSize } from "@mantine/hooks";
import { FiArrowUpRight, FiArrowDownLeft } from "react-icons/fi";
import { AiOutlineLeft, AiOutlineDollarCircle } from "react-icons/ai";
import {
  useGetWalletDetailsByWalletSlugQuery,
  useLazyGetUserVirtualWalletTransactionsQuery,
} from "../../../store/apis/restApi";
import { useRouter } from "next/router";
import AuthInfiniteScrollComponent from "../../Generic/AuthInfiniteScrollComponent";
import { getWalletType } from "../../../helpers/getWalletType";
import { OnrampWebSDK } from "@onramp.money/onramp-web-sdk";
import Loader from "../../UI/Loader";
import { Tab } from "@headlessui/react";
import ISTFormat2 from "../../../helpers/ISTFormat2";
import Link from "next/link";

const CoinTransaction = ({ walletId }) => {
  const router = useRouter();

  const { height: windowHeight } = useViewportSize();

  // const { data: transactionsData } = useGetWalletAllTransactionsQuery({
  //   walletId: walletId,
  // });

  // const { data: transactionsData } = useGetUserVirtualWalletTransactionsQuery({
  //   slug: walletId,
  // });

  const { data: walletDetailsData } = useGetWalletDetailsByWalletSlugQuery(
    {
      slug: walletId,
    },
    {
      skip: walletId ? false : true,
    }
  );

  const handleBuy = () => {
    const onrampInstance = new OnrampWebSDK({
      appId: 195867, // replace this with the appID you got during onboarding process
      // walletAddress: walletsData.filter((w) => w.coin === "ETH")[0]
      //   ?.deposit_address, // replace with user's wallet address
      // walletAddress: "0x80115cf9096f9ad099453b9e144071edf923e6bd",
      walletAddress: walletDetailsData?.deposit_address,
      // ... pass other configs here
      coinCode: "eth",

      // usdt - bep20 | matic20
      // usdc - bep20 | matic20
      // busd - bep20
      // matic - matic20
      // bnb - bep20
    });

    // when you are ready to show the widget, call show method
    onrampInstance.show();
  };

  return (
    <div className="text-white relative pt-5">
      <div className=" flex items-center space-x-3 px-3">
        <AiOutlineLeft color="white" onClick={() => router.push("/wallet")} />
        <p className="text-[16px] font-semibold">
          {getWalletType(walletDetailsData?.coin)?.name}
        </p>
      </div>

      <div className="flex flex-col space-y-5 mt-2 px-5 border-b border-white/50 pb-3">
        <div>
          <div className="flex justify-center items-center font-bold text-[24px] space-x-3">
            <div className="w-[50px] h-[50px] rounded-full bg-white grid place-items-center overflow-hidden">
              <img
                src={getWalletType(walletDetailsData?.coin)?.img}
                alt=""
                className="max-w-[49px] max-h-[49px]"
              />
            </div>
            <p className="uppercase">
              {getWalletType(walletDetailsData?.coin)?.coin}
            </p>
          </div>

          <div className="flex items-center space-x-2 justify-center mt-2">
            <h3 className="text-[24px] font-medium uppercase">
              {parseFloat(walletDetailsData?.balance)?.toFixed(8)}{" "}
              {getWalletType(walletDetailsData?.coin)?.coin}
            </h3>
            <p className="text-[12px] text-[#838383] font-medium">
              ≈ ${walletDetailsData?.usd_value} USD
            </p>
          </div>
        </div>

        <div className="flex justify-center space-x-2">
          <div
            className="h-[40px] bg-ownGreen2  rounded-md flex items-center space-x-3 flex-1 justify-center"
            onClick={() =>
              router.push(
                `/wallet/deposit/crypto/${walletDetailsData?.deposit_address}`
              )
            }
          >
            <img src="/images/wallet_2.svg" alt="" />

            <p className="text-[16px] font-semibold">Deposit</p>
          </div>

          {walletDetailsData?.coin === "eth" && (
            <div
              className="h-[40px] bg-ownPurple1  rounded-md flex items-center space-x-3 flex-1 justify-center"
              onClick={handleBuy}
            >
              <AiOutlineDollarCircle size={25} />
              <p className="text-[16px] font-semibold">Buy</p>
            </div>
          )}

          <div
            className="h-[40px] bg-ownOrange  rounded-md flex items-center space-x-3 flex-1 justify-center px-2"
            onClick={() =>
              router.push(
                `/wallet/withdraw/tiar/${walletDetailsData?.deposit_address}`
              )
            }
          >
            <img src="/images/wallet_3.svg" alt="" />
            <p className="text-[16px] font-semibold">Withdraw</p>
          </div>
        </div>
      </div>

      <h1 className="text-[20px] font-semibold text-center my-3">
        Transactions History
      </h1>

      <Tab.Group>
        <Tab.List
          className={
            "flex items-center space-x-5 overflow-x-auto bg-[#16153E] py-2 px-3 text-[14px] font-medium"
          }
        >
          <Tab as={Fragment}>
            {({ selected }) => (
              <div
                className={`${
                  selected &&
                  "bg-gradient-to-r from-[#F97F4E] to-[#E00A14] font-semibold"
                }  w-full text-center py-2 px-3 rounded-xl`}
              >
                All
              </div>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <div
                className={`${
                  selected &&
                  "bg-gradient-to-r from-[#F97F4E] to-[#E00A14] font-semibold"
                }  w-full text-center py-2 px-3 rounded-xl`}
              >
                Deposit
              </div>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <div
                className={`${
                  selected &&
                  "bg-gradient-to-r from-[#F97F4E] to-[#E00A14] font-semibold"
                }  w-full text-center py-2 px-3 rounded-xl`}
              >
                Paid
              </div>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <div
                className={`${
                  selected &&
                  "bg-gradient-to-r from-[#F97F4E] to-[#E00A14] font-semibold"
                }  w-full text-center py-2 px-3 rounded-xl`}
              >
                Winnings
              </div>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <div
                className={`${
                  selected &&
                  "bg-gradient-to-r from-[#F97F4E] to-[#E00A14] font-semibold"
                }  w-full text-center py-2 px-3 rounded-xl`}
              >
                Withdrawals
              </div>
            )}
          </Tab>
        </Tab.List>

        <div className="bg-white/20 p-2 rounded-xl px-3 mx-5 my-3">
          <p className="text-[14px]">
            <span className="text-ownOrange font-semibold">Note:</span> It might
            take 5-30 minutes to reflect the crypto transaction. Email at{" "}
            <span className="text-ownOrange font-semibold">app@tiar.io</span>{" "}
            for queries.
          </p>
        </div>

        <Tab.Panels>
          <Tab.Panel>
            <AuthInfiniteScrollComponent
              height={windowHeight - 24 - 167 - 30 - 53 - 58 - 80}
              lazyHook={useLazyGetUserVirtualWalletTransactionsQuery}
              hookParams={{ slug: walletId, mainPurpose: "ALL" }}
              loopKey={(l) => l.id}
              customEnd={<></>}
              customLoader={<Loader />}
              parentClasses={"!space-y-0"}
              emptyHandler={<NoTransactionCard />}
            >
              <TransactionCard />
            </AuthInfiniteScrollComponent>
          </Tab.Panel>
          <Tab.Panel>
            <AuthInfiniteScrollComponent
              height={windowHeight - 24 - 167 - 30 - 53 - 58 - 80}
              lazyHook={useLazyGetUserVirtualWalletTransactionsQuery}
              hookParams={{ slug: walletId, mainPurpose: "DEPOSIT" }}
              loopKey={(l) => l.id}
              customEnd={<></>}
              customLoader={<Loader />}
              parentClasses={"!space-y-0"}
              emptyHandler={<NoTransactionCard />}
            >
              <TransactionCard />
            </AuthInfiniteScrollComponent>
          </Tab.Panel>
          <Tab.Panel>
            <AuthInfiniteScrollComponent
              height={windowHeight - 24 - 167 - 30 - 53 - 58 - 80}
              lazyHook={useLazyGetUserVirtualWalletTransactionsQuery}
              hookParams={{ slug: walletId, mainPurpose: "PAID" }}
              loopKey={(l) => l.id}
              customEnd={<></>}
              customLoader={<Loader />}
              parentClasses={"!space-y-0"}
              emptyHandler={<NoTransactionCard />}
            >
              <TransactionCard />
            </AuthInfiniteScrollComponent>
          </Tab.Panel>
          <Tab.Panel>
            <AuthInfiniteScrollComponent
              height={windowHeight - 24 - 167 - 30 - 53 - 58 - 80}
              lazyHook={useLazyGetUserVirtualWalletTransactionsQuery}
              hookParams={{ slug: walletId, mainPurpose: "WINNINGS" }}
              loopKey={(l) => l.id}
              customEnd={<></>}
              customLoader={<Loader />}
              parentClasses={"!space-y-0"}
              emptyHandler={<NoTransactionCard />}
            >
              <TransactionCard />
            </AuthInfiniteScrollComponent>
          </Tab.Panel>
          <Tab.Panel>
            <AuthInfiniteScrollComponent
              height={windowHeight - 24 - 167 - 30 - 53 - 58 - 80}
              lazyHook={useLazyGetUserVirtualWalletTransactionsQuery}
              hookParams={{ slug: walletId, mainPurpose: "WITHDRAW" }}
              loopKey={(l) => l.id}
              customEnd={<></>}
              customLoader={<Loader />}
              parentClasses={"!space-y-0"}
              emptyHandler={<NoTransactionCard />}
            >
              <TransactionCard />
            </AuthInfiniteScrollComponent>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      {/* <div style={{ height: `${windowHeight - topBarHeight - 80}px` }}>
        {transactionsData &&
          (transactionsData?.results?.length === 0 ? (
            <div>
              <p>No Transactions Found</p>
            </div>
          ) : (
            <Scrollbars style={{ height: "100%" }}>
              {transactionsData?.results?.map((t, idx) => (
                <TransactionCard key={idx} type={t.type} data={t} />
              ))}
            </Scrollbars>
          ))}
      </div> */}
    </div>
  );
};

const TransactionCard = ({ data, dataLength, idx, walletSlug }) => {
  console.log(data);
  const transactionAddress = () => {
    const purpose = data?.purpose?.title;

    if (data?.type === "SENT") {
      if (purpose === "WITHDRAW") {
        return data?.with_draw_to;
      }

      if (purpose === "FANTASY") {
        return "TIAR";
      }

      if (purpose === "WALLET_TRANSFER") {
        return data?.to_wallet?.deposit_address;
      }
    }

    if (data?.type === "RECEIVE") {
      if (purpose === "WINNING") {
        return "TIAR";
      }

      if (purpose === "DEPOSIT") {
        return data?.to_wallet?.deposit_address;
      }

      if (purpose === "WALLET_TRANSFER") {
        return data?.user_wallet?.deposit_address;
      }
    }
  };

  return (
    <Link href={`/transaction/${data?.slug}`}>
      <div
        className={`flex items-center justify-between ${
          idx + 1 !== dataLength && "border-b border-white/60"
        }  py-2 px-3 bg-[#16153E]`}
      >
        {data?.type === "SENT" ? (
          <div className="flex items-center space-x-3 flex-[3]">
            <div className="w-[26px] h-[26px] bg-ownOrange grid place-items-center rounded-full">
              <FiArrowUpRight />
            </div>

            <div>
              <p className="text-[16px]">Sent</p>
              <p className="text-[12px] mt-1 max-w-[100px] truncate text-ellipsis  whitespace-nowrap text-[#9E9E9E]">
                To: {transactionAddress()}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-3 flex-[3]">
            <div className="w-[26px] h-[26px] bg-ownGreen2 grid place-items-center rounded-full">
              <FiArrowDownLeft />
            </div>

            <div>
              <p className="text-[16px]">Received</p>
              <p className="text-[12px] mt-1 max-w-[100px] truncate text-ellipsis  whitespace-nowrap text-[#9E9E9E] ">
                From: {transactionAddress()}
              </p>
            </div>
          </div>
        )}

        <div className="text-[10px] font-medium text-white/50 flex-[2]">
          <p>Date: {ISTFormat2(new Date(data?.date_created))}</p>
        </div>

        <div className="text-end text-[12px] flex-1">
          <p
            className={`whitespace-nowrap uppercase ${
              data?.type === "SENT" ? "text-ownOrange" : "text-ownGreen1"
            } font-medium`}
          >
            {data?.type === "SENT" && "- "}
            {data?.amount}
            {/* {type === "send"
            ? ethers.utils
                .formatEther(data.valueString.split("-")[1])
                .substring(0, 7)
            : ethers.utils.formatEther(data.valueString).substring(0, 7)}{" "} */}
            {getWalletType(data?.to_wallet?.coin)?.coin}
          </p>
          <p className="mt-1 whitespace-nowrap">${data.usd_value} USD</p>
        </div>
      </div>
    </Link>
  );
};

const NoTransactionCard = () => {
  return (
    <div className="flex flex-col items-center space-y-3">
      <img src="/images/notransactions.svg" alt="" />
      <p className="opacity-50">No Transactions</p>
    </div>
  );
};

export default CoinTransaction;
