import { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setCaptain, setViceCaptain } from "../../../../store/slices/cricket";

const CaptainCard = ({ role, data }) => {
  const dispatch = useDispatch();

  const captain = useSelector((state) => state.cricket.captain);
  const viceCaptain = useSelector((state) => state.cricket.viceCaptain);

  return (
    <>
      <div className="bg-white p-2 px-3 flex items-center justify-between border-y border-black">
        <div className="flex items-center">
          {/* <AiOutlineInfoCircle /> */}

          <div className="flex flex-col items-center space-y-2">
            <img
              // src={
              //   "https://feeds.abplive.com/onecms/images/uploaded-images/2022/05/20/114d90f7a29231c0e7c81ce866f46186_original.jpg"
              // }
              src={data?.image_url ? data?.image_url : data?.team_image_url}
              alt=""
              onError={(e) =>
                !e.target.onerror
                  ? (e.target.src = "/images/tiar_logo_3.svg")
                  : null
              }
              className="w-[50px] h-[50px] rounded-full object-contain"
            />
            <div className="flex items-center -space-x-1">
              <div
                className={`w-[43px] h-[22px] rounded-md font-semibold text-[14px] grid place-items-center text-white relative bg-gray-500`}
              >
                {/* <img
            src={`${data?.team?.image_url}`}
            alt=""
                onError={(e) =>
                  !e.target.onerror
                    ? (e.target.src = "/images/tiar_logo_3.svg")
                    : null
                }
            className="w-full h-full object-contain absolute opacity-20"
          /> */}
                <p className="z-[1]">{data?.main_team_name}</p>
              </div>
              <div
                className={`w-[43px] h-[22px] rounded-md font-semibold text-[14px] grid place-items-center text-white relative bg-red-500`}
              >
                {/* <img
            src={`${data?.team?.image_url}`}
            alt=""
                onError={(e) =>
                  !e.target.onerror
                    ? (e.target.src = "/images/tiar_logo_3.svg")
                    : null
                }
            className="w-full h-full object-contain absolute opacity-20"
          /> */}
                <p className="z-[1]">{role}</p>
              </div>
            </div>
          </div>

          <div className="ml-5 min-w-[150px]">
            <p className="font-bold text-[12px]">{data?.name}</p>
            <p className="text-[12px]">{data?.points} pts</p>
          </div>
        </div>

        <div className={"flex flex-col items-center"}>
          <div
            className={`w-[20px] h-[20px] rounded-full border text-[10px] grid place-items-center ${
              captain?.id === data?.id
                ? "border-white text-white bg-black"
                : "border-black"
            }`}
            onClick={() =>
              viceCaptain?.id === data?.id ? {} : dispatch(setCaptain(data))
            }
          >
            <p>C</p>
          </div>

          <p className="text-[12px]">
            {typeof data?.captain_select === "number"
              ? parseFloat(data?.captain_select)?.toFixed(1)
              : 0}
            %
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div
            className={`w-[20px] h-[20px] rounded-full border text-[10px] grid place-items-center ${
              viceCaptain?.id === data?.id
                ? "border-white text-white bg-black"
                : "border-black"
            }`}
            onClick={() =>
              captain?.id === data?.id ? {} : dispatch(setViceCaptain(data))
            }
          >
            <p>VC</p>
          </div>

          <p className="text-[12px]">
            {typeof data?.vicecaptain_select === "number"
              ? parseFloat(data?.vicecaptain_select).toFixed(1)
              : 0}
            %
          </p>
        </div>
      </div>
    </>
  );
};

export default CaptainCard;
