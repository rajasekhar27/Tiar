import Link from "next/link";

const HellsbayFightNight = (props) => {
  return (
    <div className="block-swipe-tabs">
      <h1 className="text-[16px] font-semibold">Hellsbay Fight Night</h1>

      <div className="flex overflow-x-auto py-3 space-x-3">
        <Link href={"/articles/videos/3"}>
          <div className="flex-shrink-0">
            <img
              src={"/images/banner_8.png"}
              alt=""
              className="w-[141px] h-[85px] rounded-md"
            />

            <p className="text-[12px] font-semibold mt-1">
              Akashdeep VS Sabari J
            </p>
          </div>
        </Link>

        <Link href="/articles/videos/4">
          <div className="flex-shrink-0">
            <img
              src={"/images/banner_9.png"}
              alt=""
              className="w-[141px] h-[85px] rounded-md"
            />

            <p className="text-[12px] font-semibold mt-1">Karthik VS Heru</p>
          </div>
        </Link>

        <Link href="/articles/videos/5">
          <div className="flex-shrink-0">
            <img
              src={"/images/banner_10.png"}
              alt=""
              className="w-[141px] h-[85px] rounded-md"
            />

            <p className="text-[12px] font-semibold mt-1 ">Asad VS Nasoro</p>
          </div>
        </Link>

        <Link href="/articles/videos/6">
          <div className="flex-shrink-0">
            <img
              src={"/images/banner_21.png"}
              alt=""
              className="w-[141px] h-[85px] rounded-md"
            />

            <p className="text-[12px] font-semibold mt-1 ">
              Gurpreet VS Lokesh
            </p>
          </div>
        </Link>

        <Link href="/articles/videos/7">
          <div className="flex-shrink-0">
            <img
              src={"/images/banner_22.png"}
              alt=""
              className="w-[141px] h-[85px] rounded-md"
            />

            <p className="text-[12px] font-semibold mt-1 ">
              Manikandan VS Mazhar
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HellsbayFightNight;
