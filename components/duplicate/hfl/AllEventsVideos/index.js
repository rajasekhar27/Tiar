import Link from "next/link";

const AllEventsVideos = (props) => {
  return (
    <div className="pl-3 mt-3">
      <h1 className="text-[16px] font-semibold">You may also like: </h1>

      <div className="flex overflow-x-auto py-3 space-x-3">
        <Link href="/articles/videos/11">
          <div className="flex-shrink-0">
            <img
              src={"/images/banner_14.png"}
              alt=""
              className="w-[141px] h-[85px] rounded-md"
            />

            <p className="text-[12px] font-semibold mt-1 ">
              Rupinder VS Thidarat
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

        <Link href={"/articles/videos/8"}>
          <div className="flex-shrink-0">
            <img
              src={"/images/banner_11.png"}
              alt=""
              className="w-[141px] h-[85px] rounded-md"
            />

            <p className="text-[12px] font-semibold mt-1">
              Akashdeep VS Nicholas
            </p>
          </div>
        </Link>

        <Link href="/articles/videos/9">
          <div className="flex-shrink-0">
            <img
              src={"/images/banner_12.png"}
              alt=""
              className="w-[141px] h-[85px] rounded-md"
            />

            <p className="text-[12px] font-semibold mt-1">Pushkar VS Norbeto</p>
          </div>
        </Link>

        <Link href="/articles/videos/10">
          <div className="flex-shrink-0">
            <img
              src={"/images/banner_23.png"}
              alt=""
              className="w-[141px] h-[85px] rounded-md"
            />

            <p className="text-[12px] font-semibold mt-1 ">
              Mahesh VS Vikramjeet
            </p>
          </div>
        </Link>

        <Link href="/articles/videos/12">
          <div className="flex-shrink-0">
            <img
              src={"/images/banner_15.png"}
              alt=""
              className="w-[141px] h-[85px] rounded-md"
            />

            <p className="text-[12px] font-semibold mt-1 ">Harsh VS Saparbay</p>
          </div>
        </Link>

        <Link href="/articles/videos/13">
          <div className="flex-shrink-0">
            <img
              src={"/images/banner_16.png"}
              alt=""
              className="w-[141px] h-[85px] rounded-md"
            />

            <p className="text-[12px] font-semibold mt-1 ">Asad VS Aksar</p>
          </div>
        </Link>

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

        <Link href="/articles/videos/17">
          <div className="flex-shrink-0">
            <img
              src={"/images/banner_20.png"}
              alt=""
              className="w-[141px] h-[85px] rounded-md"
            />

            <p className="text-[12px] font-semibold mt-1 ">
              Shubham VS Allahdad
            </p>
          </div>
        </Link>

        <Link href="/articles/videos/14">
          <div className="flex-shrink-0">
            <img
              src={"/images/banner_17.png"}
              alt=""
              className="w-[141px] h-[85px] rounded-md"
            />

            <p className="text-[12px] font-semibold mt-1 ">
              Gurpreet VS Ricardo
            </p>
          </div>
        </Link>

        <Link href="/articles/videos/15">
          <div className="flex-shrink-0">
            <img
              src={"/images/banner_18.png"}
              alt=""
              className="w-[141px] h-[85px] rounded-md"
            />

            <p className="text-[12px] font-semibold mt-1 ">Kamla VS Anahit</p>
          </div>
        </Link>

        <Link href="/articles/videos/16">
          <div className="flex-shrink-0">
            <img
              src={"/images/banner_19.png"}
              alt=""
              className="w-[141px] h-[85px] rounded-md"
            />

            <p className="text-[12px] font-semibold mt-1 ">
              Ramandeep VS Anita
            </p>
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
      </div>
    </div>
  );
};

export default AllEventsVideos;
