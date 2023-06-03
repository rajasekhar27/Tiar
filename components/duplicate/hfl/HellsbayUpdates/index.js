import Link from "next/link";

const HellsbayUpdates = (props) => {
  return (
    <div className="block-swipe-tabs">
      <h1 className="text-[16px] font-semibold">Hellsbay Updates</h1>

      <div className="flex overflow-x-auto py-3 space-x-3">
        <Link href={"/articles/1"}>
          <div className="flex-shrink-0">
            <img
              onError={(e) =>
                !e.target.onerror
                  ? (e.target.src = "/images/tiar_logo_3.svg")
                  : null
              }
              src={
                "https://miro.medium.com/max/1400/1*TyJiFM57TdNprGa4vggLoA.jpeg"
              }
              alt=""
              className="w-[141px] h-[85px] rounded-md"
            />

            <p className="text-[12px] font-semibold mt-1">HFL: Introduction</p>
          </div>
        </Link>

        <Link href="/articles/2">
          <div className="flex-shrink-0">
            <img
              src={"/images/banner_7.png"}
              alt=""
              className="w-[141px] h-[85px] rounded-md"
            />

            <p className="text-[12px] font-semibold mt-1">Boxing NFTs</p>
          </div>
        </Link>

        <Link href="/articles/3">
          <div className="flex-shrink-0">
            <img
              onError={(e) =>
                !e.target.onerror
                  ? (e.target.src = "/images/tiar_logo_3.svg")
                  : null
              }
              src={
                "https://miro.medium.com/max/700/1*EP-jlHSkfBrwlIgEK3-1xw.png"
              }
              alt=""
              className="w-[141px] h-[85px] rounded-md"
            />

            <p className="text-[12px] font-semibold mt-1 ">
              First Ever WBC India ...
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HellsbayUpdates;
