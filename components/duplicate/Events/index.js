import { useRouter } from "next/router";
import { BsChevronLeft } from "react-icons/bs";

const Events = ({ data }) => {
  const router = useRouter();

  return (
    <div className=" text-white">
      {/* Title */}
      <div className="flex items-center space-x-3 p-5">
        <BsChevronLeft color="white" onClick={() => router.back()} />
        <h5 className="text-[18px] font-semibold">Article</h5>
      </div>

      {/* Card */}
      <div
        className="h-[213px] bg-cover  flex items-end"
        style={{
          backgroundImage: `url('${data?.img}')`,
          backgroundPosition: "center",
        }}
      >
        <div className="flex space-x-3 glass-4 px-5 py-2 w-full justify-between items-center">
          <h5 className="text-[16px] tracking-[0.08em]">{data?.title}</h5>
          <img src="/images/tiar_logo_3.svg" alt="" />
        </div>
      </div>

      {/* description */}
      <div className="p-5 flex flex-col space-y-3 text-[14px]">
        {data?.description}
      </div>
    </div>
  );
};

export default Events;
