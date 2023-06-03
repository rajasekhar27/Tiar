import Link from "next/link";

const BoxerCard = ({ data }) => {
  return (
    <Link href={`/hellsbay/boxers/${data?.slug}`}>
      <div className="w-full bg-white p-3 rounded-md flex space-x-5 items-center border border-ownOrange">
        <div className="relative w-[74px] h-[82px]">
          <img
            src={data?.full_image}
            alt=""
            onError={(e) =>
              !e.target.onerror
                ? (e.target.src = "/images/tiar_logo_3.svg")
                : null
            }
            className="w-full h-full object-cover"
          />
          <div className="absolute right-0 top-0 w-[2px] h-[90px] bg-black"></div>
          <div className="absolute left-0 bottom-0 h-[2px] w-[73px] bg-black"></div>
        </div>

        <div className="font-[700] uppercase flex flex-col justify-between">
          <p className="max-w-min text-transparent bg-clip-text bg-gradient-to-l from-[#FD3E52] to-ownPurple1 text-[14px] whitespace-nowrap mb-2">
            {data?.category}
          </p>
          <p className="text-black text-[22px]">{data?.name}</p>
        </div>
      </div>
    </Link>
  );
};

export default BoxerCard;
