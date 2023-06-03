import { useRouter } from "next/router";
import { BsChevronLeft } from "react-icons/bs";

import BoxerBio from "./Bio";
import { useGetBoxerInfoQuery } from "../../store/apis/restApi";

const BoxerDetails = (props) => {
  const router = useRouter();

  const { id } = router.query;

  const { data: boxerData } = useGetBoxerInfoQuery({
    slug: id,
  });

  return (
    <div>
      <div className="h-[386px] bg-white pb-10 p-5">
        <div className="relative grid place-items-center">
          <div className="flex items-center space-x-3 absolute left-0">
            <BsChevronLeft color="black" onClick={() => router.back()} />
            <p className="text-[14px]">Back</p>
          </div>

          <img src="/images/hfl_logo_2.svg" alt="" />
        </div>

        <div className="h-full w-full grid place-items-center">
          <div className="flex space-x-3 justify-between w-full">
            <div className="flex flex-col justify-between max-w-min">
              <div className="flex flex-col space-y-3">
                <h5 className="uppercase text-[22px] font-[700]">
                  {boxerData?.boxer?.name}
                </h5>

                <p className="text-[14px] font-semibold">
                  {boxerData?.boxer?.category}
                </p>
              </div>

              <div className="rounded-md bg-gradient-to-br from-[#FD3E4E] to-[#B65FE3] max-w-min flex items-center">
                <div className="text-[22px] font-[700] p-3 text-white text-center">
                  <h5>{boxerData?.wins}</h5>
                  <div className="w-full h-[2px] bg-ownBlue1"></div>
                  <h5 className="text-[10px] mt-2">WINS</h5>
                </div>
                <div className="text-[22px] font-[700] p-3 text-white text-center border-x-2">
                  <h5>{boxerData?.losses}</h5>
                  <div className="w-full h-[2px] bg-ownBlue1"></div>
                  <h5 className="text-[10px] mt-2">LOSES</h5>
                </div>
                <div className="text-[22px] font-[700] p-3 text-white text-center">
                  <h5>{boxerData?.draws}</h5>
                  <div className="w-full h-[2px] bg-ownBlue1"></div>
                  <h5 className="text-[10px] mt-2">DRAWS</h5>
                </div>
              </div>
            </div>

            <div className="flex">
              <div>
                <img
                  src={`${process.env.NEXT_PUBLIC_BACKEND_IMG_BASEURL}${boxerData?.boxer?.full_image}`}
                  alt=""
                  className="max-h-[259px] pr-3 object-cover"
                  onError={(e) =>
                    !e.target.onerror
                      ? (e.target.src = "/images/tiar_logo_3.svg")
                      : null
                  }
                />
                <div className="w-[calc(100%+12px)] h-[2px] bg-black"></div>
              </div>
              <div className="h-[calc(100%+12px)] w-[2px] bg-black"></div>
            </div>
          </div>
        </div>
      </div>

      <BoxerBio data={boxerData} />
    </div>
  );
};

export default BoxerDetails;
