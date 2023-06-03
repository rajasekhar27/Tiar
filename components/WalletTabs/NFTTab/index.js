import Scrollbars from "react-custom-scrollbars-2";
import { useViewportSize } from "@mantine/hooks";
import {
  useGetUserNFTsQuery,
  useLazyGetUserNFTsQuery,
} from "../../../store/apis/restApi";
import AuthInfiniteScrollComponent from "../../Generic/AuthInfiniteScrollComponent";
import Link from "next/link";

const NFTTab = (props) => {
  const { height: windowHeight } = useViewportSize();

  // return (
  //   <h1 className="font-bold motion-safe:animate-pulse text-[18px] text-center mt-20">
  //     Coming Soon
  //   </h1>
  // );

  return (
    // <Scrollbars
    //   style={{ height: `${windowHeight - 30 - 101 - 49 - 78 - 100}px` }}
    // >
    <AuthInfiniteScrollComponent
      lazyHook={useLazyGetUserNFTsQuery}
      height={windowHeight - 30 - 101 - 49 - 78 - 100}
      parentClasses="mt-5 grid grid-cols-3 justify-between gap-2 !space-y-0"
      customEnd={<></>}
      emptyHandler={
        <div className="flex flex-col items-center w-full pt-10">
          <img src="/images/no_nfts.svg" alt="" className="w-[200px]" />
          <p className="opacity-50">NFTs Coming Soon...</p>
        </div>
      }
    >
      <NFTCard />

      {/* <div className="mt-5 grid grid-cols-3 justify-between gap-2">
        {Array(10)
          .fill(10)
          .map((c, idx) => (
            <NFTCard key={idx} />
            ))}
      </div> */}
    </AuthInfiniteScrollComponent>
    // </Scrollbars>
  );
};

const NFTCard = ({ data }) => {
  return (
    <Link href={`/nfts/${data?.slug}`}>
      <div className="h-[124px] w-full rounded-lg flex flex-col overflow-hidden">
        <img
          src={data?.image}
          alt=""
          className="w-full object-cover h-[96px]"
        />
        <div className="text-[8px] font-medium w-full bg-[#292B40] text-center py-1 shrink-0 flex-1">
          <p className="text-ownOrange">{data?.collection.name}</p>
          {/* <p>{data?.collection?.symbol}</p> */}
        </div>
      </div>
    </Link>
  );
};

export default NFTTab;
