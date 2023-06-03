import { useViewportSize } from "@mantine/hooks";
import { useState } from "react";
import { useLazyGetAllContestNFTsQuery } from "../../../../../store/apis/restApi";
import AuthInfiniteScrollComponent from "../../../../Generic/AuthInfiniteScrollComponent";

const NFTRewardsTab = ({ contestId }) => {
  const { height: windowHeight } = useViewportSize();

  return (
    <div className="px-5">
      <AuthInfiniteScrollComponent
        hookParams={{ slug: contestId }}
        lazyHook={useLazyGetAllContestNFTsQuery}
        height={windowHeight - 350 - 80}
        customEnd={<></>}
      >
        <NFTReward />
      </AuthInfiniteScrollComponent>
    </div>
  );
};

const NFTReward = ({ data }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`${
        open
          ? "bg-[url('/images/nftWinningsFrame2.svg')]"
          : "bg-[url('/images/nftWInningsFrame.svg')]"
      } w-full min-h-[164px] bg-cover px-7 pr-14 py-3 flex flex-col justify-between mt-3`}
    >
      <div className="pl-5">
        <p className="text-[12px] font-semibold">
          {data?.rank_1 === 1
            ? "1 st"
            : data?.rank_1 === 2
            ? "2 nd"
            : data?.rank_1 === 3
            ? "3 rd"
            : `${data?.rank_1} th`}{" "}
          Prize
        </p>
      </div>
      <div className="flex items-center space-x-5 m-2">
        <img
          src={data?.nft?.nft_meta_data[0]?.image}
          alt=""
          className="w-[97px] h-[97px] object-cover rounded-md"
        />

        <div className="flex flex-col space-y-3 flex-auto">
          <p className="font-medium text-[12px] text-[#89899C]">
            <span className="text-white text-[16px]">
              {data?.nft?.nft_meta_data[0]?.name}
            </span>{" "}
            by {data?.nft?.nft_collection[0]?.name}
          </p>
          <p className="font-medium text-[12px] text-[#89899C]">
            Price:{" "}
            <span className="font-semibold uppercase">
              {data?.price} {data?.nft?.nft_collection[0]?.coin}
            </span>{" "}
            ($1234)
          </p>
          <p className="font-medium text-[12px]">
            {/* {data?.nft?.nft_collection[0]?.symbol} */}#
            {data.nft.nft_collection[0].nfts[0]}
          </p>

          <p
            className="text-[14px] bg-[#D9D9D9]/10 p-1 rounded-sm self-end cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            {open ? "- Show Less" : "+ Show More"}
          </p>
        </div>
      </div>

      {open && (
        <div className="m-2">
          <div className="flex items-center w-full  space-x-1">
            <p className="flex-1 whitespace-nowrap">Contract Address</p>
            <p>:</p>
            <p p className="flex-1 text-end truncate text-ellipsis break-all">
              {data.nft.token_address}
            </p>
          </div>
          <div className="flex items-center w-full  space-x-1">
            <p className="flex-1 whitespace-nowrap">Token ID</p>
            <p>:</p>
            <p p className="flex-1 text-end truncate text-ellipsis break-all">
              {data.nft.token_id}
            </p>
          </div>
          <div className="flex items-center w-full space-x-1">
            <p className="flex-1">Token Standard</p>
            <p>:</p>
            <p p className="flex-1 text-end">
              {data.nft.nft_collection[0].contract_type}
            </p>
          </div>
          <div className="flex items-center w-full space-x-1">
            <p className="flex-1">Blockchain</p>
            <p>:</p>
            <p p className="flex-1 text-end">
              Ethereum
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTRewardsTab;
