import { storeProducts } from "../../../data/hellsbayData";
import { useLazyGetAllStoreProductsQuery } from "../../../store/apis/restApi";
import InfiniteScrollComponent from "../../Generic/InfiniteScrollComponent/index";
import { useViewportSize } from "@mantine/hooks";

const StoreTab = (props) => {
  const { height: windowHeight } = useViewportSize();

  return (
    <div className=" px-5 pt-2 pb-[80px]">
      {/* <h4 className="font-semibold text-[18px]">Shop from HFL Store</h4> */}
      {/* <p className="text-[10px] my-3">9 products found</p> */}

      {/* <InfiniteScrollComponent
        height={windowHeight - (60 + 29 + 30 + 80)}
        lazyHook={useLazyGetAllStoreProductsQuery}
        clearParent={true}
        parentClasses={"grid grid-cols-2 gap-5"}
        customEnd={<></>}
        loopKey={(l) => l?.id}
      >
        <StoreCard />
      </InfiniteScrollComponent> */}

      {/* <div className="grid grid-cols-2 gap-5 ">
        {storeProducts.map((p) => {
          return (
            <div key={p.id} className="w-full max-w-[146px]">
              <img
                src={p.img}
                alt=""
                    onError={(e) =>
                  !e.target.onerror
                    ? (e.target.src = "/images/tiar_logo_3.svg")
                    : null
                }
                className="w-full max-h-[153px] shadow-md border-[1px]"
              />
              <p className="text-[10px] mt-2">{p.title}</p>
              <p className="text-[8px]">{p.price}</p>
            </div>
          );
        })}
      </div> */}

      <div className="bg-[#292B40] rounded-xl px-3 py-2 text-[12px] m-5 border-[1.7px] animate-pulse border-ownOrange">
        <div className="">
          <div className="flex space-x-2 items-center border-b-2 border-ownOrange mb-2 pb-1 px-2">
            <h1 className="font-semibold text-[23px] m-auto pb-2">
              Coming Soon
            </h1>
          </div>
        </div>

        <div className="flex justify-between px-2">
          <p className="text-[#9F9F9F]">Merchandise coming soon</p>
          {/* <p>0</p> */}
        </div>
      </div>
    </div>
  );
};

const StoreCard = ({ data }) => {
  return (
    <div className="w-full max-w-[146px]">
      <img
        src={data?.image}
        alt=""
        className="w-full h-[153px] shadow-md border-[1px] rounded-lg object-cover"
      />
      <p className="text-[10px] mt-2">{data?.title}</p>
      <p className="text-[8px]">{data?.price}</p>
    </div>
  );
};

export default StoreTab;
